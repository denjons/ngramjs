import React, { Component } from 'react';

class CorpusText extends Component{
    render(){
        return (
            <textarea onChange={this.props.onChangeFunction} rows="4" cols="50">
                corpus text
            </textarea>
        );
    }
  }

export default CorpusText;