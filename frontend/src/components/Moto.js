import React, { useRef } from "react";
import img1 from "../images/HomeD/9842af14-db45-4108-b917-7c975d5e4acd.jfif";
import img2 from "../images/HomeD/28a927c1-6433-41b5-ac87-1b410060a0ff.jfif";
import img3 from "../images/HomeD/b855b8d8-bb60-4f69-8772-0f55a39951a7.jfif";
import { motion, useInView } from "framer-motion";
import { Card, CardImg, Col, Container, Row } from "react-bootstrap";
import { CardBody, CardText } from "reactstrap";

const motoItems = [
  {
    img: img1,
    title: "Why Choose Galaxy Home Solutions?",
    text: "We take pride in being a trusted and reliable family-owned business, offering homeowners peace of mind with every project. Our team understands that time is valuable, so we take care of your home improvements, repairs, and installations without the stress and hassle. With professional experience and a keen eye for detail, we bring expertise to every job, ensuring your home is both functional and beautiful.",
  },
  {
    img: img2,
    title: "Quality Craftsmanship, Every Time",
    text: "At Galaxy Home Solutions, we believe that every home deserves top-tier craftsmanship and expert care. Whether it’s a small repair, a custom renovation, or a complete makeover, we ensure seamless communication, proper budgeting, and efficient project management. Our team is committed to delivering high-quality handyman services that not only meet but exceed your expectations.",
  },
  {
    img: img3,
    title: "Professional Service, Fair Pricing",
    text: "Unlike larger contractors who may overlook smaller jobs, we treat every project with importance, no matter the size. Whether you need repairs, renovations, or routine maintenance, we offer affordable and transparent pricing with no hidden costs. At Galaxy Home Solutions, we believe in making high-quality home services accessible, so you can enjoy a home that’s well-maintained and built to last.",
  },
];

function MotoCard({ item, index }) {
  const cardRef = useRef(null);
  // useInView with { once: true, margin: "0px 0px -40px 0px" } precisely monitors each card's own bounding box
  const isInView = useInView(cardRef, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <Col lg={4} md={4} xs={12} className="d-flex align-items-stretch mb-4 mb-md-0">
      <div ref={cardRef} className="w-100 d-flex">
        <motion.div
          className="w-100 d-flex"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{
            duration: 0.75,
            ease: "easeOut",
            delay: typeof window !== "undefined" && window.innerWidth >= 768 ? index * 0.15 : 0.05,
          }}
        >
          <Card
            className="w-100 shadow-sm border-0 d-flex flex-column"
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              backgroundColor: "#ffffff",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <div
              style={{
                height: "220px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f4f5f7",
              }}
            >
              <CardImg
                src={item.img}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <CardBody className="d-flex flex-column p-4 flex-grow-1">
              <h5
                className="text-center mb-3"
                style={{
                  fontWeight: "700",
                  color: "#00084c",
                  fontSize: "1.15rem",
                  minHeight: "2.7rem",
                }}
              >
                {item.title}
              </h5>
              <CardText
                className="text-center text-muted flex-grow-1 mb-0"
                style={{
                  fontSize: "0.95rem",
                  lineHeight: "1.65",
                }}
              >
                {item.text}
              </CardText>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </Col>
  );
}

function Moto() {
  return (
    <Container className="my-5">
      <Row className="g-4 d-flex align-items-stretch">
        {motoItems.map((item, index) => (
          <MotoCard key={index} item={item} index={index} />
        ))}
      </Row>
    </Container>
  );
}

export default Moto;
