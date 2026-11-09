/* Shared by the three concept drafts. Everything is computed in the browser;
   nothing about the visitor leaves the page. */
const KAABA = { lat: 21.4225, lon: 39.8262 };
const CITIES = [
  { name: 'Istanbul', lat: 41.0082, lon: 28.9784, tz: 'Europe/Istanbul' },
  { name: 'Jakarta', lat: -6.2088, lon: 106.8456, tz: 'Asia/Jakarta' },
  { name: 'London', lat: 51.5072, lon: -0.1276, tz: 'Europe/London' },
  { name: 'New York', lat: 40.7128, lon: -74.006, tz: 'America/New_York' },
  { name: 'Cairo', lat: 30.0444, lon: 31.2357, tz: 'Africa/Cairo' },
  { name: 'Karachi', lat: 24.8607, lon: 67.0011, tz: 'Asia/Karachi' },
  { name: 'Dhaka', lat: 23.8103, lon: 90.4125, tz: 'Asia/Dhaka' },
  { name: 'Kuala Lumpur', lat: 3.139, lon: 101.6869, tz: 'Asia/Kuala_Lumpur' },
  { name: 'Paris', lat: 48.8566, lon: 2.3522, tz: 'Europe/Paris' },
  { name: 'Moscow', lat: 55.7558, lon: 37.6173, tz: 'Europe/Moscow' },
];
const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;

/** Great-circle initial bearing to the Kaaba, degrees from true north. */
function qiblaBearing(lat, lon) {
  const p1 = rad(lat), p2 = rad(KAABA.lat), dl = rad(KAABA.lon - lon);
  const y = Math.sin(dl) * Math.cos(p2);
  const x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl);
  return (deg(Math.atan2(y, x)) + 360) % 360;
}
/** Haversine distance to the Kaaba, km. */
function qiblaDistance(lat, lon) {
  const p1 = rad(lat), p2 = rad(KAABA.lat);
  const a = Math.sin((p2 - p1) / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(rad(KAABA.lon - lon) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(a));
}
function localTime(tz) {
  try { return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz }).format(new Date()); }
  catch { return ''; }
}
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
