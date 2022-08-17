"use strict";
/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    //loop thru this.words
    //put them into an object where key is word and value is next word
    let markovChains = new Map();
    const words = this.words;

    for (let i = 0; i < words.length; i++) {
      if (i < words.length - 1) {
        //set variables for current word and next word
        markovChains.has(words[i])
          ? markovChains.get(words[i]).push(words[i+1])
          : markovChains.set(words[i], [words[i+1]]);
      } else {
        markovChains.has(words[i])
          ? markovChains.get(words[i]).push(null)
          : markovChains.set(words[i], [null]);
      }
    }

    return markovChains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null

    //create empty array, push each word into array and then convert to string
    const words = this.words;
    let text = [words[0]];

    //push a random word from value array
    let nextWord;
    while (nextWord !== null) {
      nextWord = getRandomItem(this.chains.get(text[text.length - 1]));
      text.push(nextWord);
    }

    return text.join(" ");
  }
}

/** Given an input array, picks a random element from the array and returns. */
function getRandomItem(arr) {

  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);

  // get random item
  const item = arr[randomIndex];

  return item;
}

module.exports = { MarkovMachine };