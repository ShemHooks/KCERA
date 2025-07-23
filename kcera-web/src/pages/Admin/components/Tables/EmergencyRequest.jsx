import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import L from "leaflet";
import RequestDetails from "./RequestDetails";
import { GetDocTitle } from "./../../../../utils/hooks/useDocumentTitle";

const EmergencyRequests = ({ emergency }) => {
  const locationMarkLat = emergency.map((item) => item.latitude);
  const locationMarkLong = emergency.map((item) => item.longitude);

  const [isSatellite, setIsSatellite] = useState(false);
  const [selectedEmergeny, setSelectedEmergency] = useState(null);

  const satelliteURL =
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

  const streetsURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const pulseIcon = L.divIcon({
    className: "pulse-marker",
    iconSize: [20, 20],
  });

  return (
    <div
      style={{ height: "100vh", width: "100%", position: "relative" }}
      className="pt-6"
    >
      <GetDocTitle title="KCERA: Emergency Requests" />
      {!selectedEmergeny && (
        <MapContainer
          center={[9.9921, 122.8145]}
          zoom={13}
          maxZoom={17}
          minZoom={10}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
          doubleClickZoom={true}
          dragging={true}
        >
          <TileLayer
            url={isSatellite ? satelliteURL : streetsURL}
            attribution="&copy; OpenStreetMap contributors | &copy; Esri Imagery"
          />

          {emergency.map((item, index) => (
            <Marker
              key={index}
              position={[parseFloat(item.latitude), parseFloat(item.longitude)]}
              icon={pulseIcon}
              eventHandlers={{
                click: () => {
                  setSelectedEmergency(item);
                },
              }}
            />
          ))}
        </MapContainer>
      )}

      {!selectedEmergeny && (
        <button
          className="text-black cursor-pointer"
          onClick={() => setIsSatellite(!isSatellite)}
          style={{
            position: "absolute",
            top: 40,
            right: 20,
            zIndex: 1000,
            padding: "10px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          {isSatellite ? "Street View" : "Satellite View"}
        </button>
      )}

      {/* Conditionally render the RequestDetails component */}
      {selectedEmergeny && (
        <RequestDetails
          details={selectedEmergeny}
          onClose={() => setSelectedEmergency(null)}
        />
      )}
    </div>
  );
};

export default EmergencyRequests;
