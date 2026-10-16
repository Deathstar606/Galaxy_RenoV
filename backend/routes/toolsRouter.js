const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('./cors');

const Tools = require('../models/tools');
var authenticate = require('../authenticate');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/Tools');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
    }
});

const upload = multer({ storage: storage });

const ToolsRouter = express.Router();

ToolsRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Tools.find(req.query)
    .then((gifts) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(gifts);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(upload.single('image'), cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    const { name, description, prices } = req.body;
    let imagePath = req.file ? req.file.path : req.body.image;
    imagePath = imagePath.replace(/^public[\/\\]/, '');
  
    const tool = {
      image: imagePath,
      name: name,
      description: description,
      prices: Array.isArray(prices) ? prices.map(Number) : []
    };
  
    try {
      console.log(tool);
      const newTool = await Tools.create(tool);
      res.status(200).json(newTool);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
})

ToolsRouter.route('/:deleteId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.delete(cors.cors, (req, res, next) => {
    Tools.findByIdAndRemove(req.params.deleteId)
    .then((response) => {
        if (response) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        } else {
            const err = new Error(`GiftCase ${req.params.deleteId} not found`);
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = ToolsRouter;