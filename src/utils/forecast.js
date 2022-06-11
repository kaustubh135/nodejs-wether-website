const request = require("request");

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=9cb397f5f9bcac8e3bd100373da7b47a&query=${latitude},${longitude}&units=m`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect to Wether Service");
		} else if (body.error) {
			callback("Unable to find Location");
		} else {
			const { weather_descriptions, temperature, feelslike } = body.current;
			callback(null, `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out`);
		}
	});
};

module.exports = forecast;
