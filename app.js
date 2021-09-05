//Git pull request test 3

import getTodayMenu from './menu.js';

const data = [
    {
        name: 'Pivnice u Čápa',
        url: 'https://www.pivnice-ucapa.cz/denni-menu.php',
        menu: '.listek'
    },
    {
        name: 'Suzies Steak Pub',
        url: 'http://www.suzies.cz/poledni-menu',
        menu: '.menu-pages'
    },
    {
        name: 'VERONI coffee & chocolate',
        url: 'https://www.menicka.cz/4921-veroni-coffee--chocolate.html',
        menu: '.menicka'
    }
];

getTodayMenu(data);
