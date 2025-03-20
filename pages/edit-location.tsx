import React, { useEffect, useState } from "react";
import { useLocation } from "../store/locationstore";
import { useParams, useNavigate } from "react-router-dom";

const EditLocationPage = () => {
  const { id } = useParams<{ id: string }>(); // URL'den konum ID'sini al
  const { locations, updateLocation } = useLocation();
  const navigate = useNavigate();

  const [locationData, setLocationData] = useState<{ name: string; lat: number; lng: number; color: string } | null>(null);

  useEffect(() => {
    console.log("ID:", id); 
    console.log("Locations:", locations); 
    const location = locations.find((loc) => loc.id === id);
    if (location) {
      setLocationData(location);
    } else {
      console.error("Konum bulunamadı."); // Hata mesajı
    }
  }, [id, locations]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (locationData) {
      setLocationData({ ...locationData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locationData) {
      if (id) {
        updateLocation(id, locationData);
        navigate("/");
      } else {
        console.error("Geçersiz konum ID'si."); // Hata mesajı
      }
    }
  };

  if (!locationData) {
    return <p>Yükleniyor...</p>; // Konum bilgileri yüklenirken gösterilecek mesaj
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Konum Düzenle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            İsim:
            <input type="text" name="name" value={locationData.name} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Enlem:
            <input type="number" name="lat" value={locationData.lat} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Boylam:
            <input type="number" name="lng" value={locationData.lng} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Renk:
            <input type="text" name="color" value={locationData.color} onChange={handleChange} />
          </label>
        </div>
        <button type="submit">Güncelle</button>
      </form>
    </div>
  );
};

export default EditLocationPage; 