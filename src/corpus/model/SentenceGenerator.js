class SentenceGenerator {
  constructor(markovChain) {
    this.markovChain = markovChain;
  }

  /**
   * Generates a list of words from populated markov chain
   */
  generateSentences = (count, length) => {
    var sentences = [];
    for (var i = 0; i < count; i++) {
      var startNode = this.markovChain.getRandomStart();
      sentences.push(
        this.generateSentence(
          length - this.markovChain.getMarkovOrder(),
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
    var next = this.markovChain.getNextRandomNode(node);

    if (next == null) {
      return sentence;
    }

    sentence = sentence.concat(" " + next);
    return this.generateSentence(
      length - this.markovChain.getMarkovOrder(),
      next,
      sentence
    );
  };
}

export default SentenceGenerator;
