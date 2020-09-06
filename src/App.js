import React, { Component } from "react";
import "./App.css";
import CorpusText from "./corpus/components/CorpusText";
import GenerateButton from "./corpus/components/GenerateButton";
import ResultList from "./result/components/ResultList";
import SavedResultList from "./result/components/SavedResultList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import WordGeneratorService from "./corpus/service/WordGeneratorService";
import { Navbar, NavbarBrand } from "react-bootstrap";
import WordLengthSetting from "./settings/components/WordLengthSetting";

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
            <Navbar className="top-banner offset-md-1 col-md-10">
              <NavbarBrand className="d-lg-none">
                <h1 className="app-title-small">[n] gram</h1>
              </NavbarBrand>
            </Navbar>
            <Row className="app-header-content justify-content-left">
              <div className="title-container d-none d-lg-block offset-xs-4 col-xs-4 offset-sm-4 col-sm-4 offset-md-0 col-md-4 offset-lg-0 col-lg-4 offset-xl-0 col-xl-4">
                <Row className="justify-content-center col-12">
                  <div className="app-title">
                    <h1 className="app-title-n glow">[n]</h1>
                    <h1 className="app-title-gram glow">gram</h1>
                  </div>
                </Row>
              </div>
              <div className="corpus-container col-xs-12 col-sm-12 offset-md-1 col-md-6 offset-lg-1 col-lg-6 offset-xl-0 col-xl-7">
                <CorpusText />
              </div>
            </Row>
            <Row className="bottom-banner col-12 justify-content-left">
              <div className="settings-container d-none d-md-block col-12 offset-md-2 col-md-2">
                <WordLengthSetting />
              </div>
              <div className="col-12 col-md-4 col-lg-4 offset-xl-1 col-xl-2">
                <GenerateButton />
              </div>
            </Row>
          </header>
        </Row>
        <Row className="result-row justify-content-center">
          <div className="col-12 offset-md-1 col-md-3 offset-lg-1 col-lg-3 offset-xl-0 col-xl-3">
            <SavedResultList />
          </div>
          <div className="col-12 offset-md-1 col-md-7 offset-lg-1 col-lg-7 offset-xl-1 col-xl-7">
            <ResultList />
          </div>
        </Row>
        <Row className="footer-row justify-content-center"></Row>
      </Container>
    );
  }
}

export default App;
