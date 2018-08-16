import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BoardScreen from './index';
import {changeName, changeReducer} from './actions'
import {changeNameAfterOneSeconds} from './actionsRunner';

class BoardContainer extends Component<{}> {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        const {text} = props;
        this.state = {
            text,
        };
    }

    render() {
        return (
            <BoardScreen
                changeName={this.props.changeNameAfterOneSecond}
            />
        );

    }
}

/*
define dispatch methods in propTypes so that they are validated.
*/
// ItemsContainer.propTypes = {
//     items: PropTypes.array.isRequired,
//     filters: PropTypes.array.isRequired,
//     onMyAction: PropTypes.func.isRequired,
// };

/*
map state to props
state is your redux-store object
*/
const mapStateToProps = (state) => {
    return {
        text: state.boardReducer.text,
        level: state.boardReducer.level,
        gameCells: state.boardReducer.gameCells,
    };
};


/*
connect dispatch to props so that you can call the methods from the active props scope.
The defined method `addTodo` can be called in the scope of the components props.
*/
const mapDispatchToProps = (dispatch) => {
    return {
        changeNameAfterOneSecond: (text) => dispatch(changeNameAfterOneSeconds(text))
    };
};

/* clean way of setting up the connect. */
export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
// export default connect(({homeReducer}) => {
//     return {...homeReducer}
// })(HomeContainer);