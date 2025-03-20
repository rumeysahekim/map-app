import { useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { useLocation } from "../store/locationstore";
import { v4 as uuidv4 } from "uuid";
import Layout from './layout';

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = { lat: 41.0082, lng: 28.9784 };

const AddPage = () => {
  const addLocation = useLocation((state) => state.addLocation);

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

  const handleSave = () => {
    addLocation({
      id: uuidv4(),
      name: locationName,
      lat: latitude,
      lng: longitude,
      color: markerColor,
    });
    alert("Konum Kaydedildi!");
    setLocationName("");
  };

  return (
    <Layout>
      <LoadScript googleMapsApiKey="AIzaSyBRlSuaHfDUbiuWJOUQrEMxcBMiuTfc32U">
        <div style={{ marginBottom: "10px" }}>
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
            style={{ width: "40px", height: "40px", border: "none" }}
          />
          <button style={{ marginTop: "10px" }} onClick={handleSave}>
          Kaydet
          </button>
        </div>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: latitude, lng: longitude }}
          zoom={12}
          onClick={handleMapClick}
        >
          <Marker position={{ lat: latitude, lng: longitude }} />
        </GoogleMap>
      </LoadScript>
    </Layout>
  );
};

export default AddPage;
