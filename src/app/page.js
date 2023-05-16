"use client";

//Imports
import Image from "next/image";
import { useEffect, useState } from "react";
import cityImage from "./assets/city.png";
import humidityImage from "./assets/humidity.png";
import pressureImage from "./assets/pressure.png";
import thermometerImage from "./assets/thermometer.png";
import windImage from "./assets/wind.png";

// environment variables
const URL = "http://api.weatherapi.com/v1/current.json?aqi=no";
const KEY = "a267b50095b04aa9b53192120231605";

// Component
export default function Home() {
  // UseState
  const [city, setCity] = useState("Islamabad");
  const [weatherData, setWeatherData] = useState();
  const [temp, setTemp] = useState(null);
  const [err, setErr] = useState(false);
  const [error, setError] = useState("");

  // UseEffect
  useEffect(() => {
    getWeather();
  }, []);

  // fetch weather functions
  const getWeather = async () => {
    try {
      setErr(false);
      setTemp(null);
      const data = await fetch(`${URL}&key=${KEY}&q=${city}`);
      const response = await data.json();
      setWeatherData(response);
      setTemp(true);
    } catch (error) {
      setError(error);
      setErr(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div>
        <h2 className="font-raleway text-5xl font-extrabold mb-10 sm:text-4xl">
          Weather App
        </h2>
      </div>
      <div className="flex sm:flex-col">
        <input
          value={city}
          type="text"
          placeholder="City..."
          className="outline-indigo mr-6 rounded-sm pl-4 w-64 font-raleway sm:mr-0 sm:mb-4 sm:py-1"
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <button
        onClick={getWeather}
        disabled={!city}
        className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 text-white"
      >
        <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
        <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease">
          Search
        </span>
      </button>

      {temp && (
        <div className="mt-10 m-15 border-1 border-gray-300 rounded-10 bg-transparent rounded-md overflow-hidden shadow-2xl">
          <div className="flex flex-row items-center justify-between">
            <div className="flex-1 p-6 border-r-1 border-gray-300">
              <div className="flex flex-row items-center">
                <Image src={cityImage} alt="location" className="w-8 h-8" />
                <div className="flex flex-col items-end justify-end">
                  <span className="text-sm font-bold text-gray-700">
                    Location:
                  </span>
                  <span className="text-lg font-bold text-blue-900">
                    {`${weatherData?.location?.name}`}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 p-6">
              <div className="flex flex-row items-center">
                <Image
                  src={
                    `https:${weatherData?.current?.condition?.icon}` !==
                    "https:"
                      ? `https:${weatherData?.current?.condition?.icon}`
                      : ""
                  }
                  alt="condition"
                  width={64}
                  height={64}
                />
                <div className="flex flex-col items-end justify-end">
                  <span className="text-sm font-bold text-gray-700">
                    Condition:
                  </span>
                  <span className="text-lg font-bold text-blue-900">
                    {weatherData?.current?.condition?.text}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex-1 p-6 border-r-1 border-gray-300">
              <div className="flex flex-row items-center">
                <Image
                  src={thermometerImage}
                  alt="thermometer"
                  className="w-8 h-8"
                />
                <div className="flex flex-col items-end justify-end">
                  <span className="text-sm font-bold text-gray-700">
                    Feel Like:
                  </span>
                  <span className="text-lg font-bold text-blue-900">
                    {weatherData?.current?.feelslike_c} °
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 p-6">
              <div className="flex flex-row items-center">
                <Image src={humidityImage} alt="humidity" className="w-8 h-8" />
                <div className="flex flex-col items-end justify-end">
                  <span className="text-sm font-bold text-gray-700">
                    Humidity:
                  </span>
                  <span className="text-lg font-bold text-blue-900">
                    {weatherData?.current?.humidity} %
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between border-t-1 border-gray-300">
            <div className="flex-1 p-6 border-r-1 border-gray-300">
              <div className="flex flex-row items-center">
                <Image src={windImage} alt="wind" className="w-8 h-8" />
                <div className="flex flex-col items-end justify-end">
                  <span className="text-sm font-bold text-gray-700">
                    Wind speed:
                  </span>
                  <span className="text-lg font-bold text-blue-900">
                    {weatherData?.current?.wind_kph} Kph
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 p-6">
              <div className="flex flex-row items-center">
                <Image src={pressureImage} alt="pressure" className="w-8 h-8" />
                <div className="flex flex-col items-end justify-end">
                  <span className="text-sm font-bold text-gray-700">
                    Pressure:
                  </span>
                  <span className="text-lg font-bold text-blue-900">
                    {weatherData?.current?.pressure_mb} hPa
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {err && (
        <div className="mt-10 bg-red-200 px-12 py-4 rounded font-raleway text-xl font-semibold text-gray-700 sm:text-base sm:px-8">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
