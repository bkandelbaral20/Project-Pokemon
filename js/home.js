
//creating object of what we need from this API
 const pokemonData = {
     url:'https://pokeapi.co/api/v2/pokemon/ditto',
     type:'pokemon',
     id:'15',
 }

 //creating url
 const pokemonUrl =`${pokemonData.url}?types=${pokemonData.type}&ids=${pokemonData.id}`

//console.log to see the status of URl
// console.log(pokemonUrl);

//BY using fetch we will now get all the data needed for pokemon
fetch(pokemonUrl)
    .then( (info) => (info.json()) )
    .then( (pokemony) => structure(pokemony))


//now after getting all the information we can build the pokemon layout

function structure(info) {
    console.log(info);
 const layout = `
            <div class="card" style="width: 14rem;">
                <div class="card-body">
                    <h5 class="card-title">${info.name}</h5>
                </div>
                <img src=${info.sprites.front_default} class="card-img-top" alt="...">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"> <span> Height: ${info.height}</span></li>
                     <li class="list-group-item"> <span> Weight: ${info.weight}</span></li>
                </ul>
            </div>   
 `

    //using DOM to printout all the info in webpage
    const pokemonInfo = document.querySelector('.pokemon')
    pokemonInfo.innerHTML = layout;
}
