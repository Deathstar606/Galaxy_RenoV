import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Container,
} from "reactstrap";
import { motion } from "framer-motion";
import { MdOutlineCancel } from "react-icons/md";
import { StaggeredText } from "./TextAnimate";

const Estimation = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  // Service options with prices
  const services = [
    { id: 1, label: "Service A", price: 50 },
    { id: 2, label: "Service B", price: 30 },
    {
      id: 3,
      label: "Service C",
      subcategories: [
        { id: 4, label: "Sub C1", price: 20 },
        { id: 5, label: "Sub C2", price: 25 },
      ],
    },
  ];

  // Handle selecting a service
  const handleSelectService = (service) => {
    if (!selectedServices.find((s) => s.id === service.id)) {
      setSelectedServices([...selectedServices, service]);
    }
  };

  // Handle removing a selected service
  const handleRemoveService = (id) => {
    setSelectedServices(
      selectedServices.filter((service) => service.id !== id),
    );
  };

  // Calculate subtotal
  const subtotal = selectedServices.reduce(
    (sum, service) => sum + service.price,
    0,
  );

  return (
    <motion.div
      className="pb-5"
      transition={{ duration: 0.5, type: "tween", ease: "easeIn" }}
      initial={{ x: 1000, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -1000, opacity: 0 }}
    >
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="pl-3 pr-3 est-container" id="freest">
          <h1 className="text-center p-4">
            <StaggeredText text={"Get An Estimation"} />
          </h1>
          <Row
            style={{
              border: "1px solid grey",
              borderRadius: "15px",
              padding: "20px",
            }}
          >
            <Col md={6} className="d-flex justify-content-center">
              <div>
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle caret className="butt">
                    Select Service
                  </DropdownToggle>
                  <DropdownMenu>
                    {services.map((service) =>
                      service.subcategories ? (
                        <React.Fragment key={service.id}>
                          <DropdownItem header>{service.label}</DropdownItem>
                          {service.subcategories.map((sub) => (
                            <DropdownItem
                              key={sub.id}
                              onClick={() => handleSelectService(sub)}
                            >
                              {sub.label} - ${sub.price}
                            </DropdownItem>
                          ))}
                        </React.Fragment>
                      ) : (
                        <DropdownItem
                          key={service.id}
                          onClick={() => handleSelectService(service)}
                        >
                          {service.label} - ${service.price}
                        </DropdownItem>
                      ),
                    )}
                  </DropdownMenu>
                </Dropdown>
                <div className="mt-3">
                  <h5>Selected Services:</h5>
                  {selectedServices.length > 0 ? (
                    selectedServices.map((service) => (
                      <div
                        key={service.id}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <span className="mt-1">
                          {service.label} - ${service.price}
                        </span>
                        <span
                          className="ml-2"
                          onClick={() => handleRemoveService(service.id)}
                        >
                          <MdOutlineCancel color="#00084c" size={20} />
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center pt-1">No services selected</p>
                  )}
                </div>
              </div>
            </Col>
            <Col
              md={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h5 className="mt-3">Subtotal: ${subtotal}</h5>
            </Col>
          </Row>
        </div>
      </Container>
    </motion.div>
  );
};

export default Estimation;
