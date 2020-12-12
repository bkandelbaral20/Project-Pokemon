
//creating object of what we need from this API
 const pokemonData = {
     url:'https://pokeapi.co/api/v2',
     type:'/pokemon'
     // id:'/20',
 }

 //creating url
    const pokemonUrl = pokemonData.url + pokemonData.type
 // const pokemonUrl =`${pokemonData.url}?types=${pokemonData.type}&ids=${pokemonData.id}`

//console.log to see the status of URl
// console.log(pokemonUrl);

//BY using fetch we will now get all the data needed for pokemon
fetch(pokemonUrl)
    .then( (info) => ((info.json())) )
    .then( (pokemony) => structure(pokemony))


//now after getting all the information we can build the pokemon layout

function structure(info) {
let string = "";
console.log(info.results);

     info.results.forEach(function(element){
         console.log(element.name);



    string += `<div class="card" style="width: 14rem;">
            <div class="card-body">
            <h5 class="card-title"><strong>${element.name}</strong></h5>
        </div>

            <ul class="list-group list-group-flush">
            <li class="list-group-item"> <span> Height: ${element.height}</span></li>
        <li class="list-group-item"> <span> Weight: ${element.weight}</span></li>
        </ul>
        </div>`;

     });

 //    const layout = `
 //            <div class="card" style="width: 14rem;">
 //                <div class="card-body">
 //                    <h5 class="card-title"><strong>${info.name}</strong></h5>
 //                </div>
 //                <img src=${info.sprites.front_default} class="card-img-top" alt="...">
 //                <ul class="list-group list-group-flush">
 //                    <li class="list-group-item"> <span> Height: ${info.height}</span></li>
 //                     <li class="list-group-item"> <span> Weight: ${info.weight}</span></li>
 //                </ul>
 //            </div>
 //
 // `

    //using DOM to printout all the info in webpage
    const pokemonInfo = document.querySelector('.pokemon');
    pokemonInfo.innerHTML = string;
}

// function buildCards(info){
//     let bucket= "" ;
//     for(let i=0;i<info.length;i++){
//         bucket +=  `<div class="card" style="width: 14rem;">
//             <div class="card-body">
//             <h5 class="card-title"><strong>${info[i].name}</strong></h5>
//         </div>
//         <img src=${info[i].sprites.front_default} class="card-img-top" alt="...">
//             <ul class="list-group list-group-flush">
//             <li class="list-group-item"> <span> Height: ${info[i].height}</span></li>
//         <li class="list-group-item"> <span> Weight: ${info[i].weight}</span></li>
//         </ul>
//         </div>`;
//     }
//     return bucket;
//
//
// }
