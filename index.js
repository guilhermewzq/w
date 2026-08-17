import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

const sql = mysql2.createPool({
    host: "benserverplex.ddns.net",
    database: "alunos_filmes03TA",
    user: "alunos",
    password: "senhaAlunos"
})

app.get("/all-movies", (request, response) => {
    const selectCommand = "SELECT * FROM filmes_GuilhermeSampaioGabrielPegozzi"

    sql.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
            return
        }

        response.json(data)
    })
})

app.post("/create-movie", (request, response) => {
    const { titulo, genero, duracao, classificacao } = request.body

    const insertCommand =
        "INSERT INTO filmes_GuilhermeSampaioGabrielPegozzi (titulo, genero, duracao, classificacao) VALUES (?, ?, ?, ?)"

    sql.query(insertCommand, [titulo, genero, duracao, classificacao], (error) => {
        if (error) {
            console.log(error)
            return
        }

        response.status(201).json({
            message: "Filme cadastrado com sucesso!"
        })
    })
})

app.put("/edit-movie/:id", (request, response) => {
    const { id } = request.params
    const { titulo, genero, duracao, classificacao } = request.body

    const updateCommand =
        "UPDATE filmes_GuilhermeSampaioGabrielPegozzi SET titulo=?, genero=?, duracao=?, classificacao=? WHERE id=?"

    sql.query(updateCommand, [titulo, genero, duracao, classificacao, id], (error) => {
        if (error) {
            console.log(error)
            return
        }

        response.json({
            message: "Filme atualizado com sucesso!"
        })
    })
})

app.delete("/delete-movie/:id", (request, response) => {
    const { id } = request.params

    const deleteCommand =
        "DELETE FROM filmes_GuilhermeSampaioGabrielPegozzi WHERE id=?"

    sql.query(deleteCommand, [id], (error) => {
        if (error) {
            console.log(error)
            return
        }

        response.json({
            message: "Filme apagado com sucesso!"
        })
    })
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });