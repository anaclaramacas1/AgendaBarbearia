const conectarBanco = require("../config/database");

const listarAgendamentos = (req, res) => {
    const db = conectarBanco();

    db.query("SELECT * FROM agendamentos", (erro, resultados) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao buscar agendamentos"
            });
        }

        res.json(resultados);
        db.end();
    });
};
const buscarAgendamento = (req, res) => {
    const { id } = req.params;
    const db = conectarBanco();

    db.query(
        "SELECT * FROM agendamentos WHERE id = ?",
        [id],
        (erro, resultados) => {
            if (erro) {
                return res.status(500).json({
                    erro: "Erro ao buscar agendamento"
                });
            }

            if (resultados.length === 0) {
                return res.status(404).json({
                    mensagem: "Agendamento não encontrado"
                });
            }

            res.json(resultados[0]);
            db.end();
        }
    );
};

const criarAgendamento = (req, res) => {
    const { nome, procedimento, dia, hora } = req.body;

    if (!nome || !procedimento || !dia || !hora) {
        return res.status(400).json({
            erro: "Todos os campos são obrigatórios"
        });
    }

    const db = conectarBanco();

    const sql = `
        INSERT INTO agendamentos (nome, procedimento, dia, hora)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [nome, procedimento, dia, hora],
        (erro, resultado) => {
            if (erro) {
                return res.status(500).json({
                    erro: "Erro ao criar agendamento",
                    detalhe: erro.message
                });
            }

            res.status(201).json({
                mensagem: "Agendamento criado com sucesso",
                id: resultado.insertId
            });

            db.end();
        }
    );
};

module.exports = {
    listarAgendamentos,
    buscarAgendamento,
    criarAgendamento
};