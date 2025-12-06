import { create } from "zustand";
import axios from "axios";
import useLocationStore from "./useLocationStore";

const usePrayerStore = create((set) => ({
  timings: null,
  date: null,
  loading: false,
  error: null,

  fetchPrayerTimes: async () => {
    const { city, country } = useLocationStore.getState(); // get from location store

    if (!city || !country) {
      set({ error: "City or country missing", loading: false });
      return;
    }

    try {
      set({ loading: true, error: null });

      const res = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=1`
      );

      set({
        timings: res.data.data.timings,
        date: res.data.data.date,
        loading: false,
      });

    } catch (err) {
      console.error("Prayer API error:", err);
      set({ error: "Failed to fetch prayer timings", loading: false });
    }
  },
}));

export default usePrayerStore;
