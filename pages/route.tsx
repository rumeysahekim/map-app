import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';
import Layout from './layout';
import { useLocation } from "../store/locationstore";

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const defaultCenter = { lat: 41.0082, lng: 28.9784 }; // İstanbul'un koordinatları

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  color: string; // Renk bilgisi
}

const RouteMap = () => {
  const { locations } = useLocation();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({ lat: 41.0082, lng: 28.9784 });
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setUserLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  const calculateRoute = () => {
    if (typeof google === 'undefined') {
      console.error("Google Maps API henüz yüklenmedi.");
      return;
    }

    if (locations.length < 1) return; // En az bir konum olmalı

    const directionsService = new google.maps.DirectionsService();
    const waypoints = locations.map(location => ({
      location: new google.maps.LatLng(location.lat, location.lng),
      stopover: true,
    }));

    directionsService.route(
      {
        origin: new google.maps.LatLng(userLocation.lat, userLocation.lng), // Kullanıcının mevcut konumu
        destination: new google.maps.LatLng(locations[0].lat, locations[0].lng), // İlk konum
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`Yönlendirme alma hatası: ${status} - ${result}`);
        }
      }
    );
  };

  useEffect(() => {
    if (locations.length > 0) {
      calculateRoute();
    }
  }, [locations, userLocation]); // Kullanıcı konumu değiştiğinde rota hesapla

  return (
    <Layout>
      <LoadScript googleMapsApiKey="AIzaSyBRlSuaHfDUbiuWJOUQrEMxcBMiuTfc32U">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={13}
          onClick={handleMapClick}
        >
          {locations.map(location => (
            <Marker
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => setSelectedLocation(location)}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: location.color, // Kullanıcının seçtiği renk
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: '#FFFFFF',
              }}
            />
          ))}
          {selectedLocation && (
            <InfoWindow
              position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div>
                <h2>{selectedLocation.name}</h2>
                <p>{`Lat: ${selectedLocation.lat}, Lng: ${selectedLocation.lng}`}</p>
              </div>
            </InfoWindow>
          )}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
    </Layout>
  );
};

export default RouteMap;
