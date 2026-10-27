import React from "react";
import aboutPic from "../images/HandymanServices-Part-3-Image.jpg";
import { motion } from "framer-motion";
import { Col, Container, Row, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";

function About() {
  return (
    <motion.div
      style={{ backgroundColor: "#00084c", paddingTop: "3rem", paddingBottom: "3rem" }}
      transition={{ duration: 0.5, type: "tween", ease: "easeIn" }}
      initial={{ x: 1000, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -1000, opacity: 0 }}
    >
      <Container
        style={{ minHeight: "85vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <Row className="w-100 py-4 align-items-center">
          <Col lg={6} md={12} className="d-flex justify-content-center mb-4 mb-lg-0">
            <motion.div
              style={{ width: "100%", maxWidth: "540px" }}
              initial={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.8, type: "tween", ease: "easeOut" }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <CardImg
                src={aboutPic}
                alt="Galaxy Home Solutions handyman craftsmanship"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  maxHeight: "520px",
                  borderRadius: "20px",
                  boxShadow: "0 16px 36px rgba(0, 0, 0, 0.35)",
                }}
              />
            </motion.div>
          </Col>
          <Col lg={6} md={12} className="d-flex align-items-center">
            <div className="home-butt ps-lg-4">
              <div
                style={{
                  color: "#f1593a",
                  fontSize: "clamp(0.78rem, 1vw, 0.88rem)",
                  fontWeight: "700",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  marginBottom: "0.6rem",
                }}
              >
                Who We Are
              </div>
              <h2
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(1.85rem, 3.2vw, 2.6rem)",
                  fontWeight: "800",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.2",
                  marginBottom: "1.25rem",
                }}
              >
                Dedicated to Trusted Craftsmanship & Reliable Service
              </h2>
              <p
                style={{
                  fontSize: "clamp(0.96rem, 1.12vw, 1.05rem)",
                  lineHeight: "1.75",
                  color: "#e2e8f0",
                  fontWeight: "400",
                  marginBottom: "1rem",
                }}
              >
                At Galaxy Home Solutions, we are a family-owned business dedicated to providing trusted, reliable, and high-quality home renovations and handyman services. With a passion for craftsmanship and a commitment to excellence, we take pride in transforming houses into homes with care, precision, and attention to detail.
              </p>
              <p
                style={{
                  fontSize: "clamp(0.92rem, 1.05vw, 0.98rem)",
                  lineHeight: "1.7",
                  color: "#cbd5e1",
                  fontWeight: "300",
                  marginBottom: "1.25rem",
                }}
              >
                From minor repairs to full renovations, our skilled team is here to help you with all your home improvement needs. We believe in honest work, transparent pricing, and customer satisfaction above all else. Whether it's installations, maintenance, electrical work, appliance repairs, or tool rentals, we bring professionalism and expertise to every project, no matter the size.
              </p>

              {/* Styled Key Highlights */}
              <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-3 mb-4">
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.07)",
                    border: "1px solid rgba(255, 255, 255, 0.14)",
                    borderRadius: "12px",
                    padding: "9px 15px",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    color: "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <FaMapMarkerAlt style={{ color: "#f1593a", flexShrink: 0 }} />
                  <span>Serving Toronto, Scarborough & GTA</span>
                </div>
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.07)",
                    border: "1px solid rgba(255, 255, 255, 0.14)",
                    borderRadius: "12px",
                    padding: "9px 15px",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    color: "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <FaPhone style={{ color: "#f1593a", flexShrink: 0 }} />
                  <span>Free Consultation & Quotes</span>
                </div>
              </div>

              <div
                className="butt"
                style={{
                  display: "inline-block",
                  fontSize: "1rem",
                  fontWeight: "600",
                  letterSpacing: "0.4px",
                }}
              >
                <Link
                  to="/home/contactus"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}

export default About;
