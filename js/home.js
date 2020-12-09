
//creating object of what we need from this API
 const pokemonData = {
     url:'https://pokeapi.co/api/v2/pokemon/ditto',
     type:'pokemon',
     id:'15',
 }

 const pokemonUrl =`${pokemonData.url}?types=${pokemonData.type}&ids=${pokemonData.id}`

//console.log to see the status of URl
// console.log(pokemonUrl);

//BY using fetch we will now get all the data needed for pokemon

fetch(pokemonUrl)
    .then( (info) => console.log(info.json()) )
    .then( (pokemony) => console.log(pokemony))

