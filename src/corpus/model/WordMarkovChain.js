import NodeMatrix from "./NodeMatrix";
import WordGenerator from "./WordGenerator";

class WordMarkovChain {
  generateLetterCorpus = (corpus, markovOrder) => {
    let markovChain = new NodeMatrix(markovOrder);
    let pos = 0;
    while (pos < corpus.length) {
      pos = this.findNextWord(markovChain, corpus, pos);
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

const wordCorpus = new WordMarkovChain();

export default wordCorpus;
