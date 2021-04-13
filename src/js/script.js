import 'core-js/stable';
import 'regenerator-runtime/runtime';

import TypeWriter from './TypeWriter';
import { getJSON } from './utils';
import { API_URL } from './config';

// DOM
const textContainer = document.querySelector('.text');

// Words
const words = ['Fratellanza', 'Progresso', 'Civiltà', 'Presente', 'Futuro'];

// const typingEffect = new TypeWriter(words, textContainer, 200, 2000);

const getVaccineData = async function () {
  try {
    const data = await getJSON(API_URL);

    console.log(data);
  } catch (error) {}
};
// getVaccineData();
