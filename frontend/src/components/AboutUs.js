import React from "react";
import aboutPic from "../images/HandymanServices-Part-3-Image.jpg"
import { motion } from "framer-motion";
import { Col, Container, Row, CardImg } from "reactstrap";
import { Link } from "react-router-dom";

function About() {
    return (
        <motion.div
        style={{ backgroundColor: "#00084c", paddingTop: "2rem" }}
        transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
        initial = {{x: 1000, opacity: 0}}
        animate= {{x: 0, opacity: 1}}
        exit= {{x: -1000, opacity: 0}}>
            <Container
                style={{ minHeight: "100vh" }}
                className="d-flex align-items-center justify-content-center"
            >
                <Row className="w-100 pb-5">
                    <Col md={6} className="d-flex justify-content-center">
                        <motion.div
                        className="mb-4"
                        style={{width: "100%"}}
                        initial = {{x: -50, opacity: 0}}
                        transition={{duration: 1, type: "tween", ease: "easeIn"}}
                        whileInView={{x: 0, opacity: 1}}
                        viewport={{ once: true }}>
                            <CardImg
                                src={aboutPic}
                                style={{ objectFit: "cover", maxHeight: "100%", maxWidth: "100%", borderRadius: "15px" }}
                            ></CardImg>
                        </motion.div>
                    </Col>
                    <Col md={6} className="d-flex align-items-center">
                        <div style={{color: "#d8d9da"}} className="home-butt">
                            <p>
                                At Galaxy Home Solutions, we are a family-owned business dedicated to providing trusted, reliable, and high-quality home renovations and handyman services. With a passion for craftsmanship and a commitment to excellence, we take pride in transforming houses into homes with care, precision, and attention to detail.
                            </p>
                            <p>
                                From minor repairs to full renovations, our skilled team is here to help you with all your home improvement needs. We believe in honest work, transparent pricing, and customer satisfaction above all else. Whether it's installations, maintenance, electrical work, appliance repairs, or tool rentals, we bring professionalism and expertise to every project, no matter the size.
                            </p>
                            <p>
                                At Galaxy Home Solutions, we treat your home like our own. Let us handle the hard work while you enjoy the results!
                            </p>
                            <div>📍 Serving Toronto and surrounding areas</div>
                            <div className="mt-1 mb-3">📞 Contact us today for a free quote!</div>
                            <div style={{display: "inline-block"}} className="butt">
                                <Link to="/home/contactus">
                                    Contact
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
