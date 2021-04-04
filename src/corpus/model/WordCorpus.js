import NodeMatrix from "./NodeMatrix";
import WordMarkovChain from "./WordMarkovChain";

class WordCorpus {

  generateMarkovChain = (corpus, markovOrder) => {
    let nodeMatrix = new NodeMatrix();
    let pos = 0;
    while (pos < corpus.length) {
      pos = this.findNextWord(nodeMatrix, corpus, pos, markovOrder);
      nodeMatrix.startNewWord();
    }
    return new WordMarkovChain(nodeMatrix, markovOrder);
  };

  findNextWord = (nodeMatrix, text, pos, markovOrder) => {
    let range = pos;
    while (
      range < Math.min(pos + markovOrder, text.length) &&
      this.isSkipCharacter(text, range)
    ) {
      // add current range everytime it passes markov order, then move pos up to that point
      range++;
      if ((range - pos) % markovOrder === 0) {
        nodeMatrix.addNode(text.substring(pos, range));
        pos = range;
      }
    }
    // add any last range to markov chain if it was increased from pos.
    if (range > pos) {
      nodeMatrix.addNode(text.substring(pos, range));
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
