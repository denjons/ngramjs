import React, {Component} from 'react';
import {ListItem} from './listItem'

class ResultList extends Comment {
    
    render(){
        return (
            <ul>
                {this.props.words.map((word) =>
                <ListItem key={word}
                            value={word} />
                )}
            </ul>);
    }
}

export default ResultList