# Travian Animals Finder

<img src="public/nature.png" alt="nature"/><br/>

The tool for analysis oases (free or occupied) and searching animals (Elephant and etc).


Tested in **Shadow Empires**, **Fire and Sand** and **Legends**.

<p align="center">
<img src="public/fire_and_sand.png" alt="fire_and_sand"/><br/>
<img src="public/legends_logo_black.png" alt="legends_logo_black"/>
<img src="public/shadow_empires_logo.png" alt="legends_logo_black"/>
</p>


## Feature: Using login/password instead cookies

This feature will allow add new functionality such token renew etc.

Do you agree?

[![](https://api.gh-polls.com/poll/01EVTTCW09G0WD12P949RQ9ANX/Yes)](https://api.gh-polls.com/poll/01EVTTCW09G0WD12P949RQ9ANX/Yes/vote)
[![](https://api.gh-polls.com/poll/01EVTTCW09G0WD12P949RQ9ANX/No)](https://api.gh-polls.com/poll/01EVTTCW09G0WD12P949RQ9ANX/No/vote)

## How to use

## Config

Set correct fields in `config.js` 

### authorization

1. Open map, https://ts6.travian.com/karte.php

    <img src="public/map.png" alt="map"/>

2. Open DevTools(F12 Chrome),  Network tab’s,  filter by XHR:

    <img src="public/dev_tools.png" alt="dev_tools"/>
    
3. Select random request from list (F5 if it’s empty) and copy **authorization** from request:
    
    <img src="public/authorization.png" alt="authorization"/>
    
### cookie

Copy your cookies from request(like authorization):

<img src="public/cookies.png" alt="cookies"/>

### minX, minY

The Top Left Corner Co-Ordinate of the Map Area to be searched.

### maxX, maxY

The Bottom Right Corner Co-Ordinate of the Map Area to be searched.

### startX, startY

Position of search (your village or cap, probably), calculate distance (for sorting oases closest to you)

<img src="public/map_min_max.png" alt="map_min_max"/>

## Install
Run `yarn install` for installation package dependencies.

## Start

Run command `npm run clean` clean data directory and create files.
After that run `npm run collect` (collecting oases position) and wait… 
It will take a lot of time (depends on your config (minMap, maxMap, delayMin, delayMax) etc).

<img src="public/npm_collect.png" alt="npm_collect"/>

After execution `npm run collect` run  `npm run find`.

<img src="public/npm_find.png" alt="npm_find"/>

Result in excel file: `data/elephant_*.xlsx`

|  x  |  y  | Elephant | Another animal | hasCrocodile | hasTiger | totalAnimal |
| :---: | :---: | :--------: | :--------------: | :------------: | :--------: | :-----------: |
| -18 |  5  | 7 | 6 | 1 | 1 | 141 |
| -14 |  3  | 4 | 5 | 0 | 0 | 34 |
| -42 |  14 | 3 | 4 | 0 | 0 | 77 |
| -48 |  -7 | 3 | 4 | 0 | 0 | 84 |

<img src="public/result_oasis.png" alt="result_oasis"/>


## Technologies:


 - **JavaScript**;
 - **NodeJS**;
 - **Cheerio**.

## Author

*  [**Mykhavko Ivan**](https://github.com/Tegos)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
