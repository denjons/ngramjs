import React, { Component } from 'react';
import './App.css';
import CorpusText from './corpus/components/CorpusText'
import Corpus from './corpus/model/Corpus'
import ResultList from './result/components/list'
import TextUtils from './utils/TextUtils';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      words: [],
      wordLength: 7
    };
  }

  markovOrder = 2;
  wordCount = 10;
  corpus = null;

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <div>
              <h1 className="App-title-n">[n]</h1>
              <h1 className="App-title-gram">gram</h1>
            </div>
          </div>
        </header>
        <div>
          <CorpusText onChangeFunction={this.updateText}/>
        </div>
        <div className="settings-container">
          <label for="input-word-length" >Word length</label>
          <input className="settings-input-word-length" name="input-word-length" id="input-word-length" type="number" value={this.state.wordLength} max="20" min="3" onChange={this.changeWordLength} />
        </div>
        <div>
          <button className='button-generate' onClick={this.generateCorpus}>Generate</button> 
        </div>
        <div>
          <ResultList words={this.state.words}></ResultList>
        </div>
      </div>
    );
  }

  changeWordLength = (elm) =>{
    var newValue = elm.target.value;
    console.log("New value:" + newValue);
    if(newValue <= 20 && newValue >= 3){
      this.setState((oldState) => ({
        words: oldState.words,
        wordLength: newValue
      }));
    }
  }
  
  generateWords = () => {
    while(this.state.words.length > 0){
      this.state.words.pop();
    }
    this.corpus.getMarkovChain().generateWords(this.wordCount + 100, this.state.wordLength)
      .forEach(element => this.state.words.push(element));
    this.setState({
      words: TextUtils.takeLargestWords(this.state.words, this.wordCount)
    });
    console.log(this.state.words);
  }

  generateCorpus = () => {
    console.log("generatoing text");
    console.log(this.state.text);
    this.corpus = new Corpus(this.state.text, this.markovOrder);
    this.corpus.generateLetterCorpus();
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
