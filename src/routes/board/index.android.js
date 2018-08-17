
import {View, Text, Button, TouchableHighlight} from 'react-native';
import React, {Component} from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
// import TimerMixin from 'react-timer-mixin';
import {normalize} from '../../components/helpers/sizeNormalizer'
const {width} = require('Dimensions').get('window');

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
        // this.tick = this.tick.bnid(this);
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
                                    <TouchableHighlight onPress={() => {this.props.selectCell(row,col)}}
                                    style={{flex:1}}
                                     >
                                        <Text>{row}{col}</Text>
                                    </TouchableHighlight>
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

    selectCell (row, col){
        let gameCell = this.props.gameCells
        if(!gameCell.includes(this.parser(row,col))){
            alert('please select right cell');
        } else if (this.props.selectedItems.includes(this.parser(row, col))){
            alert('you selected before');
        }
        const can = this.canHaveAnotherMove(row, col);
        alert(can)
        if(!can) {
            this.runFinishGame();
        }
        
    }

    runFinishGame(){
        alert('game over!');
    }

    canHaveAnotherMove(row, col) {
        let gameCell = this.props.gameCells
        if(this.props.selectedItems.includes(parseInt(row + '' + col))){
            return false;
        }
        let can = false;
        //TODO and not be in selectedItems. Should I check that?
        if(gameCell.includes(this.parser(row + this.straightMove, col))){
            alert(1)
            can = true;
        }
        if(gameCell.includes(this.parser(row - this.straightMove, col))){
            can = true;
        }
        if(gameCell.includes(this.parser(row, col + this.straightMove))){
            can = true;
        }
        if(gameCell.includes(this.parser(row, col - this.straightMove))){
            can = true;
        }
        // 
        if(gameCell.includes(this.parser(row + this.diagonallyMove, col - this.diagonallyMove))){
            can = true;
        }
        if(gameCell.includes(this.parser(row + this.diagonallyMove, col + this.diagonallyMove))){
            can = true;
        }
        if(gameCell.includes(this.parser(row - this.diagonallyMove, col + this.diagonallyMove))){
            can = true;
        }
        if(gameCell.includes(this.parser(row - this.diagonallyMove, col - this.diagonallyMove))){
            can = true;
        }
        alert(can);

    }


    render(){
        return (
            <View style={{flex:1}}>
                <Grid style={{width:width, height:width}}>
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

            </View>
        )
    }

}

// <Col style={{flex:1, backgroundColor: 'red'}}>
                        
// <Row style={{flex:1, backgroundColor: this.backGroundColor(0,0)}}>
//     <TouchableHighlight onPress={() => {this.clickedMe(0,0)}}
//     style={{flex:1}}
//     >
//         <Text>1</Text>
//     </TouchableHighlight>
// </Row>

// <Row style={{flex:1, backgroundColor: this.backGroundColor(0,1)}}>
//     <Text>2</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(0,2)}}>
//     <Text>3</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(0,3)}}>
//     <Text>4</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(0,4)}}>
//     <Text>5</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(0,5)}}>
//     <Text>6</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(0,6)}}>
//     <Text>7</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(0,7)}}>
//     <Text>8</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(0,8)}}>
//     <Text>9</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(0,9)}}>
//     <Text>10</Text>
// </Row>
// </Col>
// <Col style={{flex:1, backgroundColor: 'red'}}>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(1,0)}}>
//     <Text>1</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(1,1)}}>
//     <Text>2</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(1,2)}}>
//     <Text>3</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(1,3)}}>
//     <Text>4</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(1,4)}}>
//     <Text>5</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(1,5)}}>
//     <Text>6</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(1,6)}}>
//     <Text>7</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(1,7)}}>
//     <Text>8</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(1,8)}}>
//     <Text>9</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(1,9)}}>
//     <Text>10</Text>
// </Row>
// </Col>
// <Col style={{flex:1, backgroundColor: 'red'}}>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(2,0)}}>
//     <Text>1</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(2,1)}}>
//     <Text>2</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(2,2)}}>
//     <Text>3</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(2,3)}}>
//     <Text>4</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(2,4)}}>
//     <Text>5</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(2,5)}}>
//     <Text>6</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(2,6)}}>
//     <Text>7</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(2,7)}}>
//     <Text>8</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(2,8)}}>
//     <Text>9</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(2,9)}}>
//     <Text>10</Text>
// </Row>
// </Col>
// <Col style={{flex:1, backgroundColor: 'red'}}>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(3,0)}}>
//     <Text>1</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(3,1)}}>
//     <Text>2</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(3,2)}}>
//     <Text>3</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(3,3)}}>
//     <Text>4</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(3,4)}}>
//     <Text>5</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(3,5)}}>
//     <Text>6</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(3,6)}}>
//     <Text>7</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(3,7)}}>
//     <Text>8</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(3,8)}}>
//     <Text>9</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(3,9)}}>
//     <Text>10</Text>
// </Row>
// </Col>
// <Col style={{flex:1, backgroundColor: 'red'}}>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(4,0)}}>
//     <Text>1</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(4,1)}}>
//     <Text>2</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(4,2)}}>
//     <Text>3</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(4,3)}}>
//     <Text>4</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(4,4)}}>
//     <Text>5</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(4,5)}}>
//     <Text>6</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(4,6)}}>
//     <Text>7</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(4,7)}}>
//     <Text>8</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(4,8)}}>
//     <Text>9</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(4,9)}}>
//     <Text>10</Text>
// </Row>
// </Col>
// <Col style={{flex:1, backgroundColor: 'red'}}>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(5,0)}}>
//     <Text>1</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(5,1)}}>
//     <Text>2</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(5,2)}}>
//     <Text>3</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(5,3)}}>
//     <Text>4</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(5,4)}}>
//     <Text>5</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(5,5)}}>
//     <Text>6</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(5,6)}}>
//     <Text>7</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(5,7)}}>
//     <Text>8</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(5,8)}}>
//     <Text>9</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(5,9)}}>
//     <Text>10</Text>
// </Row>
// </Col>
// <Col style={{flex:1, backgroundColor: 'red'}}>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(6,0)}}>
//     <Text>1</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(6,1)}}>
//     <Text>2</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(6,2)}}>
//     <Text>3</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(6,3)}}>
//     <Text>4</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(6,4)}}>
//     <Text>5</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(6,5)}}>
//     <Text>6</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(6,6)}}>
//     <Text>7</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(6,7)}}>
//     <Text>8</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(6,8)}}>
//     <Text>9</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(6,9)}}>
//     <Text>10</Text>
// </Row>
// </Col>
// <Col style={{flex:1, backgroundColor: 'red'}}>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(7,0)}}>
//     <Text>1</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(7,1)}}>
//     <Text>2</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(7,2)}}>
//     <Text>3</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(7,3)}}>
//     <Text>4</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(7,4)}}>
//     <Text>5</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(7,5)}}>
//     <Text>6</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(7,6)}}>
//     <Text>7</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(7,7)}}>
//     <Text>8</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(7,8)}}>
//     <Text>9</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(7,9)}}>
//     <Text>10</Text>
// </Row>
// </Col>
// <Col style={{flex:1, backgroundColor: 'red'}}>
//  <Row style={{flex:1, backgroundColor: this.backGroundColor(8,0)}}>
//     <Text>1</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(8,1)}}>
//     <Text>2</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(8,2)}}>
//     <Text>3</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(8,3)}}>
//     <Text>4</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(8,4)}}>
//     <Text>5</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(8,5)}}>
//     <Text>6</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(8,6)}}>
//     <Text>7</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(8,7)}}>
//     <Text>8</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(8,8)}}>
//     <Text>9</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(8,9)}}>
//     <Text>10</Text>
// </Row>
// </Col>
// <Col style={{flex:1, backgroundColor: 'red'}}>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(9,0)}}>
//     <Text>1</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(9,1)}}>
//     <Text>2</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(9,2)}}>
//     <Text>3</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(9,3)}}>
//     <Text>4</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(9,4)}}>
//     <Text>5</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(9,5)}}>
//     <Text>6</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(9,6)}}>
//     <Text>7</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(9,7)}}>
//     <Text>8</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(9,8)}}>
//     <Text>9</Text>
// </Row>
// <Row style={{flex:1, backgroundColor: this.backGroundColor(9,9)}}>
//     <Text>10</Text>
// </Row>
// </Col>