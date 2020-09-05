import React, { Component } from "react";
import "./App.css";
import CorpusText from "./corpus/components/CorpusText";
import GenerateButton from "./corpus/components/GenerateButton";
import ResultList from "./result/components/ResultList";
import SavedResultList from "./result/components/SavedResultList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
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
        <Row className="header-row">
          <header className="app-header col-12">
            <Row className="app-header-content justify-content-left">
              <div className="d-none d-md-block offset-xs-4 col-xs-4 offset-sm-4 col-sm-4 offset-md-0 col-md-4 offset-lg-0 col-lg-4 offset-xl-0 col-xl-4">
                <Row className="justify-content-center">
                  <div className="title-container col-12">
                    <h1 className="app-title-n glow">[n]</h1>
                    <h1 className="app-title-gram glow">gram</h1>
                  </div>
                </Row>
              </div>
              <div className="corpus-container col-xs-12 col-sm-12 offset-md-1 col-md-6 offset-lg-1 col-lg-6 offset-xl-0 col-xl-7">
                <CorpusText />
              </div>
              <Row className="banner col-12 justify-content-left">
                <div className="settings-container d-none d-md-block col-12 col-md-5 col-lg-5">
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
                <div className="col-12 col-md-4 col-lg-4 col-xl-2">
                  <GenerateButton />
                </div>
              </Row>
            </Row>
          </header>
        </Row>
        <Row className="result-container justify-content-center">
          <div className="col-12 offset-md-1 col-md-3 offset-lg-1 col-lg-3 offset-xl-0 col-xl-3">
            <SavedResultList />
          </div>
          <div className="col-12 offset-md-1 col-md-7 offset-lg-1 col-lg-7 offset-xl-1 col-xl-7">
            <ResultList />
          </div>
        </Row>
      </Container>
    );
  }
}

export default App;
