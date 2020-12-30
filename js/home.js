
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
    .then( (info) => (info.json()) )
    .then( (pokemony) => buildPokemon(pokemony))
    .then(structure)
    .catch(console.error)

//now after getting all the information we can build the pokemon layout

 async function buildPokemon(data){
    const results = data.results;

    //making an array to put all the list of information
    let listOfPokemon = results.map(async result => {
        let newPokemon = {
            name : "",
            height : 0,
            weight : 0,
            sprite : "",
        }
        let res = await fetch(result.url)
            .then(pokemon => pokemon.json());

        newPokemon.name = res.name;
        newPokemon.height = res.height;
        newPokemon.weight = res.weight;
        newPokemon.sprite = res.sprites.front_default;

        // return Promise.resolve(newPokemon);
        return await newPokemon;
    });
         return listOfPokemon;
     // console.log(listOfPokemon);
}

function structure(arrayOfPokemon) {
  let string = "";
    arrayOfPokemon.forEach(element => {
         console.log(element.name);

    string += `<div class="card" style="width: 14rem;">
            <div class="card-body">
            <h5 class="card-title"><strong>${element.name}</strong></h5>
        </div>
          <img src=${element.sprite} class="card-img-top" alt="...">

            <ul class="list-group list-group-flush">
            <li class="list-group-item"> <span> Height: ${element.height}</span></li>
        <li class="list-group-item"> <span> Weight: ${element.weight}</span></li>
        </ul>
        </div>`;

     });

    //using DOM to printout all the info in webpage
    const pokemonInfo = document.querySelector('.pokemon');
    pokemonInfo.innerHTML = string;
}

