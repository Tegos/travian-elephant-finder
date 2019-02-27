# Travian Animals Finder

<img src="public/nature.png" alt="nature"/><br/>

The tool for analysis oases (free or occupied) and searching animals (Elephant and etc).


Tested in **Fire and Sand** and **Legends**.

<p align="center">
<img src="public/fire_and_sand.png" alt="fire_and_sand"/><br/>
<img src="public/legends_logo_black.png" alt="legends_logo_black"/>
</p>


## How to use

## Config

Set correct fields in `config.js` 

### ajaxToken

1. Open map, https://ts6.travian.com/karte.php

    <img src="public/map.png" alt="map"/>

2. Open DevTools(F12 Chrome),  Network tab’s,  filter by XHR:

    <img src="public/dev_tools.png" alt="dev_tools"/>
    
3. Select random request from list (F5 is it’s empty) and copy **ajaxtoken** from request:
    
    <img src="public/ajaxToken.png" alt="ajaxToken"/>
    
### cookie

Copy your cookies from request(like ajaxToken):

<img src="public/cookies.png" alt="cookies"/>

### minMap, maxMap

Limit for searching (like part of the map or your coordinates).

### animal

Name of searching animal

### startX, startY

Position of search (your village or cap, probably), calculate distance (for sorting oases closest to you)

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