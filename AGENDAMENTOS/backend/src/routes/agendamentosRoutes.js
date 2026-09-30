const express = require("express");

const router = express.Router();

const {
    listarAgendamentos,
    buscarAgendamento,
    criarAgendamento
} = require("../controllers/agendamentosController");

router.get("/", listarAgendamentos);
router.get("/:id", buscarAgendamento);
router.post("/", criarAgendamento);

module.exports = router;