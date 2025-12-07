import { CloudMoonIcon, CloudSunIcon, MoonStarsIcon, SunDimIcon, SunHorizonIcon } from "@phosphor-icons/react";

// Convert time string ("05:30") → Date object
export const parseTime = (time) => {
  if (!time || typeof time !== "string" || !time.includes(":")) return null;
  const [h, m] = time.split(":");
  const d = new Date();
  d.setHours(h);
  d.setMinutes(m);
  d.setSeconds(0);
  return d;
};

export const getProgress = (timings, currentPrayer, nextPrayer) => {
  if (!timings || !currentPrayer || !nextPrayer) return 0;

  const start = parseTime(timings[currentPrayer]);
  const end = parseTime(timings[nextPrayer]);

  if (!start || !end) return 0;

  const now = new Date();

  // handle next prayer being after midnight
  if (end < start) end.setDate(end.getDate() + 1);

  const total = end - start;        // total duration between prayers
  const passed = now - start;       // time already passed

  const progress = passed / total;

  return Math.min(1, Math.max(0, progress));   // clamp 0–1
};


// Convert ms → "1h 29m"
export const formatTimeDiff = (ms) => {
  const totalMin = Math.floor(ms / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return h === 0 ? `${m}m` : `${h}h ${m}m`;
};

// Convert 24h → 12h format
export const to12Hour = (time) => {
  if (!time) return "";
  let [hour, minute] = time.split(":");
  hour = parseInt(hour);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
};

export const prayerIcons = {
  Fajr: CloudMoonIcon,
  Dhuhr: SunDimIcon,
  Asr: CloudSunIcon,
  Maghrib: SunHorizonIcon,
  Isha: MoonStarsIcon
};
