import React, { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useLocation } from "../store/locationstore";

const AddPage = () => {
    const [locationName, setLocationName] = useState("");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [markerColor, setMarkerColor] = useState("#FF0000");

    const handleMapClick = (event: any) => {
        setLatitude(event.latLng.lat());
        setLongitude(event.latLng.lng());
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Konum Adı" 
                value={locationName} 
                onChange={(e) => setLocationName(e.target.value)} 
            />
            <input 
                type="color" 
                value={markerColor} 
                onChange={(e) => setMarkerColor(e.target.value)} 
            />
            <GoogleMap
                onClick={handleMapClick}
                center={{ lat: latitude, lng: longitude }}
                zoom={10}
            >
                <Marker position={{ lat: latitude, lng: longitude }} />
            </GoogleMap>
            <button onClick={() => console.log({ locationName, latitude, longitude, markerColor })}>
                Kaydet
            </button>
        </div>
    );
};

export default AddPage;