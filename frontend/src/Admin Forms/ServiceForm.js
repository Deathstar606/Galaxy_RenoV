import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import { baseUrl } from "../shared/baseurl";

const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "galaxyReno_up"); // Replace with your Cloudinary upload preset
    formData.append("folder", "galaxyReno/services");

    try {
        const response = await fetch("https://api.cloudinary.com/v1_1/drliblpx7/image/upload", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        return data.secure_url; // Return the uploaded image URL
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return null;
    }
};

const ServiceForm = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        mainImg: null,
/*         secondaryImg: [] */
    });

    const [loading, setLoading] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, mainImg: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            // Upload main image
            const mainImgUrl = formData.mainImg ? await uploadToCloudinary(formData.mainImg) : null;
    
            const token = localStorage.getItem("token");

            const requestData = {
                name: formData.name,
                description: formData.description,
                mainImg: mainImgUrl,
            };
    
            // Send only URLs to backend
            const response = await axios.post(baseUrl + "services", requestData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
    
            console.log("Success:", response.data);
            alert("Service uploaded successfully!");
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error);
        } finally {
            setLoading(false); // Stop loading
        }
    };    

    return (
        <div>
            <Button className="butt" onClick={toggleForm}>
                {showForm ? "Cancel" : "Add Service"}
            </Button>
            {showForm && (
                <Form onSubmit={handleSubmit} className="mt-3">
                    <FormGroup>
                        <Label for="name">Service Name:</Label>
                        <Input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description:</Label>
                        <Input type="textarea" name="description" id="description" value={formData.description} onChange={handleChange} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="mainImg">Upload Service Image:</Label>
                        <Input type="file" id="mainImg" onChange={handleMainImageChange} accept="image/*" required />
                    </FormGroup>
                    <Button type="submit" disabled={loading} className="butt">
                        {loading ? "Uploading Please Wait..." : "Submit"}
                    </Button>
                </Form>
            )}
        </div>
    );
};

export default ServiceForm;
