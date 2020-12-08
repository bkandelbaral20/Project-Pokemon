// const pokemonUrl = "https://pokeapi.co/api/v2/";

//creating object of what we need from this API
 const pokemonData = {
     url:'https://pokeapi.co/api/v2/',
     type:'pokemon',
     id:'15',
 }

 const pokemonUrl = `${pokemonData.url} ${pokemonData.type} / ${pokemonData.id}`
console.log(pokemonUrl);