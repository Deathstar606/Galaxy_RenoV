import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Col,
  CardImg,
  Button,
} from "reactstrap";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { baseUrl } from "../shared/baseurl";
import axios from "axios";
import contact from "../images/contact2.jpg";

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "galaxyReno_up"); // Replace with your Cloudinary upload preset
  formData.append("folder", "galaxyReno/contacts");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/drliblpx7/image/upload",
      {
        method: "POST",
        body: formData,
      },
    );
    const data = await response.json();
    return data.secure_url; // Return the uploaded image URL
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
    setFormData({ ...formData, mainImg: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, phone, email, address, description } = formData;

    if (!name || !phone || !email || !address || !description) {
      alert("Please fill in all required fields before submitting.");
      return;
    }

    const requestData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      description: formData.description,
    };

    try {
      setIsSubmitting(true);
      setUploadProgress(0);
      if (formData.mainImg) {
        alert("Please wait, your image is being uploaded...");
        const mainImgUrl = formData.mainImg
          ? await uploadToCloudinary(formData.mainImg)
          : null;
        requestData.mainImgUrl = mainImgUrl;
      }

      const response = await axios.post(baseUrl + "contact", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(percent);
        },
      });

      console.log("Success:", response.data);
      alert("✅ Submission complete! Your message has been sent.");
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Upload failed. Please try again.");
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <motion.div
      transition={{ duration: 0.5, type: "tween", ease: "easeIn" }}
      initial={{ x: 1000, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -1000, opacity: 0 }}
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      {/* Header Banner */}
      <div
        className="text-center py-5"
        style={{
          background: "linear-gradient(135deg, #00084c 0%, #0d1b6e 100%)",
          color: "white",
        }}
      >
        <Container>
          <h1
            className="mb-2"
            style={{
              fontSize: "clamp(2rem, 3.8vw, 2.75rem)",
              fontWeight: "800",
              letterSpacing: "-0.02em",
            }}
          >
            Book an Appointment
          </h1>
          <p
            className="text-light mx-auto mb-0 px-2"
            style={{ maxWidth: "650px", opacity: 0.9, fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)", lineHeight: "1.6" }}
          >
            Tell us about your home improvement or repair project and get a quick, personalized consultation & quote.
          </p>
        </Container>
      </div>

      <Container
        className="d-flex justify-content-center"
        style={{ marginTop: "-2.5rem", marginBottom: "5rem" }}
      >
        <div
          className="w-100 p-4 p-md-5 bg-white shadow-lg"
          style={{
            maxWidth: "850px",
            borderRadius: "20px",
            border: "1px solid #eef0f4",
          }}
        >
          <Form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key="details"
                transition={{ duration: 0.4, type: "tween", ease: "easeOut" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="border-bottom pb-3 mb-4 text-center text-md-start">
                  <h3 className="fw-bold mb-1" style={{ color: "#00084c" }}>
                    Project & Contact Information
                  </h3>
                  <p className="text-muted mb-0" style={{ fontSize: "0.92rem" }}>
                    Please fill out the form below. We usually respond within a few hours.
                  </p>
                </div>

                <Row className="gy-3">
                  <Col md={6} xs={12}>
                    <FormGroup>
                      <Label for="name" className="fw-semibold text-secondary" style={{ fontSize: "0.9rem" }}>
                        Full Name <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="John Doe"
                        className="py-2 px-3"
                        style={{ borderRadius: "10px", borderColor: "#cbd5e1" }}
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6} xs={12}>
                    <FormGroup>
                      <Label for="phone" className="fw-semibold text-secondary" style={{ fontSize: "0.9rem" }}>
                        Phone Number <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="(416) 123-4567"
                        className="py-2 px-3"
                        style={{ borderRadius: "10px", borderColor: "#cbd5e1" }}
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="gy-3">
                  <Col md={6} xs={12}>
                    <FormGroup>
                      <Label for="email" className="fw-semibold text-secondary" style={{ fontSize: "0.9rem" }}>
                        Email Address <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="john@example.com"
                        className="py-2 px-3"
                        style={{ borderRadius: "10px", borderColor: "#cbd5e1" }}
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6} xs={12}>
                    <FormGroup>
                      <Label for="address" className="fw-semibold text-secondary" style={{ fontSize: "0.9rem" }}>
                        Service Address / Location <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Street, City, Postal Code"
                        className="py-2 px-3"
                        style={{ borderRadius: "10px", borderColor: "#cbd5e1" }}
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="gy-3">
                  <Col md={12}>
                    <FormGroup>
                      <Label for="description" className="fw-semibold text-secondary" style={{ fontSize: "0.9rem" }}>
                        Project Details & Description <span className="text-danger">*</span>
                      </Label>
                      <Input
                        style={{ height: "120px", borderRadius: "10px", borderColor: "#cbd5e1" }}
                        type="textarea"
                        name="description"
                        id="description"
                        placeholder="Describe the service or repair needed (e.g., drywall repair, plumbing fixture, furniture assembly)..."
                        className="p-3"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="gy-3">
                  <Col md={12}>
                    <FormGroup>
                      <Label for="image" className="fw-semibold text-secondary" style={{ fontSize: "0.9rem" }}>
                        Attach Photo (Optional)
                      </Label>
                      <div
                        className="p-3 text-center"
                        style={{
                          border: "2px dashed #cbd5e1",
                          borderRadius: "12px",
                          backgroundColor: "#f8fafc",
                          cursor: "pointer",
                        }}
                      >
                        <Input
                          type="file"
                          name="image"
                          id="image"
                          onChange={handleImageChange}
                          accept="image/*"
                          className="form-control mb-2"
                          style={{ borderRadius: "8px" }}
                        />
                        <small className="text-muted">
                          Upload clear pictures of the repair area or items to help us provide an accurate estimate.
                        </small>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>

                {imagePreview && (
                  <Row className="mb-4">
                    <Col md={12} className="text-center">
                      <div
                        className="p-2 d-inline-block bg-light"
                        style={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
                      >
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{
                            maxHeight: "220px",
                            maxWidth: "100%",
                            objectFit: "contain",
                            borderRadius: "8px",
                          }}
                        />
                        <div className="mt-1">
                          <small className="text-success fw-semibold">Photo Attached</small>
                        </div>
                      </div>
                    </Col>
                  </Row>
                )}

                {isSubmitting && (
                  <div className="alert alert-info py-2 px-3 text-center my-3" style={{ borderRadius: "10px" }}>
                    Uploading details... {uploadProgress > 0 ? `${uploadProgress}%` : "Processing"}
                  </div>
                )}

                <div className="mt-4 pt-2 text-center text-md-start">
                  <button
                    type="submit"
                    className="butt text-white fw-bold px-5 py-2"
                    style={{
                      backgroundColor: "#00084c",
                      borderColor: "#00084c",
                      opacity: isSubmitting ? 0.6 : 1,
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      width: "100%",
                      maxWidth: "280px",
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Send Request"}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </Form>
        </div>
      </Container>

      {/* Contact Info Feature Section */}
      <div style={{ backgroundColor: "#00084c", color: "white" }} className="py-5">
        <Container style={{ maxWidth: "88%" }}>
          <Row className="gy-4 align-items-center">
            <Col
              lg={6}
              md={12}
              className="d-flex justify-content-center align-items-center"
            >
              <div
                style={{
                  width: "100%",
                  maxHeight: "360px",
                  overflow: "hidden",
                  borderRadius: "18px",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                }}
              >
                <CardImg
                  src={contact}
                  alt="Galaxy Home Solutions Team"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            </Col>
            <Col lg={6} md={12}>
              <div className="ps-lg-4">
                <h3 className="fw-bold mb-3" style={{ color: "#ffffff" }}>
                  Need Immediate Assistance?
                </h3>
                <p className="text-light" style={{ opacity: 0.9, lineHeight: "1.7", fontSize: "0.98rem" }}>
                  Have an urgent question, need a quote right away, or prefer speaking directly with our craftsman? We take pride in rapid responses, clear transparent communication, and dependable service across the Greater Toronto Area.
                </p>
                <div className="mt-4 pt-2">
                  <a
                    href="tel:4169976627"
                    style={{ color: "white", textDecoration: "none" }}
                    className="d-flex align-items-center gap-3 mb-3 p-2 rounded"
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        backgroundColor: "#b61414",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaPhone size={18} />
                    </div>
                    <div>
                      <div className="small text-light" style={{ opacity: 0.8 }}>Call or Text</div>
                      <div className="fw-bold fs-6">416 997 6627 / 647 606 2540</div>
                    </div>
                  </a>

                  <a
                    href="mailto:solutionsgalaxyhome@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "white", textDecoration: "none" }}
                    className="d-flex align-items-center gap-3 mb-3 p-2 rounded"
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        backgroundColor: "#b61414",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaEnvelope size={18} />
                    </div>
                    <div>
                      <div className="small text-light" style={{ opacity: 0.8 }}>Email Inquiry</div>
                      <div className="fw-bold fs-6 text-break">solutionsgalaxyhome@gmail.com</div>
                    </div>
                  </a>

                  <div className="d-flex align-items-center gap-3 p-2 rounded">
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaMapMarkerAlt size={18} className="text-light" />
                    </div>
                    <div>
                      <div className="small text-light" style={{ opacity: 0.8 }}>Service Area</div>
                      <div className="fw-bold fs-6">Scarborough, Toronto & GTA (7 Days a Week)</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </motion.div>
  );
};

export default AppointmentForm;
