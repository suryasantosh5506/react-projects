import React, { useEffect, useState } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [report, setReport] = useState({});

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=66eb14b353e74b709a703719260506&q=${search}`,
        );

        const data = await response.json();
        setReport(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (search) {
      fetchWeather();
    }
  }, [search]);

  const handleSearch = () => {
    setSearch(city);
    setCity("");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-400 to-blue-700 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Weather App
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            id="city"
            value={city}
            placeholder="Enter city name"
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {report.error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg text-center mb-4">
            {report.error.message}
          </div>
        )}

        {report.location && (
          <div className="text-center">
            <img
              src={report.current.condition.icon}
              alt={report.current.condition.text}
              className="mx-auto w-24 h-24"
            />

            <h2 className="text-2xl font-semibold mb-2">
              {report.current.condition.text}
            </h2>

            <h3 className="text-5xl font-bold text-blue-600 mb-4">
              {report.current.temp_c}°C
            </h3>

            <p className="text-gray-700 text-lg">
              {report.location.name}, {report.location.region}
            </p>

            <p className="text-gray-500 mb-6">{report.location.country}</p>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold">Humidity</h4>
                <p>{report.current.humidity}%</p>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold">Wind</h4>
                <p>{report.current.wind_kph} km/h</p>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold">Latitude</h4>
                <p>{report.location.lat}</p>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold">Longitude</h4>
                <p>{report.location.lon}</p>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Temperature</h4>
              <p>{report.current.temp_c} °C</p>
              <p>{report.current.temp_f} °F</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
