import React, { useEffect } from "react";
import Example from "./Navbar";
import HeroSec from "./HeroSec";
import Service from "./Services";
import Moto from "./Moto";
import Testi from "./Testimonial";
import HomeD from "./HomeDepot";
import About from "./AboutUs";
import AppointmentForm from "./Appointment";
import Estimation from "./Estimation";
import CatDeat from "./CatDeats";
import SubCat from "./CategoryWSub";
import ClientDashboard from "./ClientDashboard";
import Admin from "./Admin";
import Footer from "./Footer";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { connect } from "react-redux";
import {
  fetcServices,
  fetcTools,
  fetchReservations,
  fetchContacts,
  loginUser,
  logoutUser,
} from "../redux/ActionCreator";

import { FaPhone } from "react-icons/fa";

const mapStateToProps = (state) => ({
  services: state.services,
  tools: state.tools,
  reservations: state.reservations,
  contacts: state.contacts,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  fetchServices: () => dispatch(fetcServices()),
  fetcTools: () => dispatch(fetcTools()),
  fetchReservations: () => dispatch(fetchReservations()),
  fetchContacts: () => dispatch(fetchContacts()),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
});

const Home = ({ services }) => (
  <motion.div
    style={{ backgroundColor: "#ffffff" }}
    transition={{ duration: 0.5, type: "tween", ease: "easeIn" }}
    initial={{ x: 1000, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -1000, opacity: 0 }}
  >
    <HeroSec />
    <Service services={services} />
    <Estimation />
    <Moto />
    <Testi />
  </motion.div>
);

const Categories = () => {
  return <CatDeat />;
};

const CategoriesWsub = () => {
  return <SubCat />;
};

const Main = (props) => {
  const location = useLocation();

  useEffect(() => {
    props.fetchServices();
    props.fetcTools();
    props.fetchReservations();
    props.fetchContacts();
  }, []);

  if (props.services && props.tools) {
    return (
      <div>
        <Example />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.key}>
            <Route path="/home" element={<Home services={props.services} />} />
            <Route path="/home/homed" element={<HomeD tools={props.tools} />} />
            <Route path="/home/cat" element={<Categories />} />
            <Route path="/home/subcat" element={<CategoriesWsub />} />
            <Route path="/home/aboutus" element={<About />} />
            <Route path="/home/contactus" element={<AppointmentForm />} />
            <Route path="/home/clientdash" element={<ClientDashboard />} />
            <Route
              path="/home/admin"
              element={
                <Admin
                  auth={props.auth}
                  services={props.services}
                  tools={props.tools}
                  reservations={props.reservations}
                  contacts={props.contacts}
                  loginUser={props.loginUser}
                  logoutUser={props.logoutUser}
                />
              }
            />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </AnimatePresence>
        <Footer />
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            zIndex: 1000,
            backgroundColor: "#f6f6f6",
            padding: "12px",
            borderRadius: "50%",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <a
            href="tel:6476062540"
            style={{ color: "#00084c", textDecoration: "none" }}
          >
            <div className="d-flex align-items-center">
              <FaPhone size={20} />
            </div>
          </a>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{ minHeight: "100vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <h1>Please Wait While The Component Loads...</h1>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
