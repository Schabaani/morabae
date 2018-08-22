
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React, {Component} from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
// import TimerMixin from 'react-timer-mixin';
import {normalize} from '../../components/helpers/sizeNormalizer'
import Alert from '../../components/alert';
const {width} = require('Dimensions').get('window');
import Modal from "react-native-modal";

export default class BoardScreen extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            clickedItems: [],
            timePassed: 0
        }
        this.diagonallyMove = 2;
        this.straightMove = 3;
        this.timer = undefined;
    }

    // componentDidMount(){
    //     this.timer = setInterval(this.tick.bind(this), 1000);
    // }

    // componentWillUnmount(){
    //     clearInterval(this.timer);
    // }

    tick(){
        this.setState({timePassed:this.state.timePassed + 1});
    }

    renderBoard = (boardSize) => {
        let colComponets = []
        for(let col=0; col < boardSize; col++){
            let rowComponets = []
            for(let row=0; row < boardSize; row++){
                let cell = <Row style={{flex:1, backgroundColor: this.backGroundColor(row,col)}}
                                size={10}    
                                key={row}
                            >
                                    <TouchableWithoutFeedback onPress={() => {this.props.selectCell(row,col)}}
                                    style={{flex:1}}
                                     >
                                        <Text>{row}{col}</Text>
                                    </TouchableWithoutFeedback>
                            </Row>
                rowComponets.push(cell)
            }
            let cool = <Col key={col} >{rowComponets}</Col>
            colComponets.push(cool);
        }
        return colComponets;
    };

    parser(row, col){
        if(!isNaN(row + '' + col) && parseInt(row + '' + col) > 0 && parseInt(row + '' + col) < 99){
          return parseInt(row + '' + col)
        }
          return undefined
    }
    

    backGroundColor (row, col) {
       let gameCells = this.props.gameCells
        rowCol = parseInt(row + '' + col)

        let color= 'white'
        if(gameCells.includes(rowCol)){
            color = 'green'
        }
        if (this.props.selectedItems.includes(rowCol)){
            color = 'red'
        }
        return color;
    }

    // selectCell (row, col){
    //     let gameCell = this.props.gameCells
    //     if(!gameCell.includes(this.parser(row,col))){
    //         alert('please select right cell');
    //     } else if (this.props.selectedItems.includes(this.parser(row, col))){
    //         alert('you selected before');
    //     }
    //     const can = this.canHaveAnotherMove(row, col);
    //     alert(can)
    //     if(!can) {
    //         this.runFinishGame();
    //     }
        
    // }

    // runFinishGame(){
    //     alert('game over!');
    // }

    // canHaveAnotherMove(row, col) {
    //     let gameCell = this.props.gameCells
    //     if(this.props.selectedItems.includes(parseInt(row + '' + col))){
    //         return false;
    //     }
    //     let can = false;
    //     //TODO and not be in selectedItems. Should I check that?
    //     if(gameCell.includes(this.parser(row + this.straightMove, col))){
    //         alert(1)
    //         can = true;
    //     }
    //     if(gameCell.includes(this.parser(row - this.straightMove, col))){
    //         can = true;
    //     }
    //     if(gameCell.includes(this.parser(row, col + this.straightMove))){
    //         can = true;
    //     }
    //     if(gameCell.includes(this.parser(row, col - this.straightMove))){
    //         can = true;
    //     }
    //     // 
    //     if(gameCell.includes(this.parser(row + this.diagonallyMove, col - this.diagonallyMove))){
    //         can = true;
    //     }
    //     if(gameCell.includes(this.parser(row + this.diagonallyMove, col + this.diagonallyMove))){
    //         can = true;
    //     }
    //     if(gameCell.includes(this.parser(row - this.diagonallyMove, col + this.diagonallyMove))){
    //         can = true;
    //     }
    //     if(gameCell.includes(this.parser(row - this.diagonallyMove, col - this.diagonallyMove))){
    //         can = true;
    //     }
    //     alert(can);

    // }


    render(){
        return (
            <View style={{flex:1}}>
                <Grid style={{width:width, height:width, flex: 0.5}}>
                   {this.renderBoard(10)}
                </Grid>
                <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Timer: </Text>
                        <Text> {this.state.timePassed} seconds</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Left to click: </Text>
                        <Text>{this.props.leftToClick}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Lives: </Text>
                        <Text>{this.props.lives}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Level: </Text>
                        <Text>{this.props.level}</Text>
                    </View>
                
                </View>
                <Modal isVisible={this.props.modalVisibilty}>
                        <Alert
                        bigTitle={this.props.bigTitle}
                        title={this.props.title}
                        noCallBack={this.props.noCallBack}
                        yesCallBack={this.props.yesCallBack}
                    />
                </Modal>
                    
            </View>
        )
    }

}


// <Modal
//                         animationType="slide"
//                         transparent={true}
//                         style={{backgroundColor: 'black', opacity: 0.5}}
//                         visible={this.props.modalVisibilty}
//                         >
//                         <Alert
//                             bigTitle={this.props.bigTitle}
//                             title={this.props.title}
//                             noCallBack={this.props.noCallBack}
//                             yesCallBack={this.props.yesCallBack}
//                          />
//                     </Modal>  