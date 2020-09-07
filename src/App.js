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

class App extends Component {
  constructor(props) {
    super(props);

    this.WordGeneratorService = new WordGeneratorService({
      wordLength: 7,
      markovOrder: 2,
      wordCount: 10,
    });
  }

  render() {
    return (
      <Container fluid>
        <Row className="header-row">
          <header className="app-header col-12">
            <Navbar className="top-banner">
              <NavbarBrand className="d-lg-none">
                <h1 className="app-title-small">[n] gram</h1>
              </NavbarBrand>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <NavDropdown
                    className="settings-dropdown"
                    title="Settings"
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.ItemText className="settings-dropdown-item">
                      <SettingsSlider
                        name="word-length"
                        label="Word Length"
                        propertyName="wordLength"
                        minValue={4}
                        maxValue={20}
                        defaultValue={7}
                      />
                    </NavDropdown.ItemText>
                    <NavDropdown.ItemText className="settings-dropdown-item">
                      <SettingsSlider
                        name="word-count"
                        label="Result Count"
                        propertyName="wordCount"
                        minValue={5}
                        maxValue={40}
                        defaultValue={10}
                      />
                    </NavDropdown.ItemText>
                    <NavDropdown.Divider />
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
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
              <div className="corpus-container col-12 col-lg-7">
                <CorpusText />
              </div>
            </Row>
            <Row className="bottom-banner col-12 justify-content-left">
              <div className="d-none d-lg-block col-12 col-lg-4"></div>
              <div className="col-12 offset-md-4 col-md-4 offset-lg-0 col-lg-4 offset-xl-1 col-xl-2">
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
