
//creating object of what we need from this API
const pokemonData = {
    url:'https://pokeapi.co/api/v2',
    type:'/pokemon',
    offset:'/?offset=20&limit=20',
}
//creating url
const pokemonUrl = pokemonData.url + pokemonData.type + pokemonData.offset

// console.log(pokemonUrl);

//BY using fetch we will now get all the data needed for pokemon

fetch(pokemonUrl)
    .then( info => info.json())
    .then(buildPokemon)
    .then(structure)
    .catch(console.error)

async function buildPokemon(data){
    const results = data.results;

   let pokemons = results.map( async result => {
       const pokeData = await fetch(result.url).then(d => d.json())
       let newPokemon = {
           name : pokeData.name,
           height : pokeData.height,
           weight : pokeData.weight,
           sprite : pokeData.sprites.front_default,
       }
       return newPokemon
   })

    const listOfPokemon = await Promise.all(pokemons)
    return listOfPokemon;
}

function structure(arrayOfPokemon) {
    const pokemonHTML = arrayOfPokemon.reduce((stringBuilder, element) => stringBuilder.concat(createPokemon(element)), "");
    //using DOM to printout all the info in webpage
    const pokemonInfo = document.querySelector('.pokemon');
    pokemonInfo.insertAdjacentHTML("beforeend", pokemonHTML);
}

function createPokemon(pokemon){
    return `
    <div class="card" style="width: 14rem;">
        <div class="card-body">
           <h5 class="card-title"><strong>${pokemon.name}</strong></h5>
        </div>
        <img src= ${pokemon.sprite} class="card-img-top" alt="...">
        <button class="fav" type="submit"><i class="fa fa-heart" style="font-size:30px"></i></i></button>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"> <span> Height: ${pokemon.height}</span></li>
            <li class="list-group-item"> <span> Weight: ${pokemon.weight}</span></li>
        </ul>
    </div>`
}