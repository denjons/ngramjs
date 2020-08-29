import MarkovChain from "./MarkovChain";

class Corpus {
  constructor(text, markovOrder) {
    this.text = text;
    this.markovOrder = markovOrder;
    this.markovChain = new MarkovChain(markovOrder);
  }

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
  generateLetterCorpus = () => {
    this.text
      .split(" ")
      .map((s) => s.replace(/[\W_]+/g, "").trim())
      .filter((elm) => elm.length >= this.markovOrder)
      .forEach((elm) => this.splitWord(elm));
  };

  /**
   * Sub-routine for word corpus
   */
  splitWord = (word) => {
    let pos = 0;
    while (pos < word.length) {
      let range = Math.min(word.length - pos, this.markovOrder);
      this.markovChain.addNode(word.substring(pos, pos + range));
      pos += this.markovOrder;
    }
    this.markovChain.startNewWord();
  };

  getMarkovChain = () => {
    return this.markovChain;
  };
}

export default Corpus;
