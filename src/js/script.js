import 'core-js/stable';
import 'regenerator-runtime/runtime';

import TypeWriter from './TypeWriter';

// DOM
const textContainer = document.querySelector('.text');

// Words
const words = ['Fratellanza', 'Progresso', 'Civiltà', 'Presente', 'Futuro'];

const typingEffect = new TypeWriter(words, textContainer, 200, 2000);
