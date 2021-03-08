const WEATHER_API_KEY = "c6003c8fca5f5a582995aef2ce2f8670";
/**
 * This function will always return a `Promise` which will resolve to a `JSON` of questions and reject an Error
 *
 * For using this function, you must provide an `API KEY` on line 4 of `/JS/callback.js` for using the function
 * @typedef {object} weatherDataJSON json defined on their documentation: https://openweathermap.org/api/one-call-api
 * @param {number} lat The Latitude you want info from
 * @param {number} lon The Longitude you want info from
 * @param {(error: (Error | null), weatherData: (weatherDataJSON | null)) => any} callback A callback function which will be called when the API provides data
 *
 */
function getWeather(lat, lon, callback) {
		if (!WEATHER_API_KEY)
			callback(new Error("An API KEY must be provided on /JS/callback.js line 4 for function getQuestions to work", null));
		else if (!lat || !lon)
			callback(new Error("You must provide latitude and longitude", null));
		else {
			fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${WEATHER_API_KEY}`)
			.then(response => response.json())
			.then(questions => callback(null, questions))
			.catch(error => {callback(error, null)});
		}
}