'use strict';

class TypeEffect {
  currentText = '';
  wordIndex = 0;
  isDeleting = false;

  constructor(words, nodeContainer, delay = 200, finalDelay = 2000) {
    this.words = words;
    this.finalDelay = +finalDelay;
    this.delay = +delay;
    this.intDelay = +delay;
    this.nodeContainer = nodeContainer;
    this.deleteDelay = this.delay / 1.5;
    this.type();
  }

  wait(s) {
    return new Promise(res => {
      setTimeout(res, s);
    });
  }

  async type() {
    const current = this.wordIndex % this.words.length;
    const currentWord = this.words[current];

    if (this.isDeleting) {
      this.currentText = currentWord.slice(0, this.currentText.length - 1);
    }
    if (!this.isDeleting) {
      this.currentText = currentWord.slice(0, this.currentText.length + 1);
    }

    this.nodeContainer.textContent = this.currentText;

    this.delay = this.isDeleting ? this.deleteDelay : this.intDelay;

    if (!this.currentText && this.isDeleting) {
      this.wordIndex++;
      this.isDeleting = false;
      this.delay = 500;
    }
    if (this.currentText === currentWord && !this.isDeleting) {
      this.isDeleting = true;
      this.delay = this.finalDelay;
    }
    await this.wait(this.delay);
    this.type();
  }
}

export default TypeEffect;
