import React, { useState, useEffect } from "react";
import {
  Navbar as BootstrapNavbar,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../images/logo.jpg";
import Burger from "./Burger";
import MediaQuery from "react-responsive";
import { Link as LinkScroll } from "react-scroll";

const Navbar = () => {
  const navigate = useNavigate(); // Replaces useHistory
  const location = useLocation();
  const [scrollTarget, setScrollTarget] = useState(null);

  // NEW FEATURE: State to track the number of active rentals
  const [clientRentalsCount, setClientRentalsCount] = useState(0);

  useEffect(() => {
    // Initialize count on mount
    const storedRentals =
      JSON.parse(localStorage.getItem("clientRentals")) || [];
    setClientRentalsCount(storedRentals.length);

    // Optional: Listen to storage events to update badge dynamically across tabs
    const handleStorageChange = () => {
      const updatedRentals =
        JSON.parse(localStorage.getItem("clientRentals")) || [];
      setClientRentalsCount(updatedRentals.length);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const pathSegments = location.pathname.split("/"); // Split by "/"
  const endpoint = pathSegments[pathSegments.length - 1]; // Get last segment

  const [currentEp, setCurrentEp] = useState(null);

  useEffect(() => {
    if (location.pathname === "/home" && scrollTarget) {
      setTimeout(() => {
        const element = document.getElementById(scrollTarget);
        if (element) {
          const offset = 100; // Set your desired offset here
          const elementPosition =
            element.getBoundingClientRect().top + window.scrollY; // Get element position
          const offsetPosition = elementPosition - offset; // Adjust for offset

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 600); // Delay for navigation to complete
    }
  }, [location, scrollTarget]); // Dependency on location and scrollTarget

  useEffect(() => {
    setCurrentEp(endpoint);
  }, [endpoint]);

  function handleClick(targetId) {
    if (location.pathname !== "/home") {
      setScrollTarget(targetId); // Set the target for scrolling
      navigate("/home"); // Redirect to /home
    } else {
      setScrollTarget(targetId); // Set target for the current page
    }
  }

  return (
    <Container
      className="nav-c"
      /* style={{ maxWidth: clientRentalsCount > 0 ? "65%" : "60%" }} */
    >
      <div>
        <BootstrapNavbar light expand="md">
          <NavbarBrand href="https://www.galaxyhomesolutions.ca/#/home">
            <img className="logo" src={logo} />
          </NavbarBrand>
          <MediaQuery maxWidth={1279}>
            <Burger scrollFunc={handleClick} />
          </MediaQuery>
          <MediaQuery minWidth={1280}>
            <Nav className="ml-auto">
              <NavItem
                className={`nav-ele ${currentEp === "contactus" ? "active_nav" : ""}`}
              >
                <Link
                  style={{
                    color: "black",
                    fontSize: "18px",
                    fontWeight: "500",
                    textDecoration: "none",
                  }}
                  to="/home/contactus"
                >
                  Contact Us
                </Link>
              </NavItem>
              <NavItem className="nav-ele">
                <LinkScroll
                  style={{
                    color: "black",
                    fontSize: "18px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                  to="freest"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  onClick={() => handleClick("freest")}
                >
                  Free Estimation
                </LinkScroll>
              </NavItem>
              <NavItem
                className={`nav-ele ${currentEp === "homed" ? "active_nav" : ""}`}
              >
                <Link
                  style={{
                    color: "black",
                    fontSize: "18px",
                    fontWeight: "500",
                    textDecoration: "none",
                  }}
                  to="/home/homed"
                >
                  Rent Tool
                </Link>
              </NavItem>
              <NavItem
                className={`nav-ele ${currentEp === "aboutus" ? "active_nav" : ""}`}
              >
                <Link
                  style={{
                    color: "black",
                    fontSize: "18px",
                    fontWeight: "500",
                    textDecoration: "none",
                  }}
                  to="/home/aboutus"
                >
                  About Us
                </Link>
              </NavItem>
              <NavItem className="nav-ele">
                <LinkScroll
                  style={{
                    color: "black",
                    fontSize: "18px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                  to="serve"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  onClick={() => handleClick("serve")}
                >
                  Services
                </LinkScroll>
              </NavItem>
              {clientRentalsCount > 0 && (
                <NavItem
                  className={`nav-ele ${currentEp === "clientdash" ? "active_nav" : ""}`}
                  style={{ position: "relative" }} // Required to anchor the absolute badge
                >
                  <Link
                    style={{
                      color: "black",
                      fontSize: "18px",
                      fontWeight: "500",
                      textDecoration: "none",
                      position: "relative", // Ensures the badge positions relative to the text
                      display: "inline-block",
                    }}
                    to="/home/clientdash"
                  >
                    Rented Tools
                    {/* NEW FEATURE: Red notification badge */}
                    <span
                      style={{
                        position: "absolute",
                        top: "-10px",
                        right: "-18px",
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "50%",
                        padding: "2px 6px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "20px",
                        height: "20px",
                      }}
                    >
                      {clientRentalsCount}
                    </span>
                  </Link>
                </NavItem>
              )}
            </Nav>
          </MediaQuery>
        </BootstrapNavbar>
      </div>
    </Container>
  );
};

export default Navbar;
