let guesses = [];

// for(let i = 0; i < 10; i ++){
//     let rand = Math.floor(Math.random()*10000)

//     console.log(data.country[rand], data.country_name[rand], data.rank_in_country[rand], data.surname[rand], data.incidence[rand], data.frequency_denom[rand])
// }

let possibleCountries = [...new Set(data.country_name)];

// console.log(possibleCountries);

$(".autocomplete").autocomplete({source: function(request, response) {
    let results = $.ui.autocomplete.filter(possibleCountries, request.term);

    response(results.slice(0, 7));
}});



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