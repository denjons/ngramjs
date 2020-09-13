import MarkovChain from "./MarkovChain";
import SentenceGenerator from "./SentenceGenerator";

class SentenceCorpus {
  generateWordCorpus = (text, markovOrder) => {
    let markovChain = new MarkovChain(markovOrder);
    let pos = 0;
    while (pos < text.length) {
      pos = this.findNextWord(markovChain, text, pos);
    }
    console.log(markovChain);
    return new SentenceGenerator(markovChain);
  };

  findNextWord = (markovChain, text, pos) => {
    let range = pos;
    while (range < text.length && this.isSkipCharacter(text, range)) {
      range++;
    }

    if (range > pos) {
      markovChain.addNode(text.substring(pos, range));
    }
    if (this.isEndCharacter(text, range)) {
      markovChain.startNewWord();
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
