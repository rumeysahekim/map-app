import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate(); 
  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <h1 style={{ fontSize: "2xl", marginBottom: "6px" }}>
        Konum Yönetim Uygulaması
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <button style={{ backgroundColor: "blue", color: "white", padding: "10px", fontSize: "lg" }} onClick={() => navigate("/add")}>
          📍 Konum Ekle
        </button>
        <button style={{ backgroundColor: "green", color: "white", padding: "10px", fontSize: "lg" }} onClick={() => navigate("/list")}>
          📋 Konumları Listele
        </button>
        <button style={{ backgroundColor: "orange", color: "white", padding: "10px", fontSize: "lg" }} onClick={() => navigate("/route")}>
          🗺 Rota Göster
        </button>
      </div>
    </div>
  );
};

// Diğer sayfalar
const AddLocation = () => <h1>Konum Ekleme Sayfası</h1>;
const LocationList = () => <h1>Konum Listeleme Sayfası</h1>;
const RoutePage = () => <h1>Rota Gösterme Sayfası</h1>;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddLocation />} />
      <Route path="/list" element={<LocationList />} />
      <Route path="/route" element={<RoutePage />} />
    </Routes>
  );
}
