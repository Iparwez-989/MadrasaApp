import {CloudMoonIcon,CloudSunIcon,MoonStarsIcon,SunDimIcon,SunHorizonIcon} from '@phosphor-icons/react';
import { useState,useEffect } from 'react';
import useLocationStore from '../store/useLocationStore';
import usePrayerStore from '../store/usePrayerStore';
import { formatTimeDiff, parseTime, prayerIcons, to12Hour } from '../utilities/utility';
import { prayerColors } from '../utilities/cardColors';
import PrayerCard from './PrayerCard';
import TymingArc from './TymingArc';


const NamazCard = () => {
  const [nextPrayer, setNextPrayer] = useState({ name: "", timeLeft: "" });
  const [bgColor, setBgColor] = useState(prayerColors.Fajr);

  const { city, country, fetchLocation } = useLocationStore();
  const { timings, date,  fetchPrayerTimes } = usePrayerStore();
  const prayers = [
  { name: "Fajr", icon: CloudMoonIcon, time: timings?.Fajr },
  { name: "Dhuhr", icon: SunDimIcon, time: timings?.Dhuhr },
  { name: "Asr", icon: CloudSunIcon, time: timings?.Asr },
  { name: "Maghrib", icon: SunHorizonIcon, time: timings?.Maghrib },
  { name: "Isha", icon: MoonStarsIcon, time: timings?.Isha },
  ];

  const order = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  // compute the currently active prayer (previous of the upcoming one)
  const activePrayer = nextPrayer?.name
    ? order[(order.indexOf(nextPrayer.name) - 1 + order.length) % order.length]
    : null;

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    if (city && country) {
      fetchPrayerTimes();
    }
  }, [city, country]);
  

  const getNextPrayer = () => {
    if (!timings) return { name: "", timeLeft: "" };

    const order = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    const now = new Date();

    for (let p of order) {
      const t = parseTime(timings[p]);
      if (t > now) {
        return { name: p, timeLeft: formatTimeDiff(t - now) };
      }
    }

    // All prayers passed → next is tomorrow Fajr
    const fajrTomorrow = parseTime(timings.Fajr);
    fajrTomorrow.setDate(fajrTomorrow.getDate() + 1);

    return { name: "Fajr", timeLeft: formatTimeDiff(fajrTomorrow - now) };
  };
  useEffect(() => {
  const interval = setInterval(() => {
    getNextPrayer();
  }, 1000); // runs every 1 second

  return () => clearInterval(interval);
  }, [timings]);
  useEffect(() => {
  const interval = setInterval(() => {
    if (timings) {
      setNextPrayer(getNextPrayer());
    }
  }, 1000);

  return () => clearInterval(interval);
  }, [timings]);
  ;
  useEffect(() => {
    if (activePrayer) {
      setBgColor(prayerColors[activePrayer] || "from-violet-800 via-violet-500 to-violet-300");
    }
  }, [activePrayer]);

  const NextIcon = prayerIcons[nextPrayer.name] || CloudMoonIcon;

  return (
    <div className={`text-white bg-linear-to-b ${bgColor} rounded-xl mx-3 mt-6 md:w-80`}>

      {/* TOP SECTION */}
      <div className='flex justify-between items-center pt-5 px-5'>
        <div className='flex items-center gap-2 font-bold'>
          <NextIcon size={28} color='white' />
          <p className='text-2xl'>{nextPrayer.name || "..."}</p>
        </div>
        <div className='border px-3 rounded-full text-md text-center backdrop-blur-lg bg-white/20 '>
          <p>{date?.gregorian?.weekday?.en || "..."}</p>
        </div>
      </div>

      {/* TIME LEFT */}
      <p className='ml-5 mt-2'>
        Next Prayer in {nextPrayer.timeLeft || "..."}
      </p>

      {/* ALL PRAYER TIMES */}
        <div className='flex justify-evenly items-center gap-3 p-3 font-semibold mt-2 text-slate-300'>
      {prayers.map((p) => (
      <PrayerCard
        key={p.name}
        icon={p.icon}
        name={p.name}
        time={to12Hour(p.time)}
        active={p.name === activePrayer}
      />
        ))}
        </div>
        <TymingArc
  timings={timings}
/>
    </div>
  );
};

export default NamazCard;
