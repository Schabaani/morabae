import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import HomeScreen from './index';
import {changeName, changeReducer} from './actions'
import {fetchDeptPrice} from './operations';
import {changeNameAfterOneSeconds} from './actionsRunner';

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
                name={"Amir"}
                changeName={this.props.changeNameAfterOneSecond}
                text={this.props.text}
                dispatcher={this.props.dispatch}
                fetchDeptPrice={fetchDeptPrice}
                changeReducer={changeReducer}
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
        text: state.homeReducer.text,

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
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
// export default connect(({homeReducer}) => {
//     return {...homeReducer}
// })(HomeContainer);