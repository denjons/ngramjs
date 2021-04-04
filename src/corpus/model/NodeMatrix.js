class NodeMatrix {
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

  getRandomStart = () => {
    return this.getRandomElementOf(this.startNodes);
  };

  getNextRandomNode = (node) => {
    var nextNodes = this.nodeChain.get(node);

    if (nextNodes == null || nextNodes.length === 0) {
      return null;
    }
    return this.getRandomElementOf(nextNodes);
  };

  getRandomElementOf(list) {
    return list[Math.round((list.length - 1) * Math.random())];
  }

  getMarkovOrder = () => {
    return this.markovOrder;
  };
}

export default NodeMatrix;
