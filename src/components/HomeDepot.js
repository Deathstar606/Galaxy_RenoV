import React, { useState } from "react";
import { CiLocationOff } from "react-icons/ci";
import {
  CardImg,
  Container,
  Row,
  Col,
  Table,
  Card,
  CardBody,
  CardText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { AnimatePresence, motion } from "framer-motion";
import { StaggeredText } from "./TextAnimate";

import axios from "axios";
import { baseUrl } from "../shared/baseurl";
import { generateEmailHtml } from "../emails";

import icon1 from "../images/Rent Page/age.jfif";
import icon2 from "../images/Rent Page/card.jfif";
import icon3 from "../images/Rent Page/location.jfif";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MediaQuery from "react-responsive";

function ToolDeats({ deats, handleHide }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    toolId: deats._id,
    duration: "",
    pickupMethod: "",
    price: 0,
    charge: 0,
    location: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPanel, setCurrentPanel] = useState("1st");
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);

  const toggleDropdown1 = () => setDropdownOpen1(!dropdownOpen1);
  const toggleDropdown2 = () => setDropdownOpen2(!dropdownOpen2);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentPanel === "1st" && formData.pickupMethod && formData.duration) {
      setCurrentPanel("2nd");
    } else {
      alert("Please select both duration and pickup method to proceed.");
    }
  };

  const handleRrev = () => {
    setCurrentPanel("1st");
    handleChange("charge", 0);
  };

  const handleLocationCharge = (location) => {
    const baseLocation = { latitude: 45.4215, longitude: -75.6972 };
    const R = 6371;
    const toRad = (value) => (value * Math.PI) / 180;

    const dLat = toRad(location.latitude - baseLocation.latitude);
    const dLon = toRad(location.longitude - baseLocation.longitude);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(baseLocation.latitude)) *
        Math.cos(toRad(location.latitude)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    const charge = distance * 5;
    handleChange("charge", charge.toFixed(2));
  };

  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const clientLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          handleChange("location", clientLocation);
          handleLocationCharge(clientLocation);
        },
        (error) => console.error("Error fetching location:", error),
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = () => {
    const { name, phone, email, duration, pickupMethod } = formData;

    // 🔴 Basic validation
    if (!name || !phone || !email || !duration || !pickupMethod) {
      alert("Please fill in all required fields before submitting.");
      return;
    }

    if (pickupMethod === "Home Delivery" && formData.charge === 0) {
      alert("Please select a location for delivery.");
      return;
    }

    const updatedFormData = {
      ...formData,
      charge: pickupMethod === "Self Pickup" ? 0 : formData.charge,
      location: pickupMethod === "Self Pickup" ? "" : formData.location,
    };

    // 🟡 Inform user that submission has started
    setIsSubmitting(true);
    alert("Please wait while your reservation is being processed...");

    axios
      .post(baseUrl + "rents", updatedFormData)
      .then((response) => {
        console.log("Reservation successful:", response.data);

        const existingRentals =
          JSON.parse(localStorage.getItem("clientRentals")) || [];

        const newRental = {
          _id: response.data._id,
          toolId: updatedFormData.toolId,
          name: updatedFormData.name, // The client's name
          trackingStatus: "pending", // Default status for new rentals
          duration: updatedFormData.duration,
          pickupMethod: updatedFormData.pickupMethod,
        };
        localStorage.setItem(
          "clientRentals",
          JSON.stringify([...existingRentals, newRental]),
        );

        const emailHtml = generateEmailHtml(
          updatedFormData.name,
          "this is a test message",
          "",
        );

        return axios.post(baseUrl + "mail", {
          subject: "this is a test",
          htmlContent: emailHtml,
          email: updatedFormData.email,
          message: `A reservation for ${deats.name} has been confirmed. The requested duration is ${updatedFormData.duration}.`,
        });
      })
      .then(() => {
        alert(
          "✅ Reservation complete! A confirmation email has been sent. Refresh the page to see your reservation in the 'My Rentals' section.",
        );
      })
      .catch((error) => {
        console.error("Error processing request:", error);
        alert("❌ Something went wrong. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });

    console.log("Reservation Details:", updatedFormData);
  };
  return (
    <motion.div
      className="modal-back"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="d-flex justify-content-center m-3 m-md-5"
        initial={{ opacity: 0, y: -400 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -400 }}
        transition={{ duration: 0.3 }}
      >
        <Container
          className="homed_modal_container position-relative shadow-lg"
          style={{ borderRadius: "20px" }}
        >
          <button
            style={{
              position: "absolute",
              top: "12px",
              right: "18px",
              background: "transparent",
              border: "none",
              fontSize: "36px",
              color: "#333",
              lineHeight: 1,
              cursor: "pointer",
              zIndex: 10,
            }}
            aria-label="Close"
            onClick={handleHide}
          >
            &times;
          </button>

          {currentPanel === "1st" && (
            <>
              <Row className="align-items-center">
                <Col
                  md={6}
                  xs={12}
                  className="d-flex align-items-center justify-content-center mb-4 mb-md-0"
                >
                  <div
                    style={{
                      width: "100%",
                      height: "380px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "16px",
                      padding: "20px",
                    }}
                  >
                    <CardImg
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                      src={baseUrl + deats.image}
                      alt={deats.name}
                    />
                  </div>
                </Col>
                <Col
                  md={6}
                  xs={12}
                  style={{
                    backgroundColor: "#fbfbfb",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    padding: "25px",
                  }}
                >
                  <h3
                    style={{
                      color: "#00084c",
                      fontWeight: "700",
                      marginBottom: "10px",
                    }}
                  >
                    {deats.name}
                  </h3>
                  <p
                    className="text-muted"
                    style={{ lineHeight: "1.6", fontSize: "0.95rem" }}
                  >
                    {deats.description}
                  </p>
                  <div
                    className="mb-3"
                    style={{
                      overflowX: "auto",
                      whiteSpace: "nowrap",
                      scrollbarWidth: "none",
                    }}
                  >
                    <Table
                      bordered
                      hover
                      responsive
                      className="mb-0 text-center"
                      style={{ borderRadius: "10px", overflow: "hidden" }}
                    >
                      <thead
                        style={{ backgroundColor: "#00084c", color: "#ffffff" }}
                      >
                        <tr>
                          <th className="py-2">4 Hour</th>
                          <th className="py-2">1 Day</th>
                          <th className="py-2">1 Week</th>
                          <th className="py-2">4 Weeks</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ fontWeight: "600", color: "#2d3748" }}>
                          {deats.prices.map((price, index) => (
                            <td key={index} className="py-2">
                              {price} TK
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <div className="mb-2 button_container d-flex flex-wrap gap-2">
                    <Dropdown isOpen={dropdownOpen1} toggle={toggleDropdown1}>
                      <DropdownToggle caret className="butt m-1">
                        {formData.duration
                          ? formData.duration
                          : "Select Duration"}
                      </DropdownToggle>
                      <DropdownMenu>
                        {["4 Hour", "1 Day", "1 Week", "4 Weeks"].map(
                          (duration, index) => (
                            <DropdownItem
                              key={duration}
                              onClick={() => {
                                handleChange("duration", duration);
                                handleChange("price", deats.prices[index]);
                              }}
                            >
                              {duration}
                            </DropdownItem>
                          ),
                        )}
                      </DropdownMenu>
                    </Dropdown>

                    <Dropdown isOpen={dropdownOpen2} toggle={toggleDropdown2}>
                      <DropdownToggle caret className="butt m-1">
                        {formData.pickupMethod
                          ? formData.pickupMethod
                          : "Select Pickup"}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={() =>
                            handleChange("pickupMethod", "Self Pickup")
                          }
                        >
                          Self Pickup
                        </DropdownItem>
                        <DropdownItem
                          onClick={() =>
                            handleChange("pickupMethod", "Home Delivery")
                          }
                        >
                          Home Delivery
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div
                    className="p-3 my-3"
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "10px",
                      border: "1px dashed #cbd5e0",
                    }}
                  >
                    <p
                      className="mb-1 text-muted"
                      style={{ fontSize: "0.9rem" }}
                    >
                      <strong>Duration:</strong>{" "}
                      {formData.duration || "Not selected"}
                    </p>
                    <p
                      className="mb-0 text-muted"
                      style={{ fontSize: "0.9rem" }}
                    >
                      <strong>Pick up method:</strong>{" "}
                      {formData.pickupMethod || "Not selected"}
                    </p>
                  </div>
                  <div
                    style={{ display: "inline-block" }}
                    className="butt"
                    onClick={handleNext}
                  >
                    Request Reservation
                  </div>
                </Col>
              </Row>
            </>
          )}

          {currentPanel === "2nd" && (
            <Row className="align-items-center">
              <Col
                md={6}
                className="d-flex align-items-center justify-content-center mb-4 mb-md-0"
              >
                <div
                  style={{
                    width: "100%",
                    height: "360px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "16px",
                    padding: "20px",
                  }}
                >
                  <CardImg
                    src={baseUrl + deats.image}
                    alt={deats.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </Col>
              <Col md={6}>
                <h4
                  className="mb-3"
                  style={{ color: "#00084c", fontWeight: "700" }}
                >
                  Reservation Summary
                </h4>
                <div
                  className="p-3 mb-3"
                  style={{ backgroundColor: "#f8f9fa", borderRadius: "12px" }}
                >
                  <p className="mb-1">
                    <strong>Tool:</strong> {deats.name}
                  </p>
                  <p className="mb-1">
                    <strong>Pickup Method:</strong> {formData.pickupMethod}
                  </p>
                  <p className="mb-1">
                    <strong>Duration:</strong> {formData.duration}
                  </p>
                  <p className="mb-0">
                    <strong>Price:</strong> {formData.price} TK
                  </p>
                </div>

                <Row className="mb-2">
                  <Col md={6} xs={12} className="mb-2 mb-md-0">
                    <input
                      type="text"
                      placeholder="Enter Name"
                      className="form-control"
                      value={formData.name || ""}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <input
                      type="text"
                      placeholder="Enter Phone Number"
                      className="form-control"
                      value={formData.phone || ""}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      className="form-control"
                      value={formData.email || ""}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </Col>
                </Row>

                {formData.pickupMethod === "Self Pickup" ? (
                  <>
                    <p className="text-muted">
                      <strong>Delivery Charge:</strong> $0
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                      <div
                        className="butt"
                        style={{ display: "inline-block" }}
                        onClick={handleSubmit}
                      >
                        Confirm Reservation
                      </div>
                      <div
                        className="butt"
                        style={{ display: "inline-block" }}
                        onClick={handleRrev}
                      >
                        Go Back
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="d-flex flex-wrap gap-2 mb-2">
                      <div
                        className="butt"
                        style={{ display: "inline-block" }}
                        onClick={() => {
                          handleChange("charge", 10);
                          handleChange("location", "Ottawa");
                        }}
                      >
                        Ottawa (+$10)
                      </div>
                      <div
                        className="butt"
                        style={{ display: "inline-block" }}
                        onClick={() => {
                          handleChange("charge", 15);
                          handleChange("location", "Toronto");
                        }}
                      >
                        Toronto (+$15)
                      </div>
                      <div
                        className="butt"
                        style={{ display: "inline-block" }}
                        onClick={() => {
                          handleChange("charge", 20);
                          handleChange("location", "Quebec");
                        }}
                      >
                        Quebec (+$20)
                      </div>
                    </div>
                    <div
                      style={{ cursor: "pointer", display: "inline-block" }}
                      className="mt-1 mb-2 butt"
                      onClick={findMyLocation}
                    >
                      Find My Location <CiLocationOff className="ms-1" />
                    </div>
                    <p className="text-muted">
                      <strong>Delivery Charge:</strong> ${formData.charge}
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                      <div
                        className="butt"
                        style={{
                          display: "inline-block",
                          opacity: isSubmitting ? 0.6 : 1,
                          pointerEvents: isSubmitting ? "none" : "auto",
                          cursor: isSubmitting ? "not-allowed" : "pointer",
                        }}
                        onClick={!isSubmitting ? handleSubmit : undefined}
                      >
                        {isSubmitting ? "Submitting..." : "Confirm Reservation"}
                      </div>
                      <div
                        className="butt"
                        style={{ display: "inline-block" }}
                        onClick={handleRrev}
                      >
                        Go Back
                      </div>
                    </div>
                  </>
                )}
              </Col>
            </Row>
          )}
        </Container>
      </motion.div>
    </motion.div>
  );
}

function HomeD({ tools }) {
  const [selectedTool, setSelectedTool] = useState(null);

  const handleShow = (tool) => {
    setSelectedTool(tool);
  };

  const handleHide = () => {
    setSelectedTool(null);
  };

  const requirementCards = [
    {
      img: icon3,
      alt: "Rental return policy",
      title: "Return Policy",
      desc: "Rentals must be returned to the same location.",
    },
    {
      img: icon2,
      alt: "Credit card requirement",
      title: "Security Deposit",
      desc: "Have a valid credit card for a deposit at the time of pick-up.",
    },
    {
      img: icon1,
      alt: "Age and ID requirement",
      title: "Valid Identification",
      desc: "Must be at least 18 years old with government-issued photo ID.",
    },
  ];

  return (
    <motion.div
      className="pb-5"
      transition={{ duration: 0.5, type: "tween", ease: "easeIn" }}
      initial={{ x: 1000, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -1000, opacity: 0 }}
    >
      <div className="text-center mt-5 mb-4">
        <h1 className="fw-bold mb-2">
          <StaggeredText text={"Tool Rental"} />
        </h1>
        <p
          className="text-muted mx-auto"
          style={{ maxWidth: "600px", fontSize: "1.05rem" }}
        >
          Premium equipment and tools ready for your DIY home improvement
          projects
        </p>
      </div>

      <Container className="tool_container">
        {/* Requirements Section */}
        <MediaQuery minWidth={640}>
          <Row className="py-4 justify-content-center g-4">
            {requirementCards.map((req, idx) => (
              <Col md={4} xs={12} key={idx} className="d-flex">
                <div
                  className="w-100 p-4 text-center d-flex flex-column align-items-center justify-content-start"
                  style={{
                    backgroundColor: "#fbfbfd",
                    border: "1px solid #eef0f4",
                    borderRadius: "18px",
                    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.04)",
                    transition: "transform 0.25s ease",
                  }}
                >
                  <div
                    className="d-flex justify-content-center align-items-center mb-3"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.06)",
                      padding: "10px",
                    }}
                  >
                    <CardImg
                      src={req.img}
                      alt={req.alt}
                      style={{
                        maxWidth: "75%",
                        maxHeight: "75%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <h6
                    style={{
                      fontWeight: "700",
                      color: "#00084c",
                      marginBottom: "8px",
                    }}
                  >
                    {req.title}
                  </h6>
                  <p
                    className="text-muted mb-0"
                    style={{ fontSize: "0.92rem", lineHeight: "1.5" }}
                  >
                    {req.desc}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </MediaQuery>

        <MediaQuery maxWidth={639}>
          <div className="py-3">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={16}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3500 }}
              style={{ paddingBottom: "35px" }}
            >
              {requirementCards.map((req, idx) => (
                <SwiperSlide key={idx} className="pb-5">
                  <div
                    className="p-4 text-center d-flex flex-column align-items-center"
                    style={{
                      backgroundColor: "#fbfbfd",
                      border: "1px solid #eef0f4",
                      borderRadius: "18px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div
                      className="d-flex justify-content-center align-items-center mb-3"
                      style={{
                        width: "90px",
                        height: "90px",
                        borderRadius: "50%",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.06)",
                        padding: "10px",
                      }}
                    >
                      <CardImg
                        src={req.img}
                        alt={req.alt}
                        style={{
                          maxWidth: "75%",
                          maxHeight: "75%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <h6
                      style={{
                        fontWeight: "700",
                        color: "#00084c",
                        marginBottom: "6px",
                      }}
                    >
                      {req.title}
                    </h6>
                    <p
                      className="text-muted mb-0"
                      style={{ fontSize: "0.9rem", lineHeight: "1.5" }}
                    >
                      {req.desc}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </MediaQuery>

        {/* Section Heading */}
        <div className="text-center pt-5 pb-3">
          <h2 className="fw-bold" style={{ color: "#00084c" }}>
            Rent the Product
          </h2>
          <p className="text-muted" style={{ fontSize: "0.95rem" }}>
            Select from our catalog of professional-grade tools
          </p>
        </div>

        {/* Product Grid */}
        <Row className="g-4 justify-content-center">
          {tools.tool.map((tl, index) => (
            <Col
              lg={3}
              md={4}
              sm={6}
              xs={12}
              key={index}
              className="d-flex align-items-stretch"
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-100 d-flex"
                style={{
                  borderRadius: "18px",
                  overflow: "hidden",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.06)",
                }}
              >
                <Card
                  className="w-100 border-0 d-flex flex-column"
                  style={{ borderRadius: "18px", overflow: "hidden" }}
                >
                  <div
                    style={{
                      height: "210px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f8f9fa",
                      padding: "16px",
                    }}
                  >
                    <CardImg
                      top
                      src={baseUrl + tl.image}
                      alt={tl.name}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </div>
                  <CardBody
                    className="home-butt d-flex flex-column justify-content-between p-3"
                    style={{
                      backgroundColor: "#00084c",
                      flexGrow: 1,
                    }}
                  >
                    <CardText
                      className="text-center text-white mb-3"
                      style={{
                        fontWeight: "600",
                        fontSize: "1rem",
                        minHeight: "2.8rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {tl.name}
                    </CardText>
                    <div
                      className="butt text-center w-100 m-0"
                      style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        fontSize: "0.9rem",
                        padding: "8px 14px",
                      }}
                      onClick={() => handleShow(tl)}
                    >
                      Check Pricing & Availability
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
      <AnimatePresence>
        {selectedTool && (
          <ToolDeats deats={selectedTool} handleHide={handleHide} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default HomeD;
