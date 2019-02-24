import React, { Component } from 'react';
import './App.css';
import CorpusText from './corpus/components/CorpusText'
import Corpus from './corpus/model/Corpus'
import ResultList from './result/components/listItem'
import TextUtils from './utils/TextUtils';

class App extends Component {

  markovOrder = 2;
  wordCount = 7;
  wordLength = 10;
  corpus = null;
  words = [];
  state = {
    text: ""
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>[n]gram</h1>
        </header>
        <CorpusText onChangeFunction={this.updateText}/> 
        <button onClick={this.generateCorpus}>Generate</button>  
        <div>
          <ResultList words={this.words}></ResultList>
        </div>
      </div>
    );
  }

  generateWords = () => {
    this.words = this.corpus.getMarkovChain().generateWords(this.wordCount + 100, this.wordLength);
    console.log(TextUtils.sortWords(this.words, this.wordCount));
  }

  generateCorpus = () => {
    console.log("generatoing text");
    console.log(this.state.text);
    this.corpus = new Corpus(this.state.text, this.markovOrder);
    this.corpus.generateCorpus();
    this.generateWords();

  }

  updateText = (event) => {
    var val = event.target.value;
    this.setState( (oldState)  => ({
      words: oldState.words,
      text: val
    }));
    console.log(this.state.text );
  }

}



export default App;
