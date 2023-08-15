let desired = [];
let testIncidence = 1000000;
let possibleIndices = []

for(let i = 0; i < data.country.length; i++){
    if(data.incidence[i] > testIncidence){
        desired.push({
            id: i,
            surname: data.surname[i],
            country: data.country_name[i],
            incidence: data.incidence[i]
        });
        possibleIndices.push(i);
    }
}

// console.log(desired.length, data.country.length, desired.length/data.country.length)

// for(let i = 0; i < 15; i++){
//     let rand = Math.floor(Math.random()*desired.length)
//     console.log(desired[rand])
// }


// let foundCountries = []
// for(let i = 0; i < desired.length; i++){
//     if(foundCountries.indexOf(desired[i].country) < 0){
//         foundCountries.push(desired[i].country);
//     }
// }
// console.log(possibleCountries.length)
// console.log(foundCountries.length)
// console.log(foundCountries)


// console.log(data.country.length, data.country_name.length, data.rank_in_country.length, data.surname.length, data.incidence.length, data.frequency_denom.length)


function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


// let finishedCountries = Object.keys(possibleDailyCountries)

// let unfinishedCountries = possibleCountries.filter(f => !finishedCountries.includes(f))

// console.log(unfinishedCountries)

let ctrys = Object.keys(possibleDailyCountries)

let regions = {}
for(let country of ctrys){
  if(regions[possibleDailyCountries[country][1]] > 0){
    regions[possibleDailyCountries[country][1]]++;
  }
  else{
    regions[possibleDailyCountries[country][1]] = 1
  }
}

console.log(regions)