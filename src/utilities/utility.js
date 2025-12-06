// Convert time string ("05:30") → Date object
export const parseTime = (time) => {
  const [h, m] = time.split(":");
  const d = new Date();
  d.setHours(h);
  d.setMinutes(m);
  d.setSeconds(0);
  return d;
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

