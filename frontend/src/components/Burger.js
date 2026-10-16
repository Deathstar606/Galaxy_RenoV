import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaFacebook, FaPhone, FaInstagram } from "react-icons/fa";
import "./Burger.css";

const BurgerMenu = ({ scrollFunc }) => {
  const location = useLocation();
  const [rentals, setRentals] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const storedRentals =
      JSON.parse(localStorage.getItem("clientRentals")) || [];

    if (storedRentals.length === 0) {
      setRentals([]);
    } else {
      setRentals(storedRentals);
    }
    setActiveLink(location.pathname);
  }, [location]);

  const handleNavLinkClick = (to) => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });

    setTimeout(() => {
      setActiveLink(to);
    }, 500);
  };

  return (
    <div>
      <div className="burger-menu">
        <div
          className="burger-icon"
          style={{ position: "fixed", right: 20, top: 40, zIndex: 1001 }}
          onClick={toggleMenu}
        >
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        </div>
      </div>

      <div className={`menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <div className="d-flex justify-content-center p-1">
            <li>
              <NavLink
                to="/home/contactus"
                activeClassName="active"
                onClick={() => {
                  handleNavLinkClick("/home/contactus");
                  toggleMenu();
                }} // Update active link on click
              >
                <div
                  className={`burg-menu pr-2 pl-2 ${activeLink === "/home/contactus" ? "active" : ""}`}
                >
                  Contact Us
                </div>
              </NavLink>
            </li>
          </div>
          <div className="d-flex justify-content-center">
            <li>
              <div
                onClick={() => {
                  scrollFunc("freest");
                  toggleMenu();
                }}
              >
                <div className="burg-menu pr-2 pl-2">Free Estimation</div>
              </div>
            </li>
          </div>
          <div className="d-flex justify-content-center">
            <li>
              <NavLink
                to="/home/homed"
                activeClassName="active"
                onClick={() => {
                  handleNavLinkClick("/home/homed");
                  toggleMenu();
                }} // Update active link on click
              >
                <div
                  className={`burg-menu pr-2 pl-2 ${activeLink === "/home/homed" ? "active" : ""}`}
                >
                  Rent Tool
                </div>
              </NavLink>
            </li>
          </div>
          <div className="d-flex justify-content-center">
            <li>
              <NavLink
                to="/home/aboutus"
                activeClassName="active"
                onClick={() => {
                  handleNavLinkClick("/home/aboutus");
                  toggleMenu();
                }} // Update active link on click
              >
                <div
                  className={`burg-menu pr-2 pl-2 ${activeLink === "/home/aboutus" ? "active" : ""}`}
                >
                  About us
                </div>
              </NavLink>
            </li>
          </div>
          <div className="d-flex justify-content-center">
            <li>
              <div
                onClick={() => {
                  scrollFunc("serve");
                  toggleMenu();
                }}
              >
                <div className="burg-menu pr-2 pl-2">Services</div>
              </div>
            </li>
          </div>
          {rentals.length > 0 && (
            <div className="d-flex justify-content-center">
              <li>
                <NavLink
                  to="/home/clientdash"
                  style={{ position: "relative", display: "inline-block" }}
                  onClick={() => {
                    handleNavLinkClick("/home/clientdash");
                    toggleMenu();
                  }}
                >
                  <div
                    className={`burg-menu pr-2 pl-2 ${activeLink === "/home/clientdash" ? "active" : ""}`}
                  >
                    Rented Tools
                  </div>
                  <span
                    style={{
                      position: "absolute",
                      top: "-5px", // Adjusted slightly for better centering over the text
                      right: "-15px",
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
                      zIndex: 10,
                    }}
                  >
                    {rentals.length}
                  </span>
                </NavLink>
              </li>
            </div>
          )}
          <li className="d-flex justify-content-center pt-4">
            <div>
              <a
                href="https://www.facebook.com/profile.php?id=61574817508133"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#00084c" }}
              >
                <FaFacebook className="mr-3" size={30} />
              </a>
              <a
                href="https://www.instagram.com/mynabackdrops"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#00084c" }}
              >
                <FaInstagram size={30} />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BurgerMenu;
