import React, {Component} from 'react';
import './list.css'

class ResultList extends Component {

    constructor(props) {
        super(props);
        var words = props.words;
        this.state = {
          words: words,
        };
      }

    onOver = (event) => {
        console.log(this.state.words);
        this.setState((oldState) => ({
           words: oldState.words 
        }));
    }
    
    render(){
        return (
            <div className="list-container">
            <ul className="list">
                {this.state.words.map((word) =>
                <li className='listItem' key={word}>{word}</li>
                )}
            </ul>
            </div>);
    }
}

export default ResultList