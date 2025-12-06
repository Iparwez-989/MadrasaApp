import { create } from "zustand";
import axios from "axios";

const useLocationStore = create((set) => ({
  city: "",
  country: "",
  coords: null,
  loading: false,
  error: null,

  fetchLocation: () => {
    set({ loading: true, error: null });

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const API_KEY = "15b6031a5cb84198826e0c78a051f2f3";

          const response = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${API_KEY}`
          );

          const location = response.data.features[0].properties;

          set({
            city:
              location.city ||
              location.town ||
              location.village ||
              "",
            country: location.country || "",
            coords: { lat, lon },
            loading: false,
          });

        } catch (err) {
          // No loading:false here
          console.error("Geolocation error:", err);
          useLocationStore.getState().fetchLocationByIP();
        }
      },

      // GPS denied
      () => {
        console.log("GPS denied → using IP fallback");
        // No loading:false here
        useLocationStore.getState().fetchLocationByIP();
      }
    );
  },


      //ip based fallback
  fetchLocationByIP: async () => {
    try {
      set({ loading: true });

      const res = await axios.get("https://ipapi.co/json/");

      set({
        city: res.data.city,
        country: res.data.country_name,
        coords: null,
        loading: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  }
}));

export default useLocationStore;
