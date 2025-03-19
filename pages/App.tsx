import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AddPage from "./add";
import ListPage from "./list";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <h1 style={{ fontSize: "2em", marginBottom: "20px" }}>
        Konum Yönetim Uygulaması
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button
          style={{ backgroundColor: "blue", color: "white", padding: "10px", fontSize: "1.2em" }}
          onClick={() => navigate("/add")}
        >
          📍 Konum Ekle
        </button>
        <button
          style={{ backgroundColor: "green", color: "white", padding: "10px", fontSize: "1.2em" }}
          onClick={() => navigate("/list")}
        >
          📋 Konumları Listele
        </button>
        <button
          style={{ backgroundColor: "orange", color: "white", padding: "10px", fontSize: "1.2em" }}
          onClick={() => navigate("/route")}
        >
          🗺 Rota Göster
        </button>
      </div>
    </div>
  );
};

const RoutePage = () => <h1>Rota Gösterme Sayfası (Henüz Yapılmadı)</h1>;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddPage />} />
      <Route path="/list" element={<ListPage />} />
      <Route path="/route" element={<RoutePage />} />
    </Routes>
  );
}
