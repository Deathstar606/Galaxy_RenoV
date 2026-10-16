import React, { useRef } from "react";
import { Container, Row, Col, CardImg } from "reactstrap";
import { StaggeredText } from "./TextAnimate";
import { motion, useInView } from "framer-motion";
import MediaQuery from "react-responsive";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function ServiceCardContent({ service }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      className="d-flex flex-column align-items-center justify-content-start text-center p-3 h-100"
      style={{
        minHeight: "300px",
        height: "100%",
        padding: "20px 15px",
        borderRadius: "20px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      }}
      initial={{ y: 60, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        ref={ref}
        className="d-flex justify-content-center w-100"
        initial={{ y: 60, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{
          scale: 1.08,
          rotate: 3,
          transition: { type: "spring", stiffness: 250 },
        }}
      >
        <div className="service-image-container rounded-circle overflow-hidden">
          <CardImg src={service.mainImg} alt={service.name} />
        </div>
      </motion.div>
      <p
        className="text-center pt-3 mb-2"
        style={{ fontWeight: "bold", fontSize: "1.1rem" }}
      >
        {service.name}
      </p>
      <div
        className="text-center text-muted"
        style={{ fontSize: "0.92rem", lineHeight: "1.5" }}
      >
        {service.description}
      </div>
    </motion.div>
  );
}

function ServiceCard({ service }) {
  return (
    <Col lg={3} md={6} xs={12} className="mb-4 d-flex align-items-stretch">
      <div className="w-100">
        <ServiceCardContent service={service} />
      </div>
    </Col>
  );
}

function Service({ services }) {
  const serviceList = services?.services || [];

  return (
    <>
      <h1 className="text-center mt-5 pt-4" id="serve">
        <StaggeredText text={"Our Services"} />
      </h1>
      <p className="text-center mt-2 pb-4 text-muted">View our services</p>
      <Container className="mb-5">
        {serviceList.length === 0 ? (
          <h3 className="text-center w-100 mt-5 mb-5">Services Loading...</h3>
        ) : (
          <>
            {/* Desktop / Tablet layout: 4 per row with bottom spacing */}
            <MediaQuery minWidth={768}>
              <Row className="d-flex justify-content-center">
                {serviceList.map((service, index) => (
                  <ServiceCard key={index} service={service} />
                ))}
              </Row>
            </MediaQuery>

            {/* Mobile layout: Overhauled with Swiper 1.5 slides per view */}
            <MediaQuery maxWidth={767}>
              <div className="services-mobile-swiper py-2">
                <Swiper
                  modules={[Pagination, Autoplay]}
                  spaceBetween={16}
                  slidesPerView={1.5}
                  centeredSlides={false}
                  grabCursor={true}
                  pagination={{ clickable: true, dynamicBullets: true }}
                  style={{ paddingBottom: "45px" }}
                >
                  {serviceList.map((service, index) => (
                    <SwiperSlide
                      key={index}
                      style={{ height: "auto", display: "flex" }}
                    >
                      <div className="w-100 h-100 d-flex flex-column pb-4">
                        <ServiceCardContent service={service} />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </MediaQuery>
          </>
        )}
      </Container>
    </>
  );
}

export default Service;
