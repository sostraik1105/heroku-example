const express = require("express");
const { renderIndex } = require("../controllers/views.controller");

const viewsRouter = express.Router();

viewsRouter.get("/", renderIndex);

module.exports = { viewsRouter };
