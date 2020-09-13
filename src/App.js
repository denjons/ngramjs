import React, { Component } from "react";
import "./App.css";
import CorpusText from "./corpus/components/CorpusText";
import GenerateButton from "./corpus/components/GenerateButton";
import ResultList from "./result/components/ResultList";
import SavedResultList from "./result/components/SavedResultList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import WordGeneratorService from "./corpus/service/WordGeneratorService";
import { Navbar, NavbarBrand, Nav, NavDropdown } from "react-bootstrap";
import SettingsSlider from "./settings/components/SettingsSlider";
import SettingsToggleButton from "./settings/components/SettingsToggleButton";

class App extends Component {
  defaultWordLength = 12;
  defaultMarkovOrder = 2;
  deafultWordCount = 20;
  defaultGenerate = "words";

  constructor(props) {
    super(props);

    this.WordGeneratorService = new WordGeneratorService({
      wordLength: this.defaultWordLength,
      markovOrder: this.defaultMarkovOrder,
      wordCount: this.deafultWordCount,
      generate: this.defaultGenerate,
    });
  }

  render() {
    return (
      <Container fluid>
        <Row className="header-row">
          <Navbar className="top-banner col-12 settings-dropdown-button">
            <NavbarBrand>
              <h1 className="app-title-small">[n] gram</h1>
            </NavbarBrand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <NavDropdown
                  title="Settings"
                  id="basic-nav-dropdown"
                  drop="left"
                >
                  <NavDropdown.ItemText className="settings-dropdown-item">
                    <SettingsSlider
                      name="word-length"
                      label="Word Length"
                      propertyName="wordLength"
                      minValue={4}
                      maxValue={20}
                      defaultValue={this.defaultWordLength}
                    />
                  </NavDropdown.ItemText>
                  <NavDropdown.ItemText className="settings-dropdown-item">
                    <SettingsSlider
                      name="word-count"
                      label="Result Count"
                      propertyName="wordCount"
                      minValue={5}
                      maxValue={40}
                      defaultValue={this.deafultWordCount}
                    />
                  </NavDropdown.ItemText>
                  <NavDropdown.ItemText className="settings-dropdown-item">
                    <SettingsSlider
                      name="markov-order"
                      label="Markov Order"
                      propertyName="markovOrder"
                      minValue={1}
                      maxValue={10}
                      defaultValue={this.defaultMarkovOrder}
                    />
                  </NavDropdown.ItemText>
                  <NavDropdown.Divider />
                  <NavDropdown.ItemText className="settings-dropdown-item">
                    <SettingsToggleButton
                      name="generate-toggle-button"
                      propertyName="generate"
                      label="Generate:"
                      values={[
                        { name: "Words", value: "words" },
                        { name: "Sentences", value: "sentences" },
                      ]}
                      defaultValue="words"
                    />
                  </NavDropdown.ItemText>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <header className="app-header col-12">
            <Row className="app-header-content justify-content-left">
              <div className="title-container d-none d-lg-block offset-xs-4 col-xs-4 offset-sm-4 col-sm-4 offset-md-0 col-md-4 offset-lg-0 col-lg-4 offset-xl-0 col-xl-4">
                <Row className="justify-content-center col-12">
                  <div className="app-title">
                    <h1 className="app-title-n glow">[n]</h1>
                    <h1 className="app-title-gram glow">gram</h1>
                  </div>
                  <h1 className="app-subtitle col-12">Word Generator</h1>
                </Row>
              </div>
              <div className="corpus-container col-12 col-lg-7">
                <CorpusText />
              </div>
            </Row>
            <Row className="justify-content-center">
              <div className="col-12 col-md-4 col-lg-4 col-xl-2">
                <GenerateButton />
              </div>
            </Row>
          </header>
        </Row>
        <Row className="result-row justify-content-center">
          <div className="col-12 offset-md-1 col-md-3 offset-lg-1 col-lg-3 offset-xl-0 col-xl-3">
            <SavedResultList />
          </div>
          <div className="col-12 offset-md-1 col-md-6 offset-lg-1 col-lg-6 offset-xl-1 col-xl-6">
            <ResultList />
          </div>
        </Row>
        <Row className="footer-row justify-content-center"></Row>
      </Container>
    );
  }
}

export default App;
