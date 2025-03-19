import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AddPage from "./add";

const Home = () => {
  const navigate = useNavigate(); 
  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <h1 style={{ fontSize: "2em", marginBottom: "20px" }}>
        Konum Yönetim Uygulaması
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button style={{ backgroundColor: "blue", color: "white", padding: "10px", fontSize: "1.2em" }} onClick={() => navigate("/add")}>
          📍 Konum Ekle
        </button>
        <button style={{ backgroundColor: "green", color: "white", padding: "10px", fontSize: "1.2em" }} onClick={() => navigate("/list")}>
          📋 Konumları Listele
        </button>
        <button style={{ backgroundColor: "orange", color: "white", padding: "10px", fontSize: "1.2em" }} onClick={() => navigate("/route")}>
          🗺 Rota Göster
        </button>
      </div>
    </div>
  );
};

const AddLocation = () => <h1>Konum Ekleme Sayfası</h1>;
const LocationList = () => <h1>Konum Listeleme Sayfası</h1>;
const RoutePage = () => <h1>Rota Gösterme Sayfası</h1>;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddPage />} />
      <Route path="/list" element={<LocationList />} />
      <Route path="/route" element={<RoutePage />} />
    </Routes>
  );
}
