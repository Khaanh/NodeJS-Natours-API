const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
	"<PASSWORD>",
	process.env.DATABASE_PASSWORD
);

mongoose
	// .connect(process.env.DATABASE_LOCAL, {
	// - local db
	.connect(DB, {
		//- host
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then((connection) => {
		console.log("DB connection successful");
	});

const tourSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "A tour must have a name"],
		unique: true,
	},
	rating: {
		type: Number,
		default: 4.5,
	},
	price: {
		type: Number,
		required: [true, "A tour must have a price"],
	},
});

const Tour = mongoose.model("Tour", tourSchema);

const testTour = new Tour({
	name: "The Park Camper",
	price: 997,
});

testTour
	.save()
	.then((doc) => {
		console.log(doc);
	})
	.catch((err) => {
		console.log(`ERROR: ${err}`);
	});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`App running on port ${PORT}...`);
});
