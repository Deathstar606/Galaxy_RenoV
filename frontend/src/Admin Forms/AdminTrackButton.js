import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../shared/baseurl";
import { io } from "socket.io-client";

// NEW FEATURE: Socket connection for Admin location emission
const socket = io(baseUrl.replace(/\/$/, ""));

const AdminTrackButton = ({ rentId, initialStatus, updateTrackingStatus }) => {
  const [isTracking, setIsTracking] = useState(initialStatus === "in_progress");
  const watchIdRef = useRef(null);

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const handleStartTracking = async () => {
    try {
      // Assuming updateTrackingStatus makes the API call to your backend
      await updateTrackingStatus(rentId, "in_progress");
      setIsTracking(true);

      if ("geolocation" in navigator) {
        watchIdRef.current = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("updateLocation", {
              rentId: rentId,
              latitude: latitude,
              longitude: longitude,
            });
          },
          (error) => console.error("Error fetching location: ", error),
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    } catch (err) {
      console.error("Failed to start tracking:", err);
    }
  };

  const handleStopTracking = async () => {
    try {
      await updateTrackingStatus(rentId, "completed");
      setIsTracking(false);

      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    } catch (err) {
      console.error("Failed to stop tracking:", err);
    }
  };

  return (
    <>
      <button
        disabled={initialStatus !== "pending" && !isTracking}
        onClick={handleStartTracking}
        style={{
          transition: "filter 0.2s",
          filter: "brightness(100%)",
          display: isTracking ? "none" : "inline-block",
          marginRight: "10px",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.filter = "brightness(110%)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.filter = "brightness(100%)")
        }
        className="btn btn-primary btn-sm"
      >
        Start Tracking
      </button>

      <button
        disabled={initialStatus === "completed"}
        onClick={handleStopTracking}
        style={{
          transition: "filter 0.2s",
          filter: "brightness(100%)",
          display: isTracking ? "inline-block" : "none",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.filter = "brightness(110%)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.filter = "brightness(100%)")
        }
        className="btn btn-danger btn-sm"
      >
        Completed / Stop
      </button>
    </>
  );
};

export default AdminTrackButton;
