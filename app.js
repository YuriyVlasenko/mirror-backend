let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let config = require("./config.json");
let mongoose = require("mongoose");
let apiRouters = require("./routers/api");

let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
apiRouters.applyRouters(app);

mongoose.connect(config.dbConnectionName, { useNewUrlParser: true }, () => {
  app.listen(8080, () => {
    console.log("app started");
  });
});
