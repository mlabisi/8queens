import React, {Component} from 'react';
import Board from "../classes/Board";
let {solve} = require('../functions');

class BoardView extends Component {
    componentDidMount() {
        let newBoard = new Board(8);
        solve(newBoard);
    }

    render() {
        return (
            <div className="left">
                <h1>Solution</h1>
                <h3 id="solution">{this.props.solution}</h3>
            </div>
        );
    }
}

export default BoardView;
