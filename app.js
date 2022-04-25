const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const errorHandlers = require("./handlers/errorHandler");
console.log(errorHandlers.notFound);
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT") {
    app.use(errorHandlers.developmentErrors);
}
else {
    app.use(errorHandlers.productionErrors);
}

module.exports = app;