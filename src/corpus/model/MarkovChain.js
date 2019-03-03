class MarkovChain{
    
    constructor(markovOrder){
        this.markovOrder = markovOrder;
        this.nodeChain = new Map();
        this.workingSet = null;
        this.startNodes = [];
    }
    
    addNode = (node) => {
        
        if(this.nodeChain.get(node) == null){
            this.nodeChain.set(node, new Map());
        }

        if(this.isNewWord()){
            this.startNodes.push(node);
        }else{
            var rating = (this.workingSet.get(node) || 0) + 1;
            this.workingSet.set(node, rating);
        }

        this.workingSet = this.nodeChain.get(node);

    }

    isNewWord = () => {
        return this.workingSet == null;
    }

    startNewWord = () => {
        this.workingSet = null;
    }

    generateWords = (count, length) => {
        var words = [];
        for(var i = 0; i < count; i++){
            var startNode = this.genarateStartNode();
            words.push(this.generateWord(length - this.markovOrder, startNode, startNode));
        }
        return words;
    }


    genarateStartNode = () => {
        return this.startNodes[Math.floor((this.startNodes.length) * Math.random())];
    }

    generateWord = (length, node, word) => {
        if (length <= 0){
            return word;
        }
        var nextNodes = this.nodeChain.get(node);
        if(nextNodes == null || Array.from(nextNodes.keys()).length === 0){
            return word;
        }
        var entries = Array.from(nextNodes.keys());
        var nextNode = entries[Math.round((entries.length - 1) * Math.random())];
        word = word.concat(nextNode);
        return this.generateWord(length - this.markovOrder, nextNode, word)
    }
}

export default MarkovChain;