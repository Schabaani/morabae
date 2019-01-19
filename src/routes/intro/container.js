import React, {Component} from 'react';
import {connect} from 'react-redux';
import IntroScreen from './index';
import ShowToastHOC from '../../components/hoc/showToast';
import {Actions} from 'react-native-router-flux'
import {showRealAppDispatcher} from "./actionsRunner";
import {COLOR} from "../../components/helpers/colorPalette";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 320,
    }
});

const slides = [
    {
        key: 'empty-board',
        title: 'صفحه خالی',
        titleStyle: {fontSize: 20, fontFamily: 'DiodrumArabic-Bold', color: COLOR.AJORY},
        text: 'برای شروع بازی باید در صفحه خالی روی یکی از خانه های مربع کلیک کنید.',
        image: require('../../assets/img/empty-board.png'),
        imageStyle: styles.image,
        backgroundColor: COLOR.BACK_GROUND_COLOR,
    },
    {
        key: 'available',
        title: 'قواعد حرکتی',
        titleStyle: {fontSize: 20, fontFamily: 'DiodrumArabic-Bold', color: COLOR.AJORY},
        text: 'هر نقطه ای که باشید فقط مجاز به انتخاب یکی از نقاط سفید رنگ طبق الگوی شکل هستید.',
        image: require('../../assets/img/available.png'),
        imageStyle: styles.image,
        backgroundColor: COLOR.BACK_GROUND_COLOR,
    },
    {
        key: 'step1',
        title: 'مرحله اول',
        titleStyle: {fontSize: 20, fontFamily: 'DiodrumArabic-Bold', color: COLOR.AJORY},
        text: 'با توجه به قواعد حرکتی تمام نقاط سفید را سبز کنید.',
        image: require('../../assets/img/step1.png'),
        imageStyle: styles.image,
        backgroundColor: COLOR.BACK_GROUND_COLOR,
    },
    {
        key: 'step2',
        title: 'مرحله دوم',
        titleStyle: {fontSize: 20, fontFamily: 'DiodrumArabic-Bold', color: COLOR.AJORY},
        text: 'با توجه به قواعد حرکتی تمام نقاط سفید را سبز کنید. زرد آخرین خانه ای است که بازی کرده اید.',
        image: require('../../assets/img/step2.png'),
        imageStyle: styles.image,
        backgroundColor: COLOR.BACK_GROUND_COLOR,
    },
    {
        key: 'step2-1',
        title: 'مرحله دوم',
        titleStyle: {fontSize: 20, fontFamily: 'DiodrumArabic-Bold', color: COLOR.AJORY},
        text: 'با توجه به قواعد حرکتی تمام نقاط سفید را سبز کنید. زرد آخرین خانه ای است که بازی کرده اید.',
        image: require('../../assets/img/step2-1.png'),
        imageStyle: styles.image,
        backgroundColor: COLOR.BACK_GROUND_COLOR,
    },
    {
        key: 'step3',
        title: 'مرحله سوم',
        titleStyle: {fontSize: 20, fontFamily: 'DiodrumArabic-Bold', color: COLOR.AJORY},
        text: 'با توجه به قواعد حرکتی تمام نقاط سفید را سبز کنید. زرد آخرین خانه ای است که بازی کرده اید.',
        image: require('../../assets/img/step3.png'),
        imageStyle: styles.image,
        backgroundColor: COLOR.BACK_GROUND_COLOR,
    },
    {
        key: 'step3-1',
        title: 'مرحله سوم',
        titleStyle: {fontSize: 20, fontFamily: 'DiodrumArabic-Bold', color: COLOR.AJORY},
        text: 'با توجه به قواعد حرکتی تمام نقاط سفید را سبز کنید. زرد آخرین خانه ای است که بازی کرده اید.',
        image: require('../../assets/img/step3-1.png'),
        imageStyle: styles.image,
        backgroundColor: COLOR.BACK_GROUND_COLOR,
    },
    {
        key: 'step3-2',
        title: 'مرحله سوم',
        titleStyle: {fontSize: 20, fontFamily: 'DiodrumArabic-Bold', color: COLOR.AJORY},
        text: 'با توجه به قواعد حرکتی تمام نقاط سفید را سبز کنید. زرد آخرین خانه ای است که بازی کرده اید.',
        image: require('../../assets/img/step3-2.png'),
        imageStyle: styles.image,
        backgroundColor: COLOR.BACK_GROUND_COLOR,
    },
    {
        key: 'points',
        title: 'محاسبه امتیاز',
        titleStyle: {fontSize: 20, fontFamily: 'DiodrumArabic-Bold', color: COLOR.AJORY},
        text: 'هر مرحله را که به پایان برسانید یک جان دریافت می کنید. بر روی نقاط غیرمجاز حرکتی کلیک کنید یک جان از دست می دهید.',
        image: require('../../assets/img/win.png'),
        imageStyle: styles.image,
        backgroundColor: COLOR.BACK_GROUND_COLOR,
    }
];

class IntroScreenContainer extends Component<{}> {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            showSkip: false,
        }
    }

    _onDone = () => {
        this.props.showRealApp();
        Actions.BoardScreen({type: 'reset'})
    };
    _onSkip = () => {
        this.props.showRealApp();
        Actions.BoardScreen({type: 'reset'})
    };
    onSlideChange = (index, lastIndex) => {
        if (index >= 3 && index !== slides.length - 1) {
            this.setState({showSkip: true})
        } else if (index === slides.length - 1) {
            this.setState({showSkip: false})
        }
    };


    render() {
        if (this.props.showRealAppState) {
            setTimeout(() => {
                Actions.BoardScreen({type: 'reset'});
            }, 0);
            return (null);
        }

        return (
            <IntroScreen
                onDone={this._onDone}
                onSlideChange={this.onSlideChange}
                showSkip={this.state.showSkip}
                slides={slides}
            />
        );

    }
}

const mapStateToProps = (state) => {
    return {
        showRealAppState: state.introReducer.showRealApp
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showRealApp: () => dispatch(showRealAppDispatcher()),
    };
};

const IntroScreenContainerWithShowToast = ShowToastHOC(IntroScreenContainer);
export default connect(mapStateToProps, mapDispatchToProps)(IntroScreenContainerWithShowToast);
