import React, { useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 37.738752, 
  lng: 29.092045,
};

const AddPage = () => {
  const [locationName, setLocationName] = useState("");
  const [latitude, setLatitude] = useState(defaultCenter.lat);
  const [longitude, setLongitude] = useState(defaultCenter.lng);
  const [markerColor, setMarkerColor] = useState("#FF0000");

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setLatitude(event.latLng.lat());
      setLongitude(event.latLng.lng());
    }
  };

  const getColoredMarker = (color: string): google.maps.Symbol => ({
    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z",
    fillColor: color,
    fillOpacity: 1,
    strokeWeight: 1,
    strokeColor: "#ffffff",
    scale: 2,
  });

  const handleSave = () => {
    console.log({ locationName, latitude, longitude, markerColor });
    alert("Konum Kaydedildi!");
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBRlSuaHfDUbiuWJOUQrEMxcBMiuTfc32U"
      libraries={["places"]}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: latitude, lng: longitude }}
        zoom={12}
        onClick={handleMapClick}
      >
        <Marker
          position={{ lat: latitude, lng: longitude }}
          icon={getColoredMarker(markerColor)}
        />
      </GoogleMap>

      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Konum Adı"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          style={{ marginRight: "8px", padding: "5px" }}
        />
        <input
          type="color"
          value={markerColor}
          onChange={(e) => setMarkerColor(e.target.value)}
          style={{ padding: "2px", width: "40px", height: "40px", border: "none" }}
        />
        <button
          style={{ marginLeft: "10px", padding: "8px 15px", cursor: "pointer" }}
          onClick={handleSave}
        >
          Kaydet
        </button>
      </div>
    </LoadScript>
  );
};

export default AddPage;
