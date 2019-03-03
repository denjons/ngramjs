import MarkovChain from './MarkovChain';

class Corpus{

    constructor(text, markovOrder){
        this.text = text;
        this.markovOrder = markovOrder;
        this.markovChain = new MarkovChain(markovOrder);
    }

    /**
     * Generate corpus for sentences
     */
    generateWordCorpus = () => {
        // should be replaced with something like .split('\.|!|\?')
        this.text.split('. ')
            .flatMap(elm => elm.split('! '))
            .flatMap(elm => elm.split('? '))
            .forEach(elm => {
                console.log("elm: "+elm);
                elm.trim().split(' ')
                    .forEach(node => this.markovChain.addNode(node));
                this.markovChain.startNewWord();
            });
             
    }

    /**
     * Generate corpus for words
     */
    generateLetterCorpus = () => {
        this.text.split(' ')
            .filter(elm => elm.length >= this.markovOrder)
            .forEach(elm => this.splitWord(elm));
        console.log(this.markovChain);
    }


    /**
     * Sub-routine for word corpus
     */
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
        this.markovChain.startNewWord();
    }

    getMarkovChain = () => {
        return this.markovChain;
    }
}

export default Corpus;
