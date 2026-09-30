const express = require("express");

const app = express();

app.use(express.json());

const agendamentosRoutes = require("./routes/agendamentosRoutes");

app.use("/agendamentos", agendamentosRoutes);

module.exports = app;