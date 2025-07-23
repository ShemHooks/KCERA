import { useState, useEffect } from "react";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";
import { useMapEvent } from "react-leaflet";
import { useNavigate } from "react-router-dom";

const dashboard = () => {
  const navigate = useNavigate();

  const streetsURL =
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"; // "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const [currenLatitude, setCurrentLatitude] = useState(null);
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [mapCenter, setMapCenter] = useState([9.9921, 122.8145]);
  const [pinnedLocation, setPinnedLocation] = useState(null);
  const [emergencyType, setEmergencyType] = useState("");

  // const pinnedLatitude = pinnedLocation?.[0];
  // const pinnedLongitude = pinnedLocation?.[1];

  useEffect(() => {
    const success = (position) => {
      setCurrentLatitude(position.coords.latitude);
      setCurrentLongitude(position.coords.longitude);
    };

    const error = (err) => {
      console.error(err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  }, []);

  useEffect(() => {
    if (currenLatitude && currentLongitude) {
      setMapCenter([currenLatitude, currentLongitude]);
    }
  }, [currenLatitude, currentLongitude]);

  const personIcon = L.icon({
    iconUrl: "/images/personMarker.png",
    iconSize: [42, 42],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const RecenterMap = ({ lat, lng }) => {
    const map = useMap();

    useEffect(() => {
      if (typeof lat === "number" && typeof lng === "number") {
        const delta = 0.0003;
        const bounds = L.latLngBounds(
          [lat - delta, lng - delta],
          [lat + delta, lng + delta]
        );
        map.fitBounds(bounds);

        // map.setView([lat, lng], 19);
      }
    }, [lat, lng, map]);
    return null;
  };

  const LocationMarker = ({ onSetPosition }) => {
    useMapEvent({
      click(e) {
        const { lat, lng } = e.latlng;
        onSetPosition([lat, lng]);
      },
    });
    return null;
  };

  const useUserLocation = () => {
    setPinnedLocation([currenLatitude, currentLongitude]);
  };

  const submitFunction = () => {
    localStorage.setItem("emergencyTYpe", emergencyType);
    localStorage.setItem("emergency Location", pinnedLocation);
    navigate("/resident/camera");
  };

  console.log(pinnedLocation);

  return (
    <div className="h-screen flex items-center justify-center ">
      <div
        id="emergencyReporting"
        className="bg-stone-100 w-[90%] h-[90%] pt-8 pl-4 pb-10 shadow-2xl shadow-black rounded-2xl overflow-auto"
      >
        <div className="flex justify-center">
          <img
            src="/images/KCERA.png"
            alt=""
            className="w-[100px] lg:w-[200px]"
          />
        </div>
        <div className="pt-4">
          <h1 className="text-center font-bold lg:text-3xl">
            EMERGENCY REPORTING
          </h1>
        </div>
        <div className=" hidden  lg:flex mt-10 gap-10  h-[200px] items-center [perspective:1000px]">
          <h2>Type of Emergency: </h2>
          <button
            onClick={() => {
              setEmergencyType("Road Traffic Incident");
            }}
            className="w-[100px] h-[100px] cursor-pointer border rounded transition-transform duration-300 transform [transform-style:preserve-3d] hover:[transform:translateZ(30px)]"
          >
            <img
              src="/images/traffic.jfif"
              alt=""
              className="rounded w-full h-full"
            />
            <span className="block text-xs text-center mt-1">
              Road/Traffic Incidents
            </span>
          </button>

          <button
            onClick={() => {
              setEmergencyType("fire");
            }}
            className="w-[100px] h-[100px] cursor-pointer border rounded transition-transform duration-300 transform [transform-style:preserve-3d] hover:[transform:translateZ(30px)]"
          >
            <img
              src="/images/fire.png"
              alt=""
              className="rounded w-full h-full"
            />
            <span className="block text-xs text-center mt-1">Fire</span>
          </button>

          <button
            onClick={() => {
              setEmergencyType("Medical");
            }}
            className="w-[100px] h-[100px] cursor-pointer border rounded transition-transform duration-300 transform [transform-style:preserve-3d] hover:[transform:translateZ(30px)]"
          >
            <img
              src="/images/medical.jfif"
              alt=""
              className="rounded w-full h-full"
            />
            <span className="block text-xs text-center mt-1">
              Medical Emergency
            </span>
          </button>
        </div>

        {/* mobile */}
        <div className=" flex mt-10 h-[500px] items-center mb-8 lg:hidden">
          <h2 className="text-center">Type of Emergency: </h2>
          <div className="flex-col items-cente">
            <button
              onClick={() => {
                setEmergencyType("Road Traffic Incident");
              }}
              className="w-[100px] h-[100px] cursor-pointer border rounded"
            >
              <img
                src="/images/traffic.jfif"
                alt=""
                className="rounded w-full h-full"
              />
              Road/Traffic Incidents
            </button>
            <br />
            <button
              onClick={() => {
                setEmergencyType("Fire");
              }}
              className="w-[100px] h-[100px] cursor-pointer border rounded"
            >
              <img
                src="/images/fire.png"
                alt=""
                className="rounded w-full h-full"
              />
              Fire
            </button>

            <button
              onClick={() => {
                setEmergencyType("Medical");
              }}
              className="w-[100px] h-[100px] cursor-pointer border rounded"
            >
              <img
                src="/images/medical.jfif"
                alt=""
                className="rounded w-full h-full"
              />
              Medical Emergency
            </button>
          </div>
        </div>
        {/* end of mobile */}

        <div className="mt-4 pt-2 flex flex-col gap-2 items-center">
          <div className=" w-[90%] flex justify-end pr-4 transform translate-y-100 z-3000 ">
            <button
              className="w-[80px] bg-stone-200 border rounded-md"
              onClick={useUserLocation}
            >
              Use my Location
            </button>
          </div>
          <div className=" w-[90%]">
            <h1>Please pin the location of an emergency</h1>
          </div>

          <div className="border h-[400px] w-[90%]">
            <MapContainer
              center={mapCenter}
              zoom={18}
              maxZoom={18}
              minZoom={10}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }}
              doubleClickZoom={true}
              dragging={true}
              className="w-full h-full"
            >
              {currenLatitude && currentLongitude && (
                <>
                  <RecenterMap lat={currenLatitude} lng={currentLongitude} />
                  <Marker
                    position={[currenLatitude, currentLongitude]}
                    icon={personIcon}
                  >
                    {/* <Popup>You are here</Popup> */}
                  </Marker>
                </>
              )}
              <TileLayer
                url={streetsURL}
                attribution="&copy; OpenStreetMap contributors | &copy; Esri Imagery"
              />

              <LocationMarker onSetPosition={setPinnedLocation} />

              {pinnedLocation && (
                <Marker position={pinnedLocation}>
                  <Popup>Pinned Location</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </div>
        <div className="flex justify-end w-[95%] mt-6">
          <button
            className=" bg-stone-200 shadow-xl w-[100px] h-[60px] cursor-pointer rounded font-bold"
            onClick={submitFunction}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
