class SentenceMarkovChain {
  constructor(nodeMatrix, markovOrder) {
    this.markovOrder = markovOrder;
    this.nodeMatrix = nodeMatrix;
  }

  /**
   * Generates a list of words from populated NodeMatrix
   */
  generateSentences = (count, length) => {
    var sentences = [];
    for (var i = 0; i < count; i++) {
      var startNode = this.nodeMatrix.getRandomStart();
      sentences.push(
        this.generateSentence(
          length - this.markovOrder,
          startNode,
          startNode
        )
      );
    }
    return sentences;
  };

  /**
   * Sub-routine for generate words
   */
  generateSentence = (length, node, sentence) => {
    if (length <= 0) {
      return sentence;
    }
    var next = this.nodeMatrix.getNextRandomNode(node);

    if (next == null) {
      return sentence;
    }

    sentence = sentence.concat(" " + next);
    return this.generateSentence(
      length - this.markovOrder,
      next,
      sentence
    );
  };
}

export default SentenceMarkovChain;
