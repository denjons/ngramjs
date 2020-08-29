import React, { Component } from "react";
import "./CorpusText.css";

class CorpusText extends Component {
  render() {
    return (
      <textarea
        placeholder="Enter corpus text here ..."
        className="corpus-text col-12"
        onChange={this.props.onChangeFunction}
        rows="10"
        cols="50"
      />
    );
  }
}

export default CorpusText;
