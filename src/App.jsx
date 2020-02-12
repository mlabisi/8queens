import React, {Component} from 'react'
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import mainReducers from './main-reducers.js';
import * as AppActions from './actions.js';

import {
    DISPLAY_SOLUTION,
    SOLUTION_TEXT
} from './constants';


import BoardView from "./components/BoardView";
import SettingsForm from "./containers/SettingsForm";

class App extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     selectedQueen: '',
        //     selectedBoard: ''
        // };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleViewSolution = this.handleViewSolution.bind(this);
        this.handleQueenSelection = this.handleQueenSelection.bind(this);
        this.handleBoardSelection = this.handleBoardSelection.bind(this);
    }

    componentDidMount() {
        // this.setState({
        //     selectedQueen: 'white-queen',
        //     selectedBoard: 'chess-board'
        // });
        ipcRenderer.on(DISPLAY_SOLUTION, this.handleViewSolution)
    }

    componentWillUnmount() {
        ipcRenderer.removeListener(DISPLAY_SOLUTION, this.handleViewSolution)
    }

    handleQueenSelection(e) {
        this.setState({selectedQueen: e.target.value});
    }

    handleBoardSelection(e) {
        this.setState({selectedBoard: e.target.value});
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const formPayload = {
            selectedQueen: this.state.selectedQueen,
            selectedBoard: this.state.selectedBoard
        };

        console.log('Get this to the GUI generator somehow', formPayload);
    }

    handleViewSolution(event, data) {
        this.props.getSolution(data);
    }

    render() {
        return (
            <div className="container">
                <div className="columns">
                    <div className="col-md-8">
                        <BoardView solution={this.props.solution}/>
                    </div>
                    <div className="col-md-4">
                        <SettingsForm />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return({
        solutionText: state.solutionText
    });
}

function mapDispatchToProps(dispatch) {
    return({
        getSolution: (solution) => {dispatch(AppActions.getSolution(solution))}
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
