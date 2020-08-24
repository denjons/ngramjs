class MarkovChain {
  constructor(markovOrder) {
    this.markovOrder = markovOrder;
    this.nodeChain = new Map();
    this.workingSet = null;
    this.startNodes = [];
  }

  addNode = (node) => {
    if (this.nodeChain.get(node) == null) {
      this.nodeChain.set(node, []);
    }

    if (this.isNewWord()) {
      this.startNodes.push(node);
    } else {
      this.workingSet.push(node);
    }
    this.workingSet = this.nodeChain.get(node);
  };

  isNewWord = () => {
    return this.workingSet == null;
  };

  startNewWord = () => {
    this.workingSet = null;
  };

  /**
   * Generates a list of words from corpus
   */
  generateWords = (count, length) => {
    var words = [];
    for (var i = 0; i < count; i++) {
      var startNode = this.getRandomElementOf(this.startNodes);
      words.push(
        this.generateWord(length - this.markovOrder, startNode, startNode)
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
    var nextNodes = this.nodeChain.get(node);
    if (nextNodes == null || nextNodes.length === 0) {
      return word;
    }
    var nextNode = this.getRandomElementOf(nextNodes);
    word = word.concat(nextNode);
    return this.generateWord(length - this.markovOrder, nextNode, word);
  };

  getRandomElementOf(list) {
    return list[Math.round((list.length - 1) * Math.random())];
  }
}

export default MarkovChain;
