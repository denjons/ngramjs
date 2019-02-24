
class MarkovChain2{
    nodeChain = new Map();
    workingSet = null;

    addNode = (node) => {
        
        if(this.nodeChain.get(node) == null){
            this.nodeChain.set(node, new Map());
        }

        if(this.workingSet != null){
            var rating = this.workingSet.get(node) + 1;
            this.workingSet.set(node, rating);
        }

        this.workingSet = this.nodeChain.get(node);

    }

    reset = () => {
        this.workingSet = null;
    }

}