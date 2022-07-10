const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

// Models
const { User } = require("../models/user.model");

dotenv.config({ path: "./config.env" });

const protectSession = catchAsync(async (req, res, next) => {
  let token;

  // Extract the token from headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("invalid session ", 403));
  }

  // ask JWT(library), if the token is still valid
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  // {id, ...}

  // Check in db that user still exists
  const user = await User.findOne({
    where: { id: decoded.id, status: "active" },
  });

  if (!user) {
    return next(
      new AppError("The owner of this token doesnt exists anymore", 403)
    );
  }

  //Grant access
  req.sessionUser = user;
  next();
});

// Create middleware that:
const protectUserAccount = (req, res, next) => {
  // 1. Get the session user's id
  // 2. Validate that the user that is being update/delete is the same as th session user
  const { sessionUser, user } = req;
  // 3. If th id's don't match, return error (403)
  if (sessionUser.id !== user.id) {
    return next(new AppError("You do not own this account", 403));
  }

  // 4. Apply middleware only in PATCH and DELETE endpoints
  next();
};

module.exports = { protectSession, protectUserAccount };
