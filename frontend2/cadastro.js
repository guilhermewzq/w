
const API_URL = "https://w-silk-nine.vercel.app"

const formulario = document.getElementById("formCadastro")

formulario.addEventListener("submit", async (event) => {
    event.preventDefault()

    const titulo = document.getElementById("titulo").value
    const genero = document.getElementById("genero").value
    const duracao = document.getElementById("duracao").value
    const classificacao = document.getElementById("classificacao").value

    try {
        const resposta = await fetch(`${API_URL}/create-movie`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo,
                genero,
                duracao,
                classificacao
            })
        })

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar filme")
        }

        alert("Filme cadastrado com sucesso!")

        window.location.href = "index.html"

    } catch (error) {
        console.error(error)
        alert("Erro ao cadastrar o filme.")
    }
})