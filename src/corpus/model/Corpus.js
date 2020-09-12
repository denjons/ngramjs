import MarkovChain from "./MarkovChain";
import WordGenerator from "./WordGenerator";
import SentenceGenerator from "./SentenceGenerator";

class Corpus {
  generateLetterCorpus = (text, markovOrder) => {
    let markovChain = new MarkovChain(markovOrder);
    let pos = 0;
    while (pos < text.length) {
      // take a range of text from current pos until hitting a word-ender/divider, like spaces and dots, etc.
      let range = pos;
      while (
        range < Math.min(pos + markovOrder, text.length) &&
        text[range] !== " "
      ) {
        // add current range everytime it passes markov order, then move pos up to that point
        range++;
        if ((range - pos) % markovOrder === 0) {
          markovChain.addNode(text.substring(pos, range));
          pos = range;
        }
      }
      // add any last range to markov chain if it was increased from pos.
      if (range > pos) {
        markovChain.addNode(text.substring(pos, range));
      }
      markovChain.startNewWord();
      pos = range + 1;
    }
    return new WordGenerator(markovChain);
  };

  generateWordCorpus = (text, markovOrder) => {
    let markovChain = new MarkovChain(markovOrder);
    let pos = 0;
    let addedWords = 0;
    while (pos < text.length) {
      let range = pos;
      while (
        range < text.length &&
        text[range] !== " " &&
        text[range] !== "." &&
        text[range] !== "!" &&
        text[range] !== "?"
      ) {
        range++;
      }
      // add any last range to markov chain if it was increased from pos.
      if (range > pos) {
        markovChain.addNode(text.substring(pos, range + 1));
        addedWords++;
      }
      if (addedWords % markovOrder === 0) {
        markovChain.startNewWord();
      }
      pos = range + 1;
    }
    return new SentenceGenerator(markovChain);
  };
}

const corpus = new Corpus();

export default corpus;
