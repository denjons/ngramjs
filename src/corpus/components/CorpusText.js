import React, { Component } from 'react';
import './CorpusText.css';

class CorpusText extends Component{
    render(){
        return (
            <textarea defaultValue=" &lt;corpus text&gt;" className='corpus-text' onChange={this.props.onChangeFunction} rows="4" cols="50" />
        );
    }
  }

export default CorpusText;