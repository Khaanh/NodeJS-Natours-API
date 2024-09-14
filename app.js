const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();

// 1) Middleware - function that modify the incoming data (between req and res)
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
	console.log("Hello from the middleware");
	next();
});

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

// 3) ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRouter);

// 4) START SERVER
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`App running on port ${PORT}...`);
});
