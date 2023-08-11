let guesses = [];

// for(let i = 0; i < 10; i ++){
//     let rand = Math.floor(Math.random()*10000)

//     console.log(data.country[rand], data.country_name[rand], data.rank_in_country[rand], data.surname[rand], data.incidence[rand], data.frequency_denom[rand])
// }

let possibleCountries = [...new Set(data.country_name)];

// console.log(possibleCountries);



// This code is used to create the autocomplete
$(".autocomplete").autocomplete({source: function(request, response) {
    let results = $.ui.autocomplete.filter(possibleCountries, request.term);

    response(results.slice(0, 7));
}});


// This function runs whenever a guess is made:
function guessMade(){
    let guess = document.getElementById('guessBox').value;
    if(!(possibleCountries.indexOf(guess) >= 0)) return;
    
    guesses.push(guess);
    updateGuesses();
}

function updateGuesses(){
    for(let i = 0; i < guesses.length; i++){
        document.getElementById(`guess${i+1}`).innerHTML = guesses[i];
    }
}

function getCountry(id){
    return({
        country: data.country_name[id],
        rank: data.rank_in_country[id],
        name: data.surname[id],
        incidence: data.incidence[id],
        frequency: data.frequency_denom[id]
    })
}

function resetGuesses(){
    for(let i = 0; i < 5; i++){
        document.getElementById(`guess${i+1}`).innerHTML = "";
    }
}


function newGame(){
    resetGuesses();
    guesses = [];

    random = Math.floor((Math.random() * data.country.length))

    let country = getCountry(random);

    document.getElementById('todayName').innerHTML = country.name;

}

newGame()