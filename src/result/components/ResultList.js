import React, { Component } from "react";
import resultListSubject from "../model/ResultListSubject";
import "./ResultList.css";

class ResultList extends Component {
  constructor(props) {
    super(props);
    var words = props.words;
    this.state = {
      words: words,
    };
  }

  clicked = (word) => {
    console.log(word);
    resultListSubject.notify(word);
    //  this.setState((oldState) => ({
    //    words: oldState.words.filter((w) => w !== word),
    //  }));
  };

  render() {
    return (
      <div className="list-container col-12">
        <ul className="list">
          {this.state.words.map((word) => (
            <li
              onClick={(e) => this.clicked(e.target.innerText)}
              className="listItem"
              key={word}
            >
              {word}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ResultList;
