const initialState = {
    solutionText: ''
};

export default function mainReducers(state = initialState, action) {
    switch (action.type) {
        case 'SOLUTIONTEXT':
            return Object.assign({}, state, {
                solutionText: action.solutionText
            });
        default:
            return state;
    }
}
