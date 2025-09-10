// Vercel serverless function for geocoding (city name to coordinates)
// This function converts city names to latitude/longitude coordinates

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { q } = req.query;

  // Check if search query is provided
  if (!q || q.trim().length === 0) {
    return res
      .status(400)
      .json({ error: "Missing required parameter: q (search query)" });
  }

  // Prevent excessively long queries to avoid abuse
  if (q.length > 100) {
    return res.status(400).json({ error: "Search query too long" });
  }

  try {
    // API key is accessed from environment variables on the server
    const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;

    if (!apiKey) {
      console.error("API key not found in environment variables");
      return res.status(500).json({ error: "Server configuration error" });
    }

    // encoding the query to prevent injection attacks
    const encodedQuery = encodeURIComponent(q.trim());

    // PROXY: Make the request to OpenWeatherMap geocoding API
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodedQuery}&limit=5&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`OpenWeatherMap API error: ${response.status}`);
    }

    const data = await response.json();

    // CORS HANDLING
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // SUCCESS
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    res.status(500).json({ error: "Failed to fetch location data" });
  }
}
