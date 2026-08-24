async function buscarFilmes() {
    const resposta = await fetch(
        "https://w-hwwvdzfr4-guilherme-sampaios-projects.vercel.app/all-movies"
    )

    const filmes = await resposta.json()

    const sectionFilmes = document.querySelector(".filmes")

    filmes.forEach((filme) => {
        sectionFilmes.innerHTML += `
            <div>
                <h2>${filme.titulo}</h2>
                <p><strong>Gênero:</strong> ${filme.genero}</p>
                <p><strong>Duração:</strong> ${filme.duracao_minutos ?? "Não informado"} minutos</p>
                <p><strong>Classificação indicativa:</strong> ${
                    filme.classificacao_etaria ?? "Livre"
                }</p>
            </div>
        `
    })
}

buscarFilmes()