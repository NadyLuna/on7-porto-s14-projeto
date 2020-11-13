const cursos = require("../models/cursos");

const getAll = (req, res) => {
    cursos.find(function (err, cursos) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send(cursos)
        }
    })
}

const getPorTurno = (req, res) => {
    const parametros = req.query
    cursos.find(parametros, function (err, cursos) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send(cursos)
        }
    })
}

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
    cursos.find({ bootcamp: true }, function (err, cursos) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send(cursos)
        }
    })
}

const getCursosGratuitos = (req, res) => {
    const estado = req.params.estado
    cursos.find({ estado, gratuito : true }, function (err, cursos) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send(cursos)
        }
    })
}

const getCursosPagos = (req, res) => {
    const estado = req.params.estado
    cursos.find({ estado, gratuito : false }, function (err, cursos) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send(cursos)
        }
    })

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
    const parametros = req.query
    cursos.deleteMany(parametros, function(err){
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send({ message : "cursos removidos com sucesso"})
        }
    })
}

const putCurso = (req, res) => {
    const id = req.params.id
    cursos.updateMany({ id }, { $set : req.body }, { upsert : true }, function(err){
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send({ message : "curso atualizado com sucesso"})
        }
    })
}
    console.log(req.url);
    cursos.find(function (err, cursos) {
        if (err)
            res.status(500).send({
                message: err.message,
            });

        res.status(200).send(cursos);
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