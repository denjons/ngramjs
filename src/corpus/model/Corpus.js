
class Corpus{

    constructor(text, markovOrder){
        this.text = text;
        this.markovOrder = markovOrder;
        this.markovChain = new MarkovChain(markovOrder);
    }

    generateCorpus = () => {
        this.text.split(' ')
            .filter(elm => elm.length >= this.markovOrder)
            .forEach(elm => this.splitWord(elm));
        console.log(this.markovChain);
    }

    splitWord = (word) => {
        // Should be replaced with split string 
        // into array and add each to markovChain
        while(word.length > 0){
            var node = "";
            if(word.length >= this.markovOrder){
                node = word.slice(0, this.markovOrder);
                word = word.slice(this.markovOrder, word.length);
            }else{
                node = word;
                word = "";
            }
            this.markovChain.addNode(node);
        }
        this.markovChain.reset();
    }

    getMarkovChain = () => {
        return this.markovChain;
    }
}

class MarkovChain{
    
    constructor(markovOrder){
        this.markovOrder = markovOrder;
        this.nodeChain = new Map();
        this.workingSet = null;
    }
    
    addNode = (node) => {
        
        if(this.nodeChain.get(node) == null){
            this.nodeChain.set(node, new Map());
        }

        if(this.workingSet != null){
            var rating = (this.workingSet.get(node) || 0) + 1;
            this.workingSet.set(node, rating);
        }

        this.workingSet = this.nodeChain.get(node);

    }

    reset = () => {
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
        var nodes = Array.from(this.nodeChain.keys());
        return nodes[Math.round((nodes.length - 1) * Math.random())];
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

export default Corpus;
