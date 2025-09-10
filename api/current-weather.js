// Vercel serverless function for current weather data
// keeps API key secure on the server side

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

  try {
    // API key is accessed from environment variables on the server
    const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;

    if (!apiKey) {
      console.error("API key not found in environment variables");

      return res.status(500).json({ error: "Server configuration error" });
    }

    // PROXY: Make the request to OpenWeatherMap on behalf of the frontend
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`OpenWeatherMap API error: ${response.status}`);
    }

    const data = await response.json();

    // CORS HANDLING
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // SUCCESS: Return the weather data to the frontend
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching current weather:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}
