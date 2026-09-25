// TROQUE PELA URL DO SEU BACKEND NA VERCEL
const API_URL = "https://w-silk-nine.vercel.app"

const parametros = new URLSearchParams(window.location.search)
const id = parametros.get("id")

const titulo = document.getElementById("titulo")
const genero = document.getElementById("genero")
const duracao = document.getElementById("duracao")
const classificacao = document.getElementById("classificacao")
const formulario = document.getElementById("formEditar")

async function carregarFilme() {

    if (!id) {
        alert("Filme não encontrado.")
        window.location.href = "index.html"
        return
    }

    try {

        const resposta = await fetch(`${API_URL}/all-movies`)
        const filmes = await resposta.json()

        const filme = filmes.find(filme => filme.id == id)

        if (!filme) {
            alert("Filme não encontrado.")
            window.location.href = "index.html"
            return
        }

        titulo.value = filme.titulo
        genero.value = filme.genero
        duracao.value = filme.duracao
        classificacao.value = filme.classificacao

    } catch (error) {
        console.error(error)
        alert("Erro ao carregar o filme.")
    }
}

formulario.addEventListener("submit", async (event) => {

    event.preventDefault()

    try {

        const resposta = await fetch(`${API_URL}/edit-movie/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo: titulo.value,
                genero: genero.value,
                duracao: duracao.value,
                classificacao: classificacao.value
            })
        })

        if (!resposta.ok) {
            throw new Error("Erro ao editar filme")
        }

        alert("Filme atualizado com sucesso!")

        window.location.href = "index.html"

    } catch (error) {
        console.error(error)
        alert("Erro ao atualizar o filme.")
    }
})

carregarFilme()