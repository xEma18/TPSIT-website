import 'core-js/stable';
import 'regenerator-runtime/runtime';

import TypeWriter from './TypeWriter';

// DOM
const textContainer = document.querySelector('.text');

// Words
const words = ['Fratellanza', 'Progresso', 'Civiltà', 'Presente', 'Futuro'];

const typingEffect = new TypeWriter(words, textContainer, 200, 2000);

const names = ['emanuele', 'carlo', 'gino', 'michele'];

// Quite bad performing and not too real-world
const capitalize = function (...names) {
  const capitalNames = names
    .map(n => n.toLowerCase())
    .map(n => {
      const splitName = n.split(' ');
      return splitName
        .map(word => word.replace(word[0], word[0].toUpperCase()))
        .join(' ');
    });
  console.log(capitalNames);
};

// Real world use-case
const capitalizeReal = name =>
  name
    .split(' ')
    .map(word => word.replace(word[0], word[0].toUpperCase()))
    .join(' ');

capitalize('gino', 'michele di santo', 'EMANUELE di giacomo', 'anthony'); //output: ['Gino', 'Michele Di Santo', 'Emanuele Di Giacomo', 'Anthony']
capitalize(...names);

console.log(capitalizeReal('emanuele di giacomo'));
const capitalizedNames = names.map(capitalizeReal);
console.log(capitalizedNames);
