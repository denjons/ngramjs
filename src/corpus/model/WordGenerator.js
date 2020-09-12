/**
 *  Generates words from populated markov chain
 */
class WordGenerator {
  constructor(MarkovChain) {
    this.markovChain = MarkovChain;
  }

  /**
   * Generates a list of words from populated markov chain
   */
  generateWords = (count, length) => {
    var words = [];
    for (var i = 0; i < count; i++) {
      this.count = 0;
      var startNode = this.markovChain.getRandomStart();
      words.push(
        this.generateWord(
          length - this.markovChain.getMarkovOrder(),
          startNode,
          startNode
        )
      );
    }
    return words;
  };

  /**
   * Sub-routine for generate words
   */
  generateWord = (length, node, word) => {
    if (length <= 0) {
      return word;
    }
    var next = this.markovChain.getNextRandomNode(node);

    if (next == null) {
      return word;
    }

    word = word.concat(next);
    return this.generateWord(
      length - this.markovChain.getMarkovOrder(),
      next,
      word
    );
  };
}

export default WordGenerator;
