import MarkovChain from "./MarkovChain";
import WordGenerator from "./WordGenerator";

class WordCorpus {
  generateLetterCorpus = (text, markovOrder) => {
    let markovChain = new MarkovChain(markovOrder);
    let pos = 0;
    while (pos < text.length) {
      pos = this.findNextWord(markovChain, text, pos);
      markovChain.startNewWord();
    }
    return new WordGenerator(markovChain);
  };

  findNextWord = (markovChain, text, pos) => {
    let range = pos;
    let markovOrder = markovChain.getMarkovOrder();
    while (
      range < Math.min(pos + markovOrder, text.length) &&
      this.isSkipCharacter(text, range)
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
    return range + 1;
  };

  isSkipCharacter(text, pos) {
    return (
      text[pos] !== " " &&
      text[pos] !== "\n" &&
      text[pos] !== "." &&
      text[pos] !== "," &&
      text[pos] !== "!" &&
      text[pos] !== "?"
    );
  }
}

const wordCorpus = new WordCorpus();

export default wordCorpus;
