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
                  padding: "20vh 5vh",
                  position: "relative",
                  height: "50vh", 
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <motion.h1
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    ...style,
                    paddingLeft: "10px",
                    transition: "transform 0.1s ease",
                    color: "#fff",
                  }}
                >
                  {heading[index]}
                </motion.h1>
                <motion.p
                  className="text-white text-center"
                  style={{
                    ...style,
                    paddingLeft: "10px",
                    transition: "transform 0.1s ease",
                  }}
                >
                  <StaggeredText key={texts[index]} text={texts[index]} />
                </motion.p>
                <div className="d-flex justify-content-center">
                  <div className="mt-3 butt" style={{ display: "inline-block" }}>
                    {index === 2 ? (
                      <Scroll to={links[index]}>
                        {butts[index]}
                      </Scroll>
                    ) : (
                      <Link to={links[index]}>
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
                left: "10px",
                bottom: "20px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FaRegArrowAltCircleLeft color="#ffffff" size={30} />
            </button>
            <button
              onClick={handleNext}
              style={{
                position: "absolute",
                right: "10px",
                bottom: "20px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FaRegArrowAltCircleRight color="#ffffff" size={30} />
            </button>
          </Col>

          <Col
            md={6}
            xs={12}
            className="p-0 d-flex justify-content-center align-items-center"
            style={{ position: "relative", minHeight: "50vh" }}
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
                paddingTop: "30vh",  // Top padding of 30vh
                paddingLeft: "20vh", // Left padding of 20px
                position: "relative",
                height: "100vh",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  ...style,
                  paddingLeft: "10px",
                  transition: "transform 0.1s ease",
                  color: "#fff",
                }}
              >
                {heading[index]}
              </motion.h1>
              <motion.p
                className="text-white"
                style={{
                  ...style,
                  paddingLeft: "10px",
                  transition: "transform 0.1s ease",
                }}
              >
                <StaggeredText key={texts[index]} text={texts[index]} />
              </motion.p>
              <div className="mt-3 butt" style={{ display: "inline-block" }}>  
                {index === 2 ? (
                  <Scroll to={links[index]}>
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
            }}
          >
            <FaRegArrowAltCircleLeft color="#ffffff" size={30} />
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
            }}
          >
            <FaRegArrowAltCircleRight color="#ffffff" size={30} />
          </button>
        </Col>
      </Row>
      </MediaQuery>
    </Container>
  );
};

export default HeroSec;
