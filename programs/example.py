import json
import random

with open('data/database_surnames_no_duplicates.json', 'r') as f:
    data = json.load(f)

print(f'Total: {len(data["surname"])}')

print('Welcome to Nationality Guessr!\nInstructions:\n1. Try to guess what country someone is from given their last name. (For now, the multiple countries-last name issue hasn\'t been addressed)\n2. If you want to know the list of countries, simply enter \'list\'\n3. If want to see your score, simply enter \'score\'\n4. If you want to quit, just enter \'quit\'\n')
by_country = {}
for i in range(len(data['surname'])):
    item = {k: data[k][i] for k in data}
    if item['country_name'] not in by_country:
        by_country[item['country_name']] = []
    by_country[item['country_name']].append(item)

alphabetical_countries = []
for country_name, items in by_country.items():
    alphabetical_countries += [country_name]
alphabetical_countries.sort()

is_playing = True 
score = 0
round = 0
while is_playing:
    round+=1
    print(f'Round {round}\n')
    rand_idx = random.randint(0,len(data['surname'])-1)
    country, country_name, rank_in_country, surname, incidence, frequency_denom = data['country'][rand_idx], data['country_name'][rand_idx], data['rank_in_country'][rand_idx],data['surname'][rand_idx],data['incidence'][rand_idx],data['frequency_denom'][rand_idx]
    inp = input(f'What country is the surname {surname} from? Enter your guess: \n')
    
    if inp == 'list':
        print(alphabetical_countries)
        inp = input(f'What country is the surname {surname} from? Enter your guess: \n')
    if inp == 'quit':
        print('Thanks for playing! Hope you come again.')
        is_playing = False
    if inp == 'score':
        inp = input(f'Your score is {score}. What country is the surname {surname} from? Enter your guess: \n')
    if inp == country_name:
        score += 1
        print('Congrats! You got it right!\n')
    if inp != country_name and inp != quit:
        print(f'Incorrect. The answer actually was {country_name}. The surname is the {rank_in_country}-most common last name in that country, and there are {incidence} people with that surname in that country.')
