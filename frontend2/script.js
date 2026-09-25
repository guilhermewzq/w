// TROQUE PELA URL DO SEU BACKEND NA VERCEL
const API_URL = "https://w-silk-nine.vercel.app"

async function buscarFilmes() {

    const container = document.getElementById("filmes")

    try {

        const resposta = await fetch(`${API_URL}/all-movies`)

        if (!resposta.ok) {
            throw new Error("Erro ao buscar filmes")
        }

        const filmes = await resposta.json()

        container.innerHTML = ""

        if (filmes.length === 0) {
            container.innerHTML = "<p>Nenhum filme cadastrado.</p>"
            return
        }

        filmes.forEach(filme => {

            const div = document.createElement("div")
            div.classList.add("filme")

            div.innerHTML = `
                <h3>${filme.titulo}</h3>

                <p><strong>Gênero:</strong> ${filme.genero}</p>

                <p><strong>Duração:</strong> ${filme.duracao} minutos</p>

                <p><strong>Classificação:</strong> ${filme.classificacao}</p>

                <div class="acoes">
                    <button class="editar" onclick="editarFilme(${filme.id})">
                        Editar
                    </button>

                    <button class="apagar" onclick="apagarFilme(${filme.id})">
                        Apagar
                    </button>
                </div>
            `

            container.appendChild(div)
        })

    } catch (error) {

        console.error(error)

        container.innerHTML = `
            <p>Erro ao carregar os filmes.</p>
        `
    }
}

function editarFilme(id) {
    window.location.href = `editar.html?id=${id}`
}

async function apagarFilme(id) {

    const confirmar = confirm(
        "Tem certeza que deseja apagar este filme?"
    )

    if (!confirmar) {
        return
    }

    try {

        const resposta = await fetch(`${API_URL}/delete-movie/${id}`, {
            method: "DELETE"
        })

        if (!resposta.ok) {
            throw new Error("Erro ao apagar filme")
        }

        alert("Filme apagado com sucesso!")

        buscarFilmes()

    } catch (error) {

        console.error(error)

        alert("Erro ao apagar o filme.")
    }
}

buscarFilmes()