const express = require("express");
const cors = require("./cors");
const { v2: cloudinary } = require("cloudinary");
const Services = require("../models/service");
const authenticate = require("../authenticate");

const ServiceRouter = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

ServiceRouter.route("/")
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Services.find(req.query)
            .then((services) => {
                res.status(200).json(services);
            })
            .catch(next);
})
.post(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    try {
        const { name, description, mainImg } = req.body;

        // Check if main image URL is provided
        if (!mainImg) {
            return res.status(400).json({ error: "Main image URL is required." });
        }

        // Create new service entry using provided Cloudinary URLs
        const newService = await Services.create({
            name,
            description,
            mainImg,
        });

        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}); 

ServiceRouter.route("/:deleteId")
    .options(cors.corsWithOptions, authenticate.verifyUser, (req, res) => res.sendStatus(200))
    .delete(cors.cors, async (req, res, next) => {
        try {
            // Find the service by ID
            const service = await Services.findById(req.params.deleteId);
            if (!service) {
                return res.status(404).json({ error: `Service ${req.params.deleteId} not found` });
            }

            // Extract image URLs
            const { mainImg } = service;

            // Function to extract public ID from Cloudinary URL
            const getPublicId = (url) => {
                const parts = url.split("/");
                return parts[parts.length - 1].split(".")[0]; // Extracts the public ID
            };

            // Delete main image from Cloudinary
            if (mainImg) {
                const mainImgPublicId = getPublicId(mainImg);
                await cloudinary.uploader.destroy(`galaxyReno/services/${mainImgPublicId}`);
            }

            // Delete secondary images from Cloudinary
/*             if (secondaryImg && Array.isArray(secondaryImg)) {
                const deletePromises = secondaryImg.map(imgUrl => {
                    const publicId = getPublicId(imgUrl);
                    return cloudinary.uploader.destroy(`galaxyReno/services/${publicId}`);
                });
                await Promise.all(deletePromises);
            } */

            // Delete the service from the database
            await Services.findByIdAndRemove(req.params.deleteId);

            res.status(200).json({ message: "Service and associated images deleted successfully." });
        } catch (error) {
            next(error);
        }
    });

module.exports = ServiceRouter;
