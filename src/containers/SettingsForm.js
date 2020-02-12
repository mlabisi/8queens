import React, {Component} from 'react';
import RadioGroup from '../components/RadioGroup';

export default class SettingsForm extends Component {
    render() {
        return (
                <form id="settingsform" onSubmit={this.handleFormSubmit}>
                    <h1>Settings</h1>
                    <RadioGroup
                    title={'Queen Icon'}
                    setName={'queen-icons'}
                    controlFunc={this.handleQueenSelection}
                    options={this.state.selectedQueen} /> {/* Queen Options */}
                    <RadioGroup
                        title={'Board Background'}
                        setName={'board-bkg'}
                        controlFunc={this.handleBoardSelection}
                        options={this.state.selectedBoard} /> {/* Checkboard Options */}
                    <input
                        type="submit"
                        className="btn btn-primary float-lg-right"
                        value="Update Settings" />
                    <button
                        className="btn btn-link float-left"
                        onClick={this.handleViewSolution}>View Solution</button>
                </form>

    );
    }
}
