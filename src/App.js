import React, { Component } from "react";
import "./App.css";
import CorpusText from "./corpus/components/CorpusText";
import ResultList from "./result/components/ResultList";
import SavedResultList from "./result/components/SavedResultList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import generateClickEventSubject from "./corpus/model/GenerateClickEventSubject";
import configurationEventSubject from "./corpus/model/ConfigurationEventSubject";
import WordGeneratorService from "./corpus/service/WordGeneratorService";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordLength: 7,
      markovOrder: 2,
      wordCount: 10,
    };

    this.WordGeneratorService = new WordGeneratorService(this.getConfig());
  }

  onGenerateButtonClicked(event) {
    console.info("clicked");
    generateClickEventSubject.notify(event);
  }

  changeWordLength = (elm) => {
    var newValue = elm.target.value;
    if (newValue <= 20 && newValue >= 3) {
      this.setState((oldState) => ({
        wordLength: newValue,
        markovOrder: oldState.markovOrder,
        wordCount: oldState.wordCount,
      }));
      configurationEventSubject.notify(this.getConfig());
    }
  };

  getConfig = () => {
    return {
      wordLength: this.state.wordLength,
      markovOrder: this.state.markovOrder,
      wordCount: this.state.wordCount,
    };
  };

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
              onClick={(e) => this.onGenerateButtonClicked(e)}
            >
              Generate
            </button>
          </div>
        </Row>
        <Row className="justify-content-center">
          <div className="col-12 col-mid-3 col-lg-3">
            <ResultList />
            <SavedResultList />
          </div>
          <div className="col-12 mol-mid-7 col-lg-7">
            <CorpusText />
          </div>
        </Row>
      </Container>
    );
  }
}

export default App;
