import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import { motion, AnimatePresence } from "framer-motion";
import MapTracker from "../Admin Forms/MapTracker";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { io } from "socket.io-client";
import { baseUrl } from "../shared/baseurl";

import axios from "axios";

const socket = io(baseUrl.replace(/\/$/, ""));

const ClientDashboard = () => {
  const [rentals, setRentals] = useState([]);
  const [activeTrackingId, setActiveTrackingId] = useState(null);
  const [toolLocation, setToolLocation] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: -75.6972,
    latitude: 45.4215,
    zoom: 14,
  });

  useEffect(() => {
    const fetchAndSyncRentals = async () => {
      // Fetch rentals directly from localStorage
      const storedRentals =
        JSON.parse(localStorage.getItem("clientRentals")) || [];

      if (storedRentals.length === 0) {
        setRentals([]);
        return;
      }

      try {
        // NEW FEATURE: Concurrently fetch up-to-date trackingStatus for all local rentals
        const updatedRentals = await Promise.all(
          storedRentals.map(async (rent) => {
            try {
              const response = await axios.get(
                `${baseUrl}rents/${rent._id}/trackstat`,
              );
              // Return a new object merging the local data with the fresh trackingStatus
              return { ...rent, trackingStatus: response.data.trackingStatus };
            } catch (err) {
              console.error(
                `Failed to fetch status for rent ID: ${rent._id}`,
                err,
              );
              // Fallback to the existing local data if the request fails
              return rent;
            }
          }),
        );

        // Update the component state with the fresh data
        setRentals(updatedRentals);

        // Optional but recommended: Sync fresh statuses back to localStorage
        localStorage.setItem("clientRentals", JSON.stringify(updatedRentals));
      } catch (error) {
        console.error("Critical error while updating rental statuses:", error);
        // Absolute fallback: just render what we have in local storage
        setRentals(storedRentals);
      }
    };

    fetchAndSyncRentals();
  }, []);

  useEffect(() => {
    if (!activeTrackingId) return;

    // NEW FEATURE: Socket listener for live client-side tracking
    socket.emit("joinTrackingRoom", activeTrackingId);

    socket.on("locationUpdated", (data) => {
      const { latitude, longitude } = data;
      setToolLocation({ latitude, longitude });
      setViewState((prev) => ({
        ...prev,
        longitude,
        latitude,
      }));
    });

    return () => {
      socket.off("locationUpdated");
    };
  }, [activeTrackingId]);

  const handleOpenTracker = (id) => {
    setActiveTrackingId(id);
  };

  const handleCloseTracker = () => {
    setActiveTrackingId(null);
    setToolLocation(null);
  };

  return (
    <Container className="mt-5" style={{ minHeight: "40vh" }}>
      <h2 className="mb-5 text-center">My Rented Tools</h2>
      <Row>
        {rentals.map((rent, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="shadow-sm">
              <CardBody>
                <CardTitle tag="h5" className="pb-2">
                  Order ID: {rent._id.substring(0, 8)}...
                </CardTitle>
                <CardText>
                  <strong>Rental Status:</strong> {rent.trackingStatus}
                </CardText>
                <CardText>
                  <strong>Duration:</strong> {rent.duration}
                </CardText>
                <CardText>
                  <strong>Pickup Method:</strong> {rent.pickupMethod}
                </CardText>

                <div
                  className="butt text-center"
                  onClick={() => handleOpenTracker(rent._id)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.filter = "brightness(110%)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.filter = "brightness(100%)")
                  }
                >
                  Track Tool <FaMapMarkerAlt style={{ marginLeft: "5px" }} />
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      <AnimatePresence>
        {activeTrackingId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.8)",
              zIndex: 9999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              style={{
                width: "90%",
                maxWidth: "800px",
                height: "60vh",
                backgroundColor: "#fff",
                borderRadius: "10px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <button
                onClick={handleCloseTracker}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  zIndex: 10,
                  cursor: "pointer",
                  border: "none",
                  padding: "8px 12px",
                  background: "red",
                  color: "white",
                  borderRadius: "5px",
                  transition: "filter 0.2s",
                  filter: "brightness(100%)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.filter = "brightness(110%)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.filter = "brightness(100%)")
                }
              >
                Close Tracking
              </button>

              <MapTracker toolLocation={toolLocation} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default ClientDashboard;
