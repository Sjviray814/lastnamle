let desired = [];
let testIncidence = 40000;

for(let i = 0; i < data.country.length; i++){
    if(data.incidence[i] > testIncidence){
        desired.push({
            id: i,
            surname: data.surname[i],
            country: data.country_name[i],
            incidence: data.incidence[i]
        });
    }
}

console.log(desired.length, data.country.length, desired.length/data.country.length)

for(let i = 0; i < 15; i++){
    let rand = Math.floor(Math.random()*desired.length)
    console.log(desired[rand])
}


let foundCountries = []
for(let i = 0; i < desired.length; i++){
    if(foundCountries.indexOf(desired[i].country) < 0){
        foundCountries.push(desired[i].country);
    }
}
console.log(possibleCountries.length)
console.log(foundCountries.length)
console.log(foundCountries)


// console.log(data.country.length, data.country_name.length, data.rank_in_country.length, data.surname.length, data.incidence.length, data.frequency_denom.length)