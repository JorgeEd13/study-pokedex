const pokeName = document.getElementById('pokeName');
const pokeID = document.getElementById('pokeNumber');
const pokeImg = document.getElementById('pokeImg');
const formSearch = document.getElementById('pokeForm');
const inputForm = document.getElementById('inputForm');
const prevButton = document.getElementById('buttonPrev');
const nextButton = document.getElementById('buttonNext');

let searchPokeID = 1;

const fetchPokemon = async (pokemon) => { /* 'async' determina que a função 'fetchPokemon' é 'assíncrona' ("leva um tempo pra responder"), necessário para o 'await' na função assíncrona 'fetch' logo abaixo. */

    pokeName.innerHTML = 'Loading...';
    pokeID.innerHTML = '';

    const responseAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)  /* Pesquisa os nomes em letras minúsculas */

    if (responseAPI.status == 200) { /* Confirma se o pokémon foi encontrado ou erro. */
        const data = await responseAPI.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);

    if (data) { /* Garante que só ira funcionar se 'data' existir. */
        pokeImg.style.display = 'block';
        pokeName.innerHTML = data.name; /* '.name' refere-se ao dado encontrado no PokéAPI. */
        pokeID.innerHTML = data.id;
        pokeImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        inputForm.value = '';
        searchPokeID = data.id;
    } else {
        pokeImg.style.display = 'none'; /* Esconde a imagem. */
        pokeName.innerHTML = 'Not Found';
        pokeID.innerHTML = ':(';
        searchPokeID = 0;
    }
}

formSearch.addEventListener('submit', (event) => { /* Função que rendeniza o pokémon buscado. */
    event.preventDefault();
    renderPokemon(inputForm.value.toLowerCase());
});

prevButton.addEventListener('click', () => { /* Função que rendeniza o pokémon buscado. */
    if (searchPokeID > 1) {
        searchPokeID -= 1;
        renderPokemon(searchPokeID);
    }
});

nextButton.addEventListener('click', () => { /* Função que rendeniza o pokémon buscado. */
    searchPokeID += 1;
    renderPokemon(searchPokeID);
});

renderPokemon(searchPokeID);
