import React, { useEffect } from "react";
import { useLocation } from "../store/locationstore";
import { useNavigate } from "react-router-dom";
import Layout from './layout';

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  color: string;
}

const ListPage = () => {
  const { locations, deleteLocation } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Locations updated:", locations);
  }, [locations]);

  const handleEdit = (id: string) => {
    navigate(`/edit-location/${id}`);
  };

  return (
    <Layout>
      <div style={{ padding: "20px", backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#333' }}>Kaydedilen Konumlar</h2>
        {locations.length === 0 ? (
          <p>Henüz bir konum kaydetmediniz.</p>
        ) : (
          <ul>
            {locations.map((location: Location) => (
              <li key={location.id} style={{ marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                <div>
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
                </div>
                <div>
                  <button
                    style={{ marginTop: "5px", marginRight: "10px", backgroundColor: '#f44336', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => deleteLocation(location.id)}
                  >
                    Sil
                  </button>
                  <button
                    style={{ marginTop: "5px", backgroundColor: '#2196F3', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => handleEdit(location.id)}
                  >
                    ➔
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default ListPage;
