# Wardosphere

<div align="center">
  <img src="images/logo.svg" alt="Wardosphere Logo" width="300">
  
  <p>A modern, responsive weather web application providing accurate forecasts and air quality data for locations worldwide.</p>
  
  [![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://your-wardosphere-url.com)
  [![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/yourusername/wardosphere)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
</div>

## ✨ Features

- **Real-time Weather Data**: Current weather conditions with detailed metrics
- **5-Day Forecast**: Extended weather predictions with daily breakdowns
- **Hourly Forecasts**: 24-hour weather and wind speed predictions
- **Air Quality Index**: Comprehensive air pollution monitoring (PM2.5, SO2, NO2, O3)
- **Location Search**: Find weather for any city worldwide
- **Geolocation Support**: Automatic detection of user's current location
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Modern, eye-friendly dark interface
- **Weather Icons**: Beautiful visual representations of weather conditions
- **Interactive UI**: Smooth animations and intuitive user experience

## 🚀 Live Demo

Visit [Wardosphere](https://wardosphere.vercel.app/) to see the application in action.

## 🛠️ Technology Stack

### Frontend

- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: ES6+ features and modular architecture
- **Material Design Icons**: Beautiful iconography

### Backend & APIs

- **Vercel Serverless Functions**: Secure API proxy layer
- **OpenWeatherMap API**: Weather and air quality data
- **Geocoding API**: Location search and coordinate conversion

### Tools & Services

- **Vercel**: Hosting and deployment platform
- **Git**: Version control

## 📦 Installation

### Prerequisites

- OpenWeatherMap API key

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/KeepSerene/Weatherio-weather-web-app.git
   cd Weatherio-weather-web-app
   ```

2. **No extra dependencies required**

3. **Environment setup**
   Create a `.env` file in the root directory:

   ```env
   OPEN_WEATHER_MAP_API_KEY=your_api_key_here
   ```

4. **Start the development server with Live Server**

5. **Open your browser**
   Navigate to `localhost:PORT`

### Getting API Keys

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key from your dashboard
4. Add the key to your environment variables

## 🎯 Usage

### Search for Weather

1. Click the search icon in the header
2. Type a city name (e.g., "London", "New York")
3. Select from the dropdown suggestions
4. View comprehensive weather data

### Current Location

1. Click the "Current Location" button
2. Allow location permission when prompted
3. View weather for your current position

### Weather Information

- **Current Conditions**: Temperature, description, feels-like temperature
- **Today's Highlights**: Air quality, sunrise/sunset, humidity, pressure, visibility
- **Hourly Forecast**: Next 24 hours with temperature and wind data
- **5-Day Forecast**: Extended predictions with daily highs

## 🏗️ Project Structure (Tentative)

```
wardosphere/
├── api/                      # Vercel serverless functions
│   ├── air-pollution.js      # Air quality data endpoint
│   ├── current-weather.js    # Current weather endpoint
│   ├── forecast.js           # Weather forecast endpoint
│   ├── geocoding.js          # City search endpoint
│   └── reverse-geocoding.js  # Coordinate to city endpoint
├── css/                      # Stylesheets
│   ├── reset.css            # CSS reset
│   ├── style.css            # Main styles
│   └── utils.css            # Utility classes
├── images/                   # Static assets
│   ├── logo.svg             # Application logo
│   ├── favicon.svg          # Favicon
│   └── weather-icons/       # Weather condition icons
├── js/                      # JavaScript modules
│   ├── api.js              # API communication layer
│   ├── main.js             # Main application logic
│   ├── module.js           # Utility functions
│   └── route.js            # Client-side routing
├── font/                    # Custom fonts
├── index.html              # Main HTML file
└── README.md              # Project documentation
```

## 🔧 Configuration

### Environment Variables

- `OPEN_WEATHER_MAP_API_KEY`: Your OpenWeatherMap API key

### Vercel Deployment

The application is configured for automatic deployment on Vercel.

## 🎨 Customization

### Themes

The application uses CSS custom properties for easy theming. Modify the `:root` variables in `css/style.css`:

```css
:root {
  --primary: #b5a1e5;
  --background: #131214;
  --surface: #1d1c1f;
  /* Add your custom colors */
}
```

### Weather Icons

Replace icons in the `images/weather-icons/` directory to customize the visual appearance.

## 🚀 Deployment

### Vercel (Recommended)

1. Fork or clone this repository
2. Connect your GitHub account to Vercel
3. Import the project
4. Add environment variables in Vercel dashboard
5. Deploy automatically

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Add comments for complex logic
- Test thoroughly across different devices
- Update documentation as needed

## 📋 API Reference

### Endpoints

All API calls are proxied through serverless functions to keep API keys secure:

- `GET /api/current-weather?lat={lat}&lon={lon}` - Current weather data
- `GET /api/forecast?lat={lat}&lon={lon}` - 5-day weather forecast
- `GET /api/air-pollution?lat={lat}&lon={lon}` - Air quality information
- `GET /api/geocoding?q={query}` - Search locations by name
- `GET /api/reverse-geocoding?lat={lat}&lon={lon}` - Get location from coordinates

## 🐛 Known Issues

- Search results limited to 5 locations
- Hourly forecast shows next 8 intervals (24 hours)
- Some weather icons may not display in older browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dhrubajyoti Bhattacharjee**

- GitHub: [@KeepSerene](https://github.com/KeepSerene)
- Email: dhrubajyotibhattacharjee182@gmail.com

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing weather data APIs
- [Material Design Icons](https://fonts.google.com/icons) for beautiful iconography
- [Vercel](https://vercel.com/) for hosting and serverless functions
- Weather icons and design inspiration from various open-source projects

## 📊 Project Status

This project is actively maintained. Future enhancements may include:

- Weather alerts and notifications
- Historical weather data
- Weather maps integration
- Multiple theme options
- Progressive Web App (PWA) features

---

<div align="center">
  <p>Made with ❤️ by Dhrubajyoti Bhattacharjee</p>
  <p>If you found this project helpful, please consider giving it a ⭐</p>
</div>
