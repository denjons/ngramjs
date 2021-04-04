import NodeMatrix from "./NodeMatrix";
import SentenceMarkovChain from "./SentenceMarkovChain";

class SentenceCorpus {
  generateMarkovChain = (text, markovOrder) => {
    let nodeMatrix = new NodeMatrix();
    let pos = 0;
    while (pos < text.length) {
      pos = this.findNextWord(nodeMatrix, text, pos);
    }
 
    return new SentenceMarkovChain(nodeMatrix, markovOrder);
  };

  findNextWord = (nodeMatrix, text, pos) => {
    let range = pos;
    while (range < text.length && this.isSkipCharacter(text, range)) {
      range++;
    }

    if (range > pos) {
      nodeMatrix.addNode(text.substring(pos, range));
    }
    if (this.isEndCharacter(text, range)) {
      nodeMatrix.startNewWord();
    }
    return range + 1;
  };

  isEndCharacter(text, pos) {
    return text[pos] === "." || text[pos] === "!" || text[pos] === "?";
  }

  isSkipCharacter(text, pos) {
    return (
      text[pos] !== " " &&
      text[pos] !== "\n" &&
      text[pos] !== "." &&
      text[pos] !== "!" &&
      text[pos] !== "?"
    );
  }
}

const sentenceCorpus = new SentenceCorpus();

export default sentenceCorpus;
