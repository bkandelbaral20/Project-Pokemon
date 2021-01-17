//creating object of what we need from this API
const pokemonData = {
    url: 'https://pokeapi.co/api/v2',
    type: '/pokemon',
    offset: '/?offset=20&limit=20',
}
//creating url
const pokemonUrl = pokemonData.url + pokemonData.type + pokemonData.offset

// console.log(pokemonUrl);

//----------------
document.addEventListener("DOMContentLoaded", function () {
    fetch(pokemonUrl.concat(pokemonData.initoffset))
        .then((info) => info.json())
        .then(renderPageControls)
        .then(buildPokemon)
        .then(structure)
        .then(status => {
            if (status === "rendered") {
                const prevBtn = document.querySelector("#prev");
                const nextBtn = document.querySelector("#next");
                if (prevBtn && nextBtn) {
                    prevBtn.addEventListener("click", function (event) {
                        event.preventDefault();
                        if (!prevBtn.pathname.includes("null")) {
                            console.log("hi")
                        }
                    })
                    nextBtn.addEventListener("click", function (event) {
                        event.preventDefault();
                        if (!nextBtn.pathname.includes("null")) {
                            console.log("hi")
                        }
                    })
                }
            }
        })
        .catch(console.error);

})

async function renderPageControls(data) {
    let controls = [data.next, data.previous]
    const navBtnsContainer = document.querySelector("#nav-btns")

    navBtnsContainer.insertAdjacentHTML('beforeend', createPageControls(controls))
    return data.results;
}

function createPageControls([next, previous]) {
    return `<a id="prev" href="${previous}">Previous </a>
            <a id="next" href="${next}">  Next</a>	`
}


//------------------------------------------------------
//BY using fetch we will now get all the data needed for pokemon
async function buildPokemon() {
    const results = await fetch(pokemonUrl)
        .then(info => info.json())
        .then(data => data.results)
        .catch(console.error);
    let pokemonList = results.map(async result => {
        const pokeData = await fetch(result.url).then(d => d.json())
        let newPokemon = {
            id: pokeData.id,
            name: pokeData.name,
            height: pokeData.height,
            weight: pokeData.weight,
            sprite: pokeData.sprites.front_default,
            spriteB: pokeData.sprites.back_default,
            abilities:pokeData.abilities,
            types:pokeData.types,

        }
        return newPokemon
    })
    return Promise.all(pokemonList);
}

// Declare pokemon promise that can be used by the different event functions
const pokemon = buildPokemon();

// declare DOM elements for the pokemon content and the search bar
const pokemonInfo = document.querySelector('.pokemon');
const searchBar = document.getElementById("search");

function structure(arrayOfPokemon) {
    const pokemonHTML = arrayOfPokemon.reduce((stringBuilder, element) => stringBuilder.concat(createPokemon(element)), "");
    //using DOM to printout all the info in webpage
    pokemonInfo.insertAdjacentHTML("beforeend", pokemonHTML);
}

function createPokemon(pokemon) {
    return `
    <div class="card " style="width: 25rem;">
        <div class="card-body">
           <h5 class="card-title text-center"><strong>${pokemon.name}</strong></h5>
        </div>
        <div class="card-content center-align"> 
        <img src= ${pokemon.sprite} class="card-img-top" alt="...">
      <img src= ${pokemon.spriteB} class="card-img-top" alt="...">
        </div>
        <button id= ${pokemon.id}like class="fav" value=${pokemon.id}><i class="fa fa-heart" style="font-size:30px"></i></button>
        <button id= ${pokemon.id}more value= ${pokemon.id}> More </button>
        <div class="info">
        <ul class="list-group list-group-flush" id= ${pokemon.id}info>
            <li class="list-group-item text-center"> <span><strong> Height: ${pokemon.height}</strong></span></li>
            <li class="list-group-item text-center"> <span><strong> Weight: ${pokemon.weight}</strong></span></li>
        </ul>
        </div>
      
    </div>`
}

//for rendering the page(data)
const render = async function () {
    const pokemons = await pokemon.then(data => data);
    structure(pokemons);
}

//Targeting the values that was typed by user input field
const updatePoke = async (e) => {
    // clear the page content
    pokemonInfo.innerHTML = '';
    // Store the pokemon list from the promise (pokemon) object
    const poke = await pokemon.then(data => data);
    const filter = poke.filter((elem) => elem.name.toLowerCase().includes(e.target.value.toLowerCase()));
    // filter.forEach((data) => console.log(data.name));
    structure(filter);
}
//rendering pokename names(page)
document.addEventListener('DOMContentLoaded', render);

//Filters by the user input searches. Calls function every time a new letter is typed using eventListeners.
searchBar.addEventListener("input", updatePoke);


//for toggling the details button
document.body.addEventListener('click', async function(e){
    // console.log(e.target.id);
      const poke = await pokemon.then(data => data);
      const pk = poke.filter(element => element.id == e.target.value);
      console.log(pk);

    if(e.target.id.includes("more")){
        const info = document.getElementById(e.target.value + "info");

        // Create a new html list

        //for Abilities
        const html = document.createElement('li');
        html.textContent = `Abilities: ${pk[0].abilities[0].ability.name},${pk[0].abilities[1].ability.name}`;
        html.className = "list-group-item text-center font-weight-bold";
        info.appendChild(html);

        //for Types
        const html1 = document.createElement('li');
        html1.textContent = `Types: ${pk[0].types[0].type.name}`;
        html1.className = "list-group-item text-center font-weight-bold";
        info.appendChild(html1);
    }


});











