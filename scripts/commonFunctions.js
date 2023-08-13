function capFirst(str){
    return(str.slice(0,1).toUpperCase() + str.slice(1, str.length))
}

input = document.getElementById('guessBox')
input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("guessButton").click();
    }
  });

  function getCountry(id){
    return({
        country: data.country_name[id],
        rank: data.rank_in_country[id],
        name: data.surname[id],
        incidence: data.incidence[id],
        frequency: data.frequency_denom[id]
    })
}


function fillHint(guess, answer, attempt){
    let guessHints = possibleDailyCountries[guess];
    let answerHints = possibleDailyCountries[answer];
    // [Africa, North Africa]

    let guessedCountry = guessHints[0]
    let guessedRegion = guessHints[1]
    let guessedLetters = guess.length
    let guessedFirstLetter = guess.substring(0, 1)

    let answerCountry = answerHints[0]
    let answerRegion = answerHints[1]
    let answerLetters = answer.length
    let answerFirstLetter = answer.substring(0, 1)

    document.getElementById(`hintCountry${attempt}`).innerHTML = guessedCountry
    document.getElementById(`hintRegion${attempt}`).innerHTML = guessedRegion
    document.getElementById(`hintLetters${attempt}`).innerHTML = guessedLetters
    document.getElementById(`hintFirstLetter${attempt}`).innerHTML = guessedFirstLetter

    document.getElementById(`hintCountry${attempt}`).style.color = guessedCountry == answerCountry ? 'green' : 'red'
    document.getElementById(`hintRegion${attempt}`).style.color = guessedRegion == answerRegion ? 'green' : 'red'
    document.getElementById(`hintLetters${attempt}`).style.color = guessedLetters == answerLetters ? 'green' : 'red'
    document.getElementById(`hintFirstLetter${attempt}`).style.color = guessedFirstLetter == answerFirstLetter ? 'green' : 'red'
}