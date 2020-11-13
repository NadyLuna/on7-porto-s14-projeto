const cursos = require("../models/cursos");

const getAll = (req, res) => {
    console.log(req.url);
    cursos.find(function (err, cursos) {
        if (err)
            res.status(500).send({
                message: err.message,
            });

        res.status(200).send(cursos);
    });
};

const getPorTurno = (req, res) => {
    console.log(req.query)
    const params = req.query

    console.log(turno);
    res.status(200).send({
        message: "pegar todos os cursos por turno",
    });
};

const getById = (req, res) => {
    const id = req.params.id;
    cursos.find({id: id,}, (err, curso) => {
            if (err) {
                res.status(424).send({
                    message: err.message,
                });
            } else if (curso.length > 0) {
                res.status(200).send(curso);
            } else {
                res.status(404).send({
                    message: "Curso não encontrado.",
                });
            }
        }
    );
};

const getBootcamps = (req, res) => {
    res.status(200).send({
        message: "pegar todos os cursos por que são do tipo bootcamp",
    });
};

const getCursosGratuitos = (req, res) => {
    res.status(200).send({
        message: "pegar todos os cursos que são gratuitos",
    });
};

const getCursosPagos = (req, res) => {
    res.status(200).send({
        message: "pegar todos os cursos que são pagos",
    });
};

const postCurso = (req, res) => {
    cursos.countDocuments((err, count) => {
        if (err) {
            res.status(424).send({
                message: err.message,
            });
        } else {
            let curso = new cursos(req.body);
            curso.id = count + 1;
            curso.save((err) => {
                if (err) {
                    res.status(424).send({
                        message: err.message,
                    });
                } else {
                    res.status(200).send({
                        status: true,
                        menssagem: "Curso incluído com sucesso!",
                    });
                }
            });
        }
    });
};

const deleteCurso = (req, res) => {
    const id = req.params.id;
    cursos.find({ id }, (err, curso) => {
        if (curso.length > 0) {
            cursos.deleteOne({ id }, err => {
                err ? res.status(424).send({ message: err.message }) : res.status(200).send({
                    status: true,
                    mensagem: 'Curso excluído com sucesso'
                });
            });
        } else {
            res.status(404).send('Curso não encontrado');
        };
    });
};


const deleteCursosPorTurno = (req, res) => {
    const parametros = req.query;
    console.log(parametros);
    res.status(200).send({
        message: "deletar os cursos por turnos",
    });
};

const putCurso = (req, res) => {
    res.status(200).send({
        message: "atualizar um curso",
    });
};

module.exports = {
    getAll,
    getPorTurno,
    getById,
    getBootcamps,
    getCursosGratuitos,
    getCursosPagos,
    postCurso,
    deleteCurso,
    deleteCursosPorTurno,
    putCurso,
};