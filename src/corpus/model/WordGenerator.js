/**
 *  Generates words from populated markov chain
 */
class WordGenerator {
  constructor(nodeMatrix, markovOrder) {
    this.markovOrder = markovOrder;
    this.nodeMatrix = nodeMatrix;
  }

  /**
   * Generates a list of words from populated markov chain
   */
  generateWords = (count, length) => {
    var words = [];
    for (var i = 0; i < count; i++) {
      this.count = 0;
      var startNode = this.nodeMatrix.getRandomStart();
      words.push(
        this.generateWord(
          length - this.markovOrder,
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
    var next = this.nodeMatrix.getNextRandomNode(node);

    if (next == null) {
      return word;
    }

    word = word.concat(next);
    return this.generateWord(
      length - this.markovOrder,
      next,
      word
    );
  };
}

export default WordGenerator;
