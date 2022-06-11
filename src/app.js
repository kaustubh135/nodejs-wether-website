const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDirPath));
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "Kaustubh",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About",
		name: "Kaustubh",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help",
		name: "Kaustubh",
		email: "kaustubh@gmail.com",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "No address provided!",
		});
	}

	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({
				error,
			});
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({
					error,
				});
			}

			res.send({
				forecast: forecastData,
				location,
				address: req.query.address,
			});
		});
	});

});

app.get("/product", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "No search query provided",
		});
	}

	console.log(req.query.search);
	res.send({
		product: [],
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Kaustubh",
		error: "Help Article Not Found",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Kaustubh",
		error: "My 404 Page",
	});
});

app.listen(3000, () => {
	console.log("Server is up on port 3000.");
});
