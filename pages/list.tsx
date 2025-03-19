import { useEffect } from "react";
import { useLocation } from "../store/locationstore";

// Define the types for your location
interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  color: string;
}

const ListPage = () => {
  const { locations, deleteLocation } = useLocation();

  useEffect(() => {
    // Example of a side effect that should not cause an infinite loop
    console.log("Locations updated:", locations);
  }, [locations]); // Only run when locations change

  return (
    <div style={{ padding: "20px" }}>
      <h2>Kaydedilen Konumlar</h2>
      {locations.length === 0 ? (
        <p>Henüz bir konum kaydetmediniz.</p>
      ) : (
        <ul>
          {locations.map((location: Location) => (
            <li key={location.id} style={{ marginBottom: "10px" }}>
              <strong>{location.name}</strong>
              <br />
              Koordinatlar: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              <br />
              Renk:{" "}
              <span
                style={{
                  display: "inline-block",
                  width: "18px",
                  height: "18px",
                  backgroundColor: location.color,
                  borderRadius: "50%",
                  border: "1px solid #000",
                  verticalAlign: "middle",
                }}
              />
              <br />
              <button
                style={{ marginTop: "5px" }}
                onClick={() => deleteLocation(location.id)}
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListPage;
