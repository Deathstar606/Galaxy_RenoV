import React from "react";
import { CardImg, Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import Head from "../images/lighting/lighting head.jpg"
import pot from "../images/lighting/potlights.webp"
import swt from "../images/lighting/lightswitch.jpg"
import fix from "../images/lighting/lightfixture.webp"

function SubCat () {
    return (
        <motion.div
        className="pb-5"
        transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
        initial = {{x: 1000, opacity: 0}}
        animate= {{x: 0, opacity: 1}}
        exit= {{x: -1000, opacity: 0}}>
          <div className='d-flex justify-content-center align-items-center text-white' style={{ position: 'relative', height: '100vh' }}>
            <CardImg src={Head} style={{ height: '100vh', width: '100%', objectFit: 'cover' }}/>
            <div className="d-flex flex-column align-items-center justify-content-center w-100 p-3" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center'}}>
              <h1 className="mb-1 pb-3 text-center" style={{fontSize: "clamp(44px, 4vw, 70px)"}}>This is a demo head</h1>
              <h6 className='mb-3' style={{fontSize: "clamp(18px, 1vw, 40px)"}}>This is a demo sub header</h6>
            </div>
          </div>
            <Container className="pt-5 pb-5">
                <Row>
                    <motion.div
                    style={{display: "inline-flex", paddingTop: "40px"}}
                    transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
                    initial = {{y: 50, opacity: 0}}
                    whileInView={{y: 0, opacity: 1}}
                    viewport={{ once: true }}>
                        <Col md={6} style={{padding: "20px"}} className="d-flex flex-column align-items-center justify-content-center">
                            <h2 className="pb-4">Pot Lights</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>
                        </Col>
                        <Col md={6}>
                            <CardImg src={pot} style={{ objectFit: 'cover', borderRadius: "20px" }}/>
                        </Col>
                    </motion.div>
                    <motion.div
                    style={{display: "inline-flex", paddingTop: "40px"}}
                    transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
                    initial = {{y: 50, opacity: 0}}
                    whileInView={{y: 0, opacity: 1}}
                    viewport={{ once: true }}>
                        <Col md={6} style={{padding: "20px"}} className="d-flex flex-column align-items-center justify-content-center">
                            <h2 className="pb-4">Switch Fixtures</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>
                        </Col>
                        <Col md={6}>
                            <CardImg src={fix} style={{ objectFit: 'cover', borderRadius: "20px" }}/>
                        </Col>
                    </motion.div>
                    <motion.div
                    style={{display: "inline-flex", paddingTop: "40px"}}
                    transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
                    initial = {{y: 50, opacity: 0}}
                    whileInView={{y: 0, opacity: 1}}
                    viewport={{ once: true }}>
                        <Col md={6} style={{padding: "20px"}} className="d-flex flex-column align-items-center justify-content-center">
                            <h2 className="pb-4">Switches</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>
                        </Col>
                        <Col md={6}>
                            <CardImg src={swt} style={{ objectFit: 'cover', borderRadius: "20px" }}/>
                        </Col>
                    </motion.div>
                </Row>
            </Container>
        </motion.div>
    )
}

export default SubCat