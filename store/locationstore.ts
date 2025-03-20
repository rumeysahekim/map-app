import { create } from "zustand";

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  color: string;
}

interface LocationStore {
  locations: Location[];
  addLocation: (location: Location) => void;
  updateLocation: (id: string, updateLocation: Partial<Location>) => void;
  deleteLocation: (id: string) => void;
}

export const useLocation = create<LocationStore>()((set) => ({
  locations: [],
  addLocation: (location) =>
    set((state) => ({ locations: [...state.locations, location] })),
  updateLocation: (id, updateLocation) =>
    set((state) => ({
      locations: state.locations.map((loc) =>
        loc.id === id ? { ...loc, ...updateLocation } : loc
      ),
    })),
  deleteLocation: (id) =>
    set((state) => ({
      locations: state.locations.filter((loc) => loc.id !== id),
    })),
}));
