import React from "react";
import head from "../images/paint rep/premium_photo-1723867291079-0e3a69e7d412.avif"
import before from "../images/paint rep/beforep.jpg"
import after from "../images/paint rep/afterp.jpg"
import { motion } from "framer-motion";
import { StaggeredText } from "./TextAnimate";
import { Row, Col, CardImg, Container } from "reactstrap";

function CatDeat() {
    return (
        <motion.div
        className="pb-5"
        transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
        initial = {{x: 1000, opacity: 0}}
        animate= {{x: 0, opacity: 1}}
        exit= {{x: -1000, opacity: 0}}>
          <div className='d-flex justify-content-center align-items-center' style={{ position: 'relative', height: '100vh' }}>
            <CardImg src={head} style={{ height: '100vh', width: '100%', objectFit: 'cover' }}/>
            <div className="d-flex flex-column align-items-center justify-content-center w-100 p-3" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center'}}>
              <h1 className="mb-1 pb-3 text-center" style={{fontSize: "clamp(44px, 4vw, 70px)"}}>This is a demo head</h1>
              <h6 className='mb-3' style={{fontSize: "clamp(18px, 1vw, 40px)"}}>This is a demo sub header</h6>
            </div>
          </div>
            <Container>
                <Row className="mt-5 pt-5">
                    <Col md={6} style={{padding: "20px"}} className="d-flex flex-column align-items-center justify-content-center">
                        <h1 className="mb-5">Before</h1>
                        <p className="text-center pb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
{/*                         <motion.div
                        initial = {{x: -50, opacity: 0}}
                        style={{ objectFit: 'cover', height: "70%" }}
                        transition={{duration: 1, type: "tween", ease: "easeIn"}}
                        whileInView={{x: 0, opacity: 1}}
                        viewport={{ once: true }}>
                            <CardImg src={demo}></CardImg>
                        </motion.div> */}
                    </Col>
                    <Col md={6} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <motion.div
                        style={{width: "100%"}}
                        initial = {{x: 50, opacity: 0}}
                        transition={{duration: 1, type: "tween", ease: "easeIn"}}
                        whileInView={{x: 0, opacity: 1}}
                        viewport={{ once: true }}>
                            <CardImg src={before} style={{ objectFit: 'cover', borderRadius: "20px" }}></CardImg>
                        </motion.div>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md={6} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <motion.div
                        initial = {{x: -50, opacity: 0}}
                        style={{width: "100%"}}
                        transition={{duration: 1, type: "tween", ease: "easeIn"}}
                        whileInView={{x: 0, opacity: 1}}
                        viewport={{ once: true }}>
                            <CardImg src={after} style={{ objectFit: 'cover', borderRadius: "20px" }}></CardImg>
                        </motion.div>
                    </Col>
                    <Col md={6} style={{padding: "20px"}} className="d-flex flex-column align-items-center justify-content-center">
                        <h1 className="mb-5"><StaggeredText text={"After"}/></h1>
                        <p className="text-center pb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
{/*                         <motion.div
                        initial = {{x: 50, opacity: 0}}
                        style={{ objectFit: 'cover', height: "70%" }}
                        transition={{duration: 1, type: "tween", ease: "easeIn"}}
                        whileInView={{x: 0, opacity: 1}}
                        viewport={{ once: true }}>
                            <CardImg src={demo}></CardImg>
                        </motion.div> */}
                    </Col>
                </Row>
            </Container>
        </motion.div>
    );
}

export default CatDeat