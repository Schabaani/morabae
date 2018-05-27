import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import HomeScreen from './index';
import {changeName} from './actions'

class HomeContainer extends Component<{}> {
    constructor(props) {
        super(props);
        const {text} = props;
        this.state = {
            text,
        };
    }

    render() {
        return (
            <HomeScreen
                changeName={changeName}
                text={this.props.homeReducer.text}
                dispatcher={this.props.dispatch}
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
const mapStateToProps = state => ({
    text: state.text,
});

/*
connect dispatch to props so that you can call the methods from the active props scope.
The defined method `addTodo` can be called in the scope of the components props.
*/
// const mapDispatchToProps = (dispatch) => {
//     return {
//         addTodo: dispatch(addTodo)
//     };
// };
const mapDispatchToProps = dispatch => ({
    addTodo: text => {
        // dispatch(addTodo(text));
        dispatch(() => changeName(text));
    },
});

/* clean way of setting up the connect. */
// export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
export default connect(({homeReducer}) => {
    return {homeReducer}
})(HomeContainer);