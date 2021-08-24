import jsdom from 'jsdom';
import Utils from './utils.js';
import axios from 'axios';
const { JSDOM } = jsdom;

export default function getTodayMenu(data) {
    data.forEach((elem) => {
        getMenu(elem.url, elem.menu, elem.name).then(res => console.log(res));
    });
}

async function getMenu(url, menu, name) {
    /**
     * Nastavil som responseType a reponseEncoding, dôvodom je to, že jeden z webov 
     * má nejaký divný encoding a consola nepoznala znaky s diakritikou, v konečnom
     * dôsledku to len zabezpečí väčšiu všestrannosť.
     **/
    const html = await axios.request({
        method: 'GET',
        url: url,
        responseType: 'arraybuffer',
        reponseEncoding: 'binary'
    });

    const dom = new JSDOM(html.data);

    // Je možné prijať jeden alebo viacero html elementov a vybrať z nich raw text
    const output = [];
    Array.from(dom.window.document.querySelectorAll(menu)).forEach((elem) => {
        output.push(elem.textContent);
    });

    return formatMenu(Utils.normalizeText(output.join('')), name.toUpperCase());
};

function formatMenu(output, name) {
    const menuArray = output.split(/(?<=Kč)|(?<=2021)/g);
    menuArray.forEach((elem, index) => { menuArray[index] = elem.trim() });

    return `${'-'.repeat(40)}\n${name}\n${'-'.repeat(40)}\n${getExactMenu(menuArray).join('\n')}`;
}

function getExactMenu(menuArray) {
    const dateElement = menuArray.find((elem) => elem.replace(/ /g, '').includes(Utils.getDateToday()));

    if (!dateElement) return ['Menu pre tento deň nebolo nájdené'];

    const dateIndex = menuArray.indexOf(dateElement);

    for (let i = dateIndex + 1; i < menuArray.length; i++) {
        if (menuArray[i].match(/(\d{2})(.|. )(\d{1,2}(.|. )(\d{4}))/g) || (i + 1 === menuArray.length)) {
            const menu = menuArray.slice(dateIndex + 1, i);
            return menu.length > 0 ? menu : ['Menu pre tento deň nebolo nájdené'];
        }
    }
}
