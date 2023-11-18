// Common elements in our HTML that we will be referencing
let form = document.querySelector("form");
let tempUnitBtn = document.getElementById("tempUnitBtn");

// After we fetch weather data we store the object in this variable for reference.
let currentWeatherData = null;

// This will track the states of our app.
let appState = {
	isCelsius: true,
};

// Function to fetch the weather API data
async function getWeatherData(userLocation) {
	let weatherAPI = await fetch(
		`https://api.weatherapi.com/v1/current.json?key=baecf5c0d0a24bb7aa830650231211&q=${userLocation}
`,
		{ mode: "cors" }
	);
	let weatherData = await weatherAPI.json();
	console.log(weatherData);

	return weatherData;
}

// These functions retrieves specific info from the current weather data.
function getTemp() {
	return appState.isCelsius ? currentWeatherData.current.temp_c : currentWeatherData.current.temp_f;
}

function getLocation() {
	return `${currentWeatherData.location.name}, ${currentWeatherData.location.region}, ${currentWeatherData.location.country}`;
}

function getHumidity() {
	return currentWeatherData.current.humidity;
}

function getCondition() {
	return currentWeatherData.current.condition.icon;
}

async function fadeOutElements() {
	let locationElement = document.getElementById("locale");
	let temperatureElement = document.getElementById("temp");
	let humidityElement = document.getElementById("humidity");
	let conditionElement = document.getElementById("condition");

	locationElement.classList.remove("fade-in");
	temperatureElement.classList.remove("fade-in");
	humidityElement.classList.remove("fade-in");
	conditionElement.classList.remove("fade-in");

	locationElement.classList.remove("fade-out");
	temperatureElement.classList.remove("fade-out");
	humidityElement.classList.remove("fade-out");
	conditionElement.classList.remove("fade-out");
}

async function fadeInElements() {
	let locationElement = document.getElementById("locale");
	let temperatureElement = document.getElementById("temp");
	let humidityElement = document.getElementById("humidity");
	let conditionElement = document.getElementById("condition");

	locationElement.classList.add("fade-in");

	conditionElement.classList.add("fade-in");

	temperatureElement.classList.add("fade-in");

	humidityElement.classList.add("fade-in");
}

// Updates the UI elements on the page to match the current weather location data
async function updatePage() {
	let locationElement = document.getElementById("locale");
	let temperatureElement = document.getElementById("temp");
	let humidityElement = document.getElementById("humidity");
	let conditionElement = document.getElementById("condition");

	await fadeOutElements();

	locationElement.innerText = getLocation();
	temperatureElement.innerText = `${getTemp()}°`;
	humidityElement.innerText = `Humidity: ${getHumidity()}%`;
	conditionElement.src = getCondition();

	await fadeInElements();
}

document.getElementById("tempUnitBtn").addEventListener("click", () => {
	appState.isCelsius ? (appState.isCelsius = false) : (appState.isCelsius = true);
	appState.isCelsius ? (tempUnitBtn.innerText = "°C") : (tempUnitBtn.innerText = "°F");
	updatePage();
});

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	let userLocation = document.getElementById("location").value;
	try {
		let weatherData = await getWeatherData(userLocation);
		currentWeatherData = weatherData;
		updatePage();
	} catch (err) {
		return alert(`Sorry, we were not able to locate your request. Please try again. `);
	}
});
