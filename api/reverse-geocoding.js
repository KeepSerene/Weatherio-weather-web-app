// Vercel serverless function for reverse geocoding (coordinates to city name)
// This function converts latitude/longitude coordinates to city names

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: "Missing required parameters: lat, lon" });
  }

  // basic coordinate validation
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);

  if (isNaN(latitude) || isNaN(longitude)) {
    return res
      .status(400)
      .json({ error: "Invalid coordinates: lat and lon must be numbers" });
  }

  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return res.status(400).json({ error: "Invalid coordinate ranges" });
  }

  try {
    // API key is accessed from environment variables on the server
    const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;

    if (!apiKey) {
      console.error("API key not found in environment variables");
      return res.status(500).json({ error: "Server configuration error" });
    }

    // PROXY: Make the request to OpenWeatherMap reverse geocoding API
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`OpenWeatherMap API error: ${response.status}`);
    }

    const data = await response.json();

    // CORS HANDLING: set appropriate headers for frontend access
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // SUCCESS
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching reverse geocoding data:", error);
    res.status(500).json({ error: "Failed to fetch location data" });
  }
}
