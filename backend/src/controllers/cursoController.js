import curso from '../models/Curso.js';

class cursoController {

    static async listarCursos(req,res){
        try{
            const listaCursos = await curso.buscarTodos();  
        res.status(200).json(listaCursos);
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async listarCursosPorId(req, res){
        const idProcurado = req.params.id;
        try{
            const listaCursos = await curso.buscarCursoPorId(idProcurado);
            res.status(200).json(listaCursos);
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async removerCurso(req,res){
        const idProcurado = req.params.id;
        try{
            const listaCursos = await curso.removerCurso(idProcurado);
            res.status(200).json({message: "Removido com sucesso"});
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async inserirCurso(req,res){
        const cursoNovo = req.body;
        try{
            const result = await curso.inserirCurso(cursoNovo);
            res.status(200).json({message: "Inserido com sucesso"});
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async alterarCurso(req, res){
        const idCurso = req.params.id;
        const { nome, codcurso } = req.body;
        try{
            const result = await curso.alterarCurso({id: idCurso, nome: nome, codcurso: codcurso });
            res.status(200).json({message: "Alterado com sucesso"});
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }   

    }
}

export default cursoController;

