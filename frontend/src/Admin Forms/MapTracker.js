import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapTracker = ({ toolLocation }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // 1. Initialize Map exactly once
  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [-75.6972, 45.4215], // Default: Ottawa
      zoom: 13,
    });

    markerRef.current = new maplibregl.Marker({ color: "#ff0000" });
  }, []);

  // 2. Update Marker and FlyTo when socket location changes
  useEffect(() => {
    if (toolLocation && mapRef.current && markerRef.current) {
      const { longitude, latitude } = toolLocation;

      markerRef.current.setLngLat([longitude, latitude]).addTo(mapRef.current);

      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 15,
        essential: true, // This animation is considered essential with respect to prefers-reduced-motion
      });
    }
  }, [toolLocation]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
      {!toolLocation && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(255,255,255,0.9)",
            padding: "10px 20px",
            borderRadius: "5px",
            fontWeight: "bold",
            zIndex: 1,
          }}
        >
          Waiting for Admin to emit location...
        </div>
      )}
    </div>
  );
};

export default MapTracker;
