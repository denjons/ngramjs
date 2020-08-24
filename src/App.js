import React, { Component } from "react";
import "./App.css";
import CorpusText from "./corpus/components/CorpusText";
import Corpus from "./corpus/model/Corpus";
import ResultList from "./result/components/list";
import TextUtils from "./utils/TextUtils";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      wordLength: 7,
    };
  }

  markovOrder = 2;
  wordCount = 10;
  corpus = null;

  render() {
    return (
      <Container fluid>
        <Row>
          <header className="App-header col-12">
            <div>
              <div>
                <h1 className="App-title-n glow">[n]</h1>
                <h1 className="App-title-gram glow">gram</h1>
              </div>
            </div>
          </header>
        </Row>
        <Row className="banner justify-content-left">
          <div className="settings-container col-12 col-mid-5 col-lg-5">
            <label htmlFor="input-word-length">Word length</label>
            <input
              className="settings-input-word-length"
              name="input-word-length"
              id="input-word-length"
              type="number"
              value={this.state.wordLength}
              max="20"
              min="3"
              onChange={this.changeWordLength}
            />
          </div>
          <div className="col-12 col-mid-2 col-lg-2">
            <button
              className="button-generate col-12"
              onClick={this.generateCorpus}
            >
              Generate
            </button>
          </div>
        </Row>
        <Row className="justify-content-center">
          <div className="col-12 mol-mid-10 col-lg-10">
            <CorpusText onChangeFunction={this.updateText} />
          </div>
        </Row>
        <Row>
          <div>
            <ResultList words={this.state.words}></ResultList>
          </div>
        </Row>
      </Container>
    );
  }

  changeWordLength = (elm) => {
    var newValue = elm.target.value;
    console.log("New value:" + newValue);
    if (newValue <= 20 && newValue >= 3) {
      this.setState((oldState) => ({
        words: oldState.words,
        wordLength: newValue,
      }));
    }
  };

  generateWords = () => {
    while (this.state.words.length > 0) {
      this.state.words.pop();
    }
    this.corpus
      .getMarkovChain()
      .generateWords(this.wordCount + 100, this.state.wordLength)
      .forEach((element) => this.state.words.push(element));
    this.setState({
      words: TextUtils.takeLargestWords(this.state.words, this.wordCount),
    });
  };

  generateCorpus = () => {
    this.corpus = new Corpus(this.state.text, this.markovOrder);
    this.corpus.generateLetterCorpus();
    this.generateWords();
  };

  updateText = (event) => {
    var val = event.target.value;
    this.setState((oldState) => ({
      words: oldState.words,
      text: val,
    }));
  };
}

export default App;
