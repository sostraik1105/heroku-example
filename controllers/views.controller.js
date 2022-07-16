const path = require("path");

// Models
const { Post } = require("../models/post.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

const renderIndex = catchAsync(async (req, res, next) => {
  const posts = await Post.findAll();

  // __dirmane -> toma la ruta absoluta de la ruta actual
  console.log(__dirname);

  res.status(200).render("index", {
    title: "Rendered with Pug",
    posts,
  });

  /* Send static html
  //D:\Proyectos\Academlo\nodeJS\academlo-gen-13-main\heroku-example\controllers
  //D:\Proyectos\Academlo\nodeJS\academlo-gen-13-main\heroku-example\
  //D:\Proyectos\Academlo\nodeJS\academlo-gen-13-main\heroku-example\public
  //D:\Proyectos\Academlo\nodeJS\academlo-gen-13-main\heroku-example\public\index.html
  const indexPath = path.join(__dirname, "..", "public", "index.pug");

  res.status(200).sendFile(indexPath);
  */
});

module.exports = { renderIndex };
