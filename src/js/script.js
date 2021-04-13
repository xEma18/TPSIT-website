import 'core-js/stable';
import 'regenerator-runtime/runtime';

import TypeWriter from './TypeWriter';
import { getJSON, markup } from './utils';
import { API_URL, EU_NATIONS } from './config';

console.log(EU_NATIONS);

// DOM
const textContainer = document.querySelector('.text');
const vaccineContainer = document.querySelector('.section-grid');
const navbar = document.querySelector('.list');
const discoverBtn = document.querySelector('.discover-btn');

// Words
const words = ['Fratellanza', 'Progresso', 'Civiltà', 'Presente', 'Futuro'];

new TypeWriter(words, textContainer, 200, 2000);

// State
const state = {
  nations: [],
};

const formatter = new Intl.NumberFormat('it-IT');

// Logic
const generateMarkup = function (nations) {
  const generatedMarkup = nations
    .map(el => {
      let render = markup.replace(/{%%NAME%%}/g, el.country);
      render = render.replace(
        /{%%TOTAL_VACCINATIONS%%}/g,
        formatter.format(el.total)
      );
      render = render.replace(
        /{%%DAILY_VACCINATIONS%%}/g,
        formatter.format(el.daily)
      );

      return render;
    })
    .join('');

  vaccineContainer.innerHTML = generatedMarkup;
};

const filterNations = function (nations) {
  const arrNations = Object.entries(nations);

  const filterNations = arrNations
    .filter(el => EU_NATIONS.includes(el[1].location))
    .map(el => {
      return {
        country: el[1].location,
        total: +el[1].total_vaccinations,
        daily: +el[1].new_vaccinations_smoothed,
      };
    });
  filterNations.sort((a, b) => (a.total > b.total ? -1 : 1));

  state.nations = filterNations;
};

const getVaccineData = async function () {
  try {
    const data = await getJSON(API_URL);

    filterNations(data);
    generateMarkup(state.nations);
  } catch (error) {
    console.error(`${error.message} 🧨`);
  }
};

getVaccineData();
setTimeout(getVaccineData, 3600);

// DOM handlers
navbar.addEventListener('click', function (e) {
  e.preventDefault();

  const target = e.target.closest('a');
  const { href } = target;

  if (!target) return;

  console.log(href);

  const goTo = document.querySelector(`#${href.split('/').slice(-1)[0]}`);
  goTo.scrollIntoView({ behavior: 'smooth' });
});

discoverBtn.addEventListener('click', function (e) {
  e.preventDefault();

  document.querySelector('#home-a').scrollIntoView({ behavior: 'smooth' });
});
