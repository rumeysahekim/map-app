import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';
import Layout from './layout';


const containerStyle = {
  width: '100%',
  height: '100vh',
};

const defaultCenter = { lat: 41.0082, lng: 28.9784 }; // İstanbul'un koordinatları

interface Location {
  id: number;
  name: string;
  position: { lat: number; lng: number };
  color: string;
}

const RouteMap = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({ lat: 41.0082, lng: 28.9784 });
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    setLocations([
      { id: 1, name: 'Yer 1', position: { lat: 40.73061, lng: -73.935242 }, color: 'red' },
      { id: 2, name: 'Yer 2', position: { lat: 40.650002, lng: -73.949997 }, color: 'blue' },
    ]);
  }, []);

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

    if (locations.length < 2) return; // Yeterli konum yoksa yönlendirme hesaplama

    const directionsService = new google.maps.DirectionsService();
    const waypoints = locations.map(location => ({
      location: new google.maps.LatLng(location.position.lat, location.position.lng),
      stopover: true,
    }));

    directionsService.route(
      {
        origin: new google.maps.LatLng(locations[0].position.lat, locations[0].position.lng),
        destination: new google.maps.LatLng(locations[1].position.lat, locations[1].position.lng),
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
  }, [locations]);

  return (
    <Layout>
      <LoadScript googleMapsApiKey="AIzaSyCUW0vfIb4ZfVSjLl6qFfSTi-JFES1RdZk">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={13}
          onClick={handleMapClick}
        >
          {locations.map(location => (
            <Marker
              key={location.id}
              position={location.position}
              onClick={() => setSelectedLocation(location)}
            />
          ))}
          {selectedLocation && (
            <InfoWindow
              position={selectedLocation.position}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div>
                <h2>{selectedLocation.name}</h2>
                <p>{`Lat: ${selectedLocation.position.lat}, Lng: ${selectedLocation.position.lng}`}</p>
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
