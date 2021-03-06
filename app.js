const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");

// Routers
const { usersRouter } = require("./routes/users.routes");
const { postsRouter } = require("./routes/posts.routes");
const { viewsRouter } = require("./routes/views.routes");

// Global err controller
const { globalErrorHandler } = require("./controllers/error.controller");

// Utils
const { AppError } = require("./utils/appError.util");
const { commentsRouter } = require("./routes/comments.routes");

// Init express app
const app = express();

// Enable incoming JSON
app.use(express.json());

// Set template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
// le decimos que busque los archivos del template engine en la carpeta 'views'

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Limit the number of request that can be accepted to our server
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  max: 10000,
  message: "Number of request hace been exceeded",
});

app.use(limiter);

// Add security headers
app.use(helmet());

// Compress responses
app.use(compression());

// Log incomming request
process.env.NODE_ENV === "development"
  ? app.use(morgan("dev"))
  : app.use(morgan("combined"));

// Define endpoints
app.use("/", viewsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/comments", commentsRouter);

// Handle incoming unknown routes to the server
app.all("*", (req, res, next) => {
  next(
    new AppError(
      `${req.method} ${req.originalUrl} not found in this server`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = { app };
