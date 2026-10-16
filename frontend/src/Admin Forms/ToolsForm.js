import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";
import axios from "axios";
import { baseUrl } from "../shared/baseurl";

const ToolsForm = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        prices: ["", "", "", ""]
    });

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
  
    const handlePriceChange = (index, value) => {
        const updatedPrices = [...formData.prices];
        updatedPrices[index] = value;
        setFormData({ ...formData, prices: updatedPrices });
    };
  
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData();
      
      for (const key in formData) {
          if (Array.isArray(formData[key])) {
              formData[key].forEach((item, index) => {
                  data.append(`${key}[${index}]`, item);
              });
          } else {
              data.append(key, formData[key]);
          }
      }
      
      if (image) {
          data.append("image", image);
      }
  
      const token = localStorage.getItem("token");
  
      try {
          const response = await axios.post(baseUrl + "tools", data, {
              headers: {
                  "Content-Type": "multipart/form-data",
                  "Authorization": `bearer ${token}`, // Attach token here
              },
          });
          console.log("Success:", response.data);
      } catch (error) {
          console.error("Error:", error.response ? error.response.data : error);
      }
    };
    
    return (
        <div>
            <Button className="butt" onClick={toggleForm}>
                {showForm ? "Cancel" : "Add Tool"}
            </Button>
            {showForm && (
             <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Tool Name:</Label>
                    <Input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description:</Label>
                    <Input type="textarea" name="description" id="description" value={formData.description} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label>Prices:</Label>
                    <Row>
                        <Col><Input type="number" placeholder="1 hour" value={formData.prices[0]} onChange={(e) => handlePriceChange(0, e.target.value)} required /></Col>
                        <Col><Input type="number" placeholder="4 hours" value={formData.prices[1]} onChange={(e) => handlePriceChange(1, e.target.value)} required /></Col>
                        <Col><Input type="number" placeholder="1 day" value={formData.prices[2]} onChange={(e) => handlePriceChange(2, e.target.value)} required /></Col>
                        <Col><Input type="number" placeholder="1 week" value={formData.prices[3]} onChange={(e) => handlePriceChange(3, e.target.value)} required /></Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Label for="image">Upload Image:</Label>
                    <Input type="file" id="image" onChange={handleImageChange} accept="image/*" required />
                </FormGroup>
                <Button type="submit" className="butt">Submit</Button>
            </Form>
            )}
        </div>
    )
}

export default ToolsForm;