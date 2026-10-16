import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaTools,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{ backgroundColor: "#d8d9da", color: "#1a1d20" }}>
      {/* Top Banner Accent */}
      <div style={{ backgroundColor: "#b61414", height: "4px" }}></div>

      <Container className="pt-5 pb-4" style={{ maxWidth: "88%", paddingTop: "4.5rem !important" }}>
        <Row className="gy-4 mb-4 pt-4">
          {/* Brand Info & Mission */}
          <Col lg={4} md={6} className="mb-4 mb-lg-0 text-start">
            <h4
              className="fw-bold mb-3 d-flex align-items-center"
              style={{ color: "#00084c", letterSpacing: "0.5px" }}
            >
              <FaTools
                className="me-2 text-danger"
                style={{ color: "#b61414" }}
              />{" "}
              Galaxy Home Solutions
            </h4>
            <p
              style={{
                color: "#333a42",
                fontSize: "0.95rem",
                lineHeight: "1.6",
              }}
            >
              Trusted, family-owned handyman and home improvement services. From
              small repairs and installations to complete home renovations, we
              deliver quality craftsmanship with honesty and peace of mind.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a
                href="https://www.facebook.com/profile.php?id=61574817508133"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#00084c",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#b61414";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.color = "#00084c";
                }}
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/mynabackdrops"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#00084c",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#b61414";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.color = "#00084c";
                }}
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </Col>

          {/* Quick Navigation Links */}
          <Col lg={2} md={6} xs={6} className="mb-4 mb-lg-0 text-start">
            <h5
              className="fw-semibold mb-3"
              style={{ color: "#00084c", fontSize: "1.1rem" }}
            >
              Quick Links
            </h5>
            <ul className="list-unstyled" style={{ fontSize: "0.95rem" }}>
              <li className="mb-2">
                <Link
                  to="/home"
                  style={{ color: "#2d3748", textDecoration: "none", fontWeight: "500" }}
                >
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/home/homed"
                  style={{ color: "#2d3748", textDecoration: "none", fontWeight: "500" }}
                >
                  Tool Rental
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/home/aboutus"
                  style={{ color: "#2d3748", textDecoration: "none", fontWeight: "500" }}
                >
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/home/contactus"
                  style={{ color: "#2d3748", textDecoration: "none", fontWeight: "500" }}
                >
                  Book Service
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/home/clientdash"
                  style={{ color: "#2d3748", textDecoration: "none", fontWeight: "500" }}
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </Col>

          {/* Service Area & Availability */}
          <Col lg={3} md={6} xs={6} className="mb-4 mb-lg-0 text-start">
            <h5
              className="fw-semibold mb-3"
              style={{ color: "#00084c", fontSize: "1.1rem" }}
            >
              Service Area & Hours
            </h5>
            <p
              style={{
                color: "#333a42",
                fontSize: "0.95rem",
                lineHeight: "1.6",
              }}
              className="mb-2"
            >
              Proudly serving <strong>Toronto, Scarborough, the GTA</strong>,
              and surrounding areas.
            </p>
            <div
              className="d-flex align-items-center gap-2 mb-2"
              style={{ color: "#2d3748", fontSize: "0.92rem" }}
            >
              <FaClock className="text-secondary flex-shrink-0" />
              <span className="fw-medium">Available 7 Days a Week</span>
            </div>
            <div
              className="d-flex align-items-center gap-2"
              style={{ color: "#2d3748", fontSize: "0.92rem" }}
            >
              <FaMapMarkerAlt
                className="text-danger flex-shrink-0"
                style={{ color: "#b61414" }}
              />
              <span className="fw-medium">Scarborough, ON & GTA</span>
            </div>
          </Col>

          {/* Contact Details */}
          <Col lg={3} md={6} className="mb-4 mb-lg-0 text-start">
            <h5
              className="fw-semibold mb-3"
              style={{ color: "#00084c", fontSize: "1.1rem" }}
            >
              Contact Us
            </h5>
            <div
              className="d-flex flex-column gap-2"
              style={{ fontSize: "0.92rem" }}
            >
              <a
                href="tel:4169976627"
                style={{ color: "#2d3748", textDecoration: "none" }}
                className="d-flex align-items-center gap-2 py-1 fw-medium"
              >
                <FaPhone style={{ color: "#b61414" }} />
                <span>416 997 6627 / 647 606 2540</span>
              </a>
              <a
                href="mailto:solutionsgalaxyhome@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#2d3748", textDecoration: "none" }}
                className="d-flex align-items-center gap-2 py-1 text-break fw-medium"
              >
                <FaEnvelope style={{ color: "#b61414" }} />
                <span>solutionsgalaxyhome@gmail.com</span>
              </a>
            </div>
            <div className="mt-3">
              <Link
                to="/home/contactus"
                className="btn btn-sm text-white px-3 py-2 fw-semibold"
                style={{
                  backgroundColor: "#00084c",
                  borderRadius: "20px",
                  border: "none",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Request Free Quote
              </Link>
            </div>
          </Col>
        </Row>

        <hr
          style={{
            borderColor: "rgba(0, 0, 0, 0.15)",
            margin: "2rem 0 1.5rem 0",
          }}
        />

        {/* Bottom Copyright */}
        <Row className="align-items-center text-center text-md-start">
          <Col md={6} className="mb-2 mb-md-0">
            <p
              className="mb-0"
              style={{ color: "#555d67", fontSize: "0.85rem" }}
            >
              &copy; {new Date().getFullYear()} Galaxy Home Solutions. All
              rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p
              className="mb-0"
              style={{ color: "#555d67", fontSize: "0.85rem" }}
            >
              Trusted Handyman Service for Every Corner of Your House
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
