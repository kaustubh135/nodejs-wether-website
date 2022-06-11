const request = require("request");

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYm9nb3dlYzc2MiIsImEiOiJjbDQxNjZ2ZDQxNHI0M2ltazFueWh4OGJ4In0.fwrTdwswIruf4T9wriARvw&limit=1`;
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect to Location Service");
		} else if (body.features.length === 0) {
			callback("Unable to find Location. Try another search.");
		} else {
			const { center, place_name } = body.features[0];
			callback(null, {
				latitude: center[1],
				longitude: center[0],
				location: place_name,
			});
		}
	});
};

module.exports = geocode;
