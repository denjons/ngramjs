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
    while (
      range < text.length &&
      text[range] !== " " &&
      text[range] !== "." &&
      text[range] !== "!" &&
      text[range] !== "?"
    ) {
      range++;
    }

    if (range > pos) {
      markovChain.addNode(text.substring(pos, range));
    }
    if (text[range] === "." || text[range] === "!" || text[range] === "?") {
      markovChain.startNewWord();
    }
    return range + 1;
  };
}

const sentenceCorpus = new SentenceCorpus();

export default sentenceCorpus;
