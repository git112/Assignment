// Weather Forecast Tracker
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to get user input
function question(query) {
  return new Promise(resolve => {
    rl.question(query, answer => {
      resolve(answer);
    });
  });
}

// Initial weather data array
let weatherData = [
  { cityName: "New York", temperature: 22, condition: "Sunny" },
  { cityName: "London", temperature: 18, condition: "Cloudy" },
  { cityName: "Tokyo", temperature: 25, condition: "Rainy" }
];

// Add City Weather: Function to add a new city weather object
const addCityWeather = (data, cityName, temperature, condition) => {
  temperature = parseFloat(temperature);
  return [...data, { cityName, temperature, condition }];
};

// Find Hottest City: Function to identify the city with the highest temperature
const findHottestCity = (data) => {
  return data.reduce((hottest, city) => 
    city.temperature > hottest.temperature ? city : hottest, data[0]);
};

// Filter by Condition: Function to list all cities with a specific weather condition
const filterByCondition = (data, condition) => {
  return data.filter(city => city.condition.toLowerCase() === condition.toLowerCase());
};

// Create formatted list of cities with temperatures
const getFormattedCityTemps = (data) => {
  return data.map(city => `City: ${city.cityName}, Temp: ${city.temperature}°C`);
};

// Display weather summary for all cities
const displayWeatherSummary = (data) => {
  console.log("\nWeather Summary:");
  data.forEach(city => {
    console.log(`City: ${city.cityName}, Temp: ${city.temperature}°C, Condition: ${city.condition}`);
  });
};

// Function to get user input for adding a city
const getCityInputFromUser = async () => {
  const cityName = await question("Enter city name: ");
  if (!cityName) return null;
  
  const tempStr = await question("Enter temperature (°C): ");
  const temperature = parseFloat(tempStr);
  if (isNaN(temperature)) {
    console.log("Invalid temperature. Please enter a number.");
    return null;
  }
  
  const condition = await question("Enter weather condition (Sunny, Cloudy, Rainy, etc.): ");
  if (!condition) return null;
  
  return { cityName, temperature, condition };
};

// Main function to handle user interaction
const manageWeatherTracker = async () => {
  let running = true;
  
  while (running) {
    console.log("\nWeather Forecast Tracker Menu:");
    console.log("1: View All Cities");
    console.log("2: Add City Weather");
    console.log("3: Find Hottest City");
    console.log("4: Filter Cities by Condition");
    console.log("5: View Formatted City Temperatures");
    console.log("6: Exit");
    
    const action = await question("What would you like to do? ");
    
    switch (action) {
      case "1": // View All Cities
        displayWeatherSummary(weatherData);
        break;
        
      case "2": // Add City Weather
        const cityData = await getCityInputFromUser();
        if (cityData) {
          const { cityName, temperature, condition } = cityData;
          weatherData = addCityWeather(weatherData, cityName, temperature, condition);
          console.log(`Added ${cityName} to the weather tracker.`);
          displayWeatherSummary(weatherData);
        }
        break;
        
      case "3": // Find Hottest City
        if (weatherData.length === 0) {
          console.log("No city data available.");
          break;
        }
        
        const hottestCity = findHottestCity(weatherData);
        const { cityName, temperature, condition } = hottestCity;
        console.log(`\nHottest City: ${cityName}`);
        console.log(`Temperature: ${temperature}°C`);
        console.log(`Condition: ${condition}`);
        break;
        
      case "4": // Filter Cities by Condition
        const weatherCondition = await question("Enter weather condition to filter by: ");
        const filteredCities = filterByCondition(weatherData, weatherCondition);
        
        if (filteredCities.length === 0) {
          console.log(`No cities found with condition: ${weatherCondition}`);
        } else {
          console.log(`\nCities with ${weatherCondition} conditions:`);
          displayWeatherSummary(filteredCities);
        }
        break;
        
      case "5": // View Formatted City Temperatures
        const formattedList = getFormattedCityTemps(weatherData);
        console.log("\nFormatted City Temperatures:");
        formattedList.forEach(item => console.log(item));
        break;
        
      case "6": // Exit
        running = false;
        console.log("Thank you for using the Weather Forecast Tracker!");
        rl.close();
        break;
        
      default:
        console.log("Invalid option. Please try again.");
    }
  }
};

// Start the weather tracker application
manageWeatherTracker();