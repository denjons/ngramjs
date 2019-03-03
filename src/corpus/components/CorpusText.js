import React, { Component } from 'react';
import './CorpusText.css';

class CorpusText extends Component{
    render(){
        return (
            <textarea className='corpus-text' onChange={this.props.onChangeFunction} rows="4" cols="50">
                corpus text
            </textarea>
        );
    }
  }

export default CorpusText;