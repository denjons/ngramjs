import MarkovChain from "./MarkovChain";

class Corpus {
  /**
   * Generate corpus for sentences
   */
  generateWordCorpus = () => {
    this.text
      .split(" ")
      .map((s) => s.replaceAll("/W/g", ""))
      .filter((s) => s.length() > this.markovOrder)
      .forEach((elm) => {
        this.markovChain.addNode(elm.trim());
        this.markovChain.startNewWord();
      });
  };

  /**
   * Generate corpus for words
   */
  generateLetterCorpus = (text, markovOrder) => {
    let markovChain = new MarkovChain(markovOrder);
    text
      .split(" ")
      .map((s) => s.replace(/[\W_]+/g, "").trim())
      .filter((elm) => elm.length >= markovOrder)
      .forEach((elm) => this.splitWord(elm, markovOrder, markovChain));
    return markovChain;
  };

  /**
   * Sub-routine for word corpus
   */
  splitWord = (word, markovOrder, markovChain) => {
    let pos = 0;
    while (pos < word.length) {
      let range = Math.min(word.length - pos, markovOrder);
      markovChain.addNode(word.substring(pos, pos + range));
      pos += markovOrder;
    }
    markovChain.startNewWord();
  };
}

const corpus = new Corpus();

export default corpus;
