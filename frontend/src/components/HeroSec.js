import React, { useState } from "react";
import { StaggeredText } from "./TextAnimate";
import demo1 from "../images/Hero Slider/contact.jpg";
import demo2 from "../images/hero-image.fill.size_1248x702.v1703441414.jpg";
import demo3 from "../images/Measuring-for-remodeling.jpg";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
import MediaQuery from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Link as Scroll } from "react-scroll";

const heading = ["Contact Us", "Tool Rental", "Estimation"];
const butts = ["Contact", "Rent Tool", "Free Estimation"];
const texts = ["Get in touch with us...", "Rent tools that suits your needs...", "Get an estimation of our services..."];
const images = [demo1, demo2, demo3];
const links = ["/home/contactus", "/home/homed", "freest"]

const HeroSec = () => {
  const [index, setIndex] = useState(0);
  const [style, setStyle] = useState({ transform: "translate(0, 0)" });

/*   useEffect(() => {
    const interval = setInterval(handleNext, 6000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []); // Empty dependency array ensures it runs once on mount */

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * -30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;

    setStyle({ transform: `translate(${x}px, ${y}px)` });
  };

  const handleMouseLeave = () => {
    setStyle({ transform: "translate(0, 0)", transition: "transform 0.2s ease" });
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % texts.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + texts.length) % texts.length);
  };

  return (
    <Container fluid>
      <MediaQuery maxWidth={639}>
        <Row>
          <Col md={6} xs={12} className="p-0 home-butt" style={{ position: "relative", backgroundColor: "#00084c" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "52vh",
                  padding: "3.5rem 1.75rem 2.5rem 1.75rem",
                  position: "relative",
                  textAlign: "center",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  style={{
                    color: "#f1593a",
                    fontSize: "0.78rem",
                    fontWeight: "700",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  Galaxy Home Solutions
                </div>
                <motion.h1
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    ...style,
                    transition: "transform 0.1s ease",
                    color: "#ffffff",
                    fontSize: "clamp(2rem, 6.5vw, 2.5rem)",
                    fontWeight: "800",
                    letterSpacing: "-0.02em",
                    lineHeight: "1.15",
                    marginBottom: "0.75rem",
                  }}
                >
                  {heading[index]}
                </motion.h1>
                <motion.div
                  className="text-center"
                  style={{
                    ...style,
                    transition: "transform 0.1s ease",
                    color: "rgba(255, 255, 255, 0.88)",
                    fontSize: "clamp(0.95rem, 3.5vw, 1.1rem)",
                    fontWeight: "400",
                    lineHeight: "1.55",
                    maxWidth: "360px",
                    marginBottom: "1.25rem",
                  }}
                >
                  <StaggeredText key={texts[index]} text={texts[index]} />
                </motion.div>
                <div className="d-flex justify-content-center">
                  <div
                    className="butt"
                    style={{
                      display: "inline-block",
                      fontSize: "0.95rem",
                      fontWeight: "600",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {index === 2 ? (
                      <Scroll to={links[index]} style={{ textDecoration: "none", color: "inherit" }}>
                        {butts[index]}
                      </Scroll>
                    ) : (
                      <Link to={links[index]} style={{ textDecoration: "none", color: "inherit" }}>
                        {butts[index]}
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <button
              onClick={handlePrev}
              style={{
                position: "absolute",
                left: "12px",
                bottom: "16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                opacity: 0.85,
              }}
              aria-label="Previous slide"
            >
              <FaRegArrowAltCircleLeft color="#ffffff" size={28} />
            </button>
            <button
              onClick={handleNext}
              style={{
                position: "absolute",
                right: "12px",
                bottom: "16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                opacity: 0.85,
              }}
              aria-label="Next slide"
            >
              <FaRegArrowAltCircleRight color="#ffffff" size={28} />
            </button>
          </Col>

          <Col
            md={6}
            xs={12}
            className="p-0 d-flex justify-content-center align-items-center"
            style={{ position: "relative", minHeight: "48vh" }}
          >
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "0 0 30px 30px",
                backgroundImage: `url(${images[index]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Col>
        </Row>
      </MediaQuery>
      <MediaQuery minWidth={640}>
      <Row style={{backgroundColor: "#00084c"}}>
        <Col md={6} xs={12} className="p-0 home-butt" style={{display: "inline-block"}}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index} // Ensures re-render for smooth animation
              initial={{ opacity: 0 }}
              animate={{ opacity: 1}}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                minHeight: "100vh",
                height: "100vh",
                padding: "3rem clamp(2.5rem, 5.5vw, 6rem)",
                position: "relative",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                style={{
                  color: "#f1593a",
                  fontSize: "clamp(0.8rem, 1.1vw, 0.95rem)",
                  fontWeight: "700",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  marginBottom: "0.85rem",
                  paddingLeft: "4px",
                }}
              >
                Galaxy Home Solutions
              </div>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  ...style,
                  transition: "transform 0.1s ease",
                  color: "#ffffff",
                  fontSize: "clamp(2.4rem, 4.6vw, 3.8rem)",
                  fontWeight: "800",
                  letterSpacing: "-0.025em",
                  lineHeight: "1.15",
                  marginBottom: "1.15rem",
                  paddingLeft: "4px",
                }}
              >
                {heading[index]}
              </motion.h1>
              <motion.div
                style={{
                  ...style,
                  transition: "transform 0.1s ease",
                  color: "rgba(255, 255, 255, 0.88)",
                  fontSize: "clamp(1.05rem, 1.8vw, 1.32rem)",
                  fontWeight: "400",
                  lineHeight: "1.65",
                  maxWidth: "520px",
                  marginBottom: "1.85rem",
                  paddingLeft: "4px",
                }}
              >
                <StaggeredText key={texts[index]} text={texts[index]} />
              </motion.div>
              <div
                className="butt"
                style={{
                  display: "inline-block",
                  fontSize: "1.05rem",
                  fontWeight: "600",
                  letterSpacing: "0.5px",
                }}
              >  
                {index === 2 ? (
                  <Scroll to={links[index]} style={{ textDecoration: "none", color: "inherit" }}>
                    {butts[index]}
                  </Scroll>
                  ) : (
                  <Link style={{textDecoration: "none", color: "inherit"}} to={links[index]}>
                    {butts[index]}
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={handlePrev}
            style={{
              position: "absolute",
              left: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              opacity: 0.85,
            }}
            aria-label="Previous slide"
          >
            <FaRegArrowAltCircleLeft color="#ffffff" size={32} />
          </button>
        </Col>
        <Col md={6} xs={12} style={{position: "relative"}} className="p-0 d-flex justify-content-center align-items-center">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: "absolute",
              borderRadius: "0px 0 30px 30px",
              top: "0%",
              width: "100%",
              height: "90%",
              backgroundImage: `url(${images[index]})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
          <button
            onClick={handleNext}
            style={{
              position: "absolute",
              right: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              opacity: 0.85,
            }}
            aria-label="Next slide"
          >
            <FaRegArrowAltCircleRight color="#ffffff" size={32} />
          </button>
        </Col>
      </Row>
      </MediaQuery>
    </Container>
  );
};

export default HeroSec;
