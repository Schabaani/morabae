
import {View, Text, Button, TouchableHighlight} from 'react-native';
import React, {Component} from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";

export default class BoardScreen extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            clickedItems: []
        }
        // this.gameCell[11,55,33]
        // this.clickedItems[11]
    }

    // renderBoard = (boardSize) => {
    //     let colComponets = []
    //     for(let col=0; col < boardSize; col++){
    //         let rowComponets = []
    //         for(let row=0; row < boardSize; row++){
    //             let cell = <Row><Text>{row}{col}</Text></Row>
    //             rowComponets.push(cell)
    //         }
    //         let cool = <Col children={...rowComponets}/>
    //         colComponets.push(cool);
    //     }
    //     return colComponets;
    // };

    parser (row, col){
        return parseInt(row + '' + col)
    }
    

    backGroundColor (row, col) {
       let gameCell = [11,30,33]
        let clickedItems = [11]
        rowCol = parseInt(row + '' + col)

        let color= 'white'
        if(gameCell.includes(rowCol)){
            color = 'green'
        } else if (clickedItems.includes(rowCol)){
            color = 'red'
        }
        return color;
    }

    clickedMe (row, col){
        let gameCell = [11,30,33]
        if(!gameCell.includes(this.parser(row,col))){
            alert('please select right cell');
        } else if (this.state.clickedItems.includes(this.parser(row, col))){
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
        let gameCell = [11,30,33]
        let can = false;
        if(gameCell.includes(this.parser(row + 3, col))){
            alert(1)
            can = true;
        }
        if(gameCell.includes(this.parser(row - 3, col))){
            can = true;
        }
        if(gameCell.includes(this.parser(row, col + 3))){
            can = true;
        }
        if(gameCell.includes(this.parser(row, col - 3))){
            can = true;
        }
        // 
        if(gameCell.includes(this.parser(row + 2, col - 2))){
            can = true;
        }
        if(gameCell.includes(this.parser(row + 2, col + 2))){
            can = true;
        }
        if(gameCell.includes(this.parser(row - 2, col + 2))){
            can = true;
        }
        if(gameCell.includes(this.parser(row - 2, col - 2))){
            can = true;
        }
        alert(can + 'ssss');

    }


    render(){
        return (
            <View style={{flex:1}}>
                <Grid style={{flex:1, backgroundColor: 'red'}}>
                    <Col style={{flex:1, backgroundColor: 'red'}}>
                        
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(0,0)}}>
                            <TouchableHighlight onPress={() => {this.clickedMe(0,0)}}>
                                <Text>1</Text>
                            </TouchableHighlight>
                        </Row>
                        
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(0,1)}}>
                            <Text>2</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(0,2)}}>
                            <Text>3</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(0,3)}}>
                            <Text>4</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(0,4)}}>
                            <Text>5</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(0,5)}}>
                            <Text>6</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(0,6)}}>
                            <Text>7</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(0,7)}}>
                            <Text>8</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(0,8)}}>
                            <Text>9</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(0,9)}}>
                            <Text>10</Text>
                        </Row>
                    </Col>
                    <Col style={{flex:1, backgroundColor: 'red'}}>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(1,0)}}>
                            <Text>1</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(1,1)}}>
                            <Text>2</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(1,2)}}>
                            <Text>3</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(1,3)}}>
                            <Text>4</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(1,4)}}>
                            <Text>5</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(1,5)}}>
                            <Text>6</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(1,6)}}>
                            <Text>7</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(1,7)}}>
                            <Text>8</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(1,8)}}>
                            <Text>9</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(1,9)}}>
                            <Text>10</Text>
                        </Row>
                    </Col>
                    <Col style={{flex:1, backgroundColor: 'red'}}>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(2,0)}}>
                            <Text>1</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(2,1)}}>
                            <Text>2</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(2,2)}}>
                            <Text>3</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(2,3)}}>
                            <Text>4</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(2,4)}}>
                            <Text>5</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(2,5)}}>
                            <Text>6</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(2,6)}}>
                            <Text>7</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(2,7)}}>
                            <Text>8</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(2,8)}}>
                            <Text>9</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(2,9)}}>
                            <Text>10</Text>
                        </Row>
                    </Col>
                    <Col style={{flex:1, backgroundColor: 'red'}}>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(3,0)}}>
                            <Text>1</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(3,1)}}>
                            <Text>2</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(3,2)}}>
                            <Text>3</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(3,3)}}>
                            <Text>4</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(3,4)}}>
                            <Text>5</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(3,5)}}>
                            <Text>6</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(3,6)}}>
                            <Text>7</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(3,7)}}>
                            <Text>8</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(3,8)}}>
                            <Text>9</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(3,9)}}>
                            <Text>10</Text>
                        </Row>
                    </Col>
                    <Col style={{flex:1, backgroundColor: 'red'}}>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(4,0)}}>
                            <Text>1</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(4,1)}}>
                            <Text>2</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(4,2)}}>
                            <Text>3</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(4,3)}}>
                            <Text>4</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(4,4)}}>
                            <Text>5</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(4,5)}}>
                            <Text>6</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(4,6)}}>
                            <Text>7</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(4,7)}}>
                            <Text>8</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(4,8)}}>
                            <Text>9</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(4,9)}}>
                            <Text>10</Text>
                        </Row>
                    </Col>
                    <Col style={{flex:1, backgroundColor: 'red'}}>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(5,0)}}>
                            <Text>1</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(5,1)}}>
                            <Text>2</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(5,2)}}>
                            <Text>3</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(5,3)}}>
                            <Text>4</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(5,4)}}>
                            <Text>5</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(5,5)}}>
                            <Text>6</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(5,6)}}>
                            <Text>7</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(5,7)}}>
                            <Text>8</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(5,8)}}>
                            <Text>9</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(5,9)}}>
                            <Text>10</Text>
                        </Row>
                    </Col>
                    <Col style={{flex:1, backgroundColor: 'red'}}>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(6,0)}}>
                            <Text>1</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(6,1)}}>
                            <Text>2</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(6,2)}}>
                            <Text>3</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(6,3)}}>
                            <Text>4</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(6,4)}}>
                            <Text>5</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(6,5)}}>
                            <Text>6</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(6,6)}}>
                            <Text>7</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(6,7)}}>
                            <Text>8</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(6,8)}}>
                            <Text>9</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(6,9)}}>
                            <Text>10</Text>
                        </Row>
                    </Col>
                    <Col style={{flex:1, backgroundColor: 'red'}}>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(7,0)}}>
                            <Text>1</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(7,1)}}>
                            <Text>2</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(7,2)}}>
                            <Text>3</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(7,3)}}>
                            <Text>4</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(7,4)}}>
                            <Text>5</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(7,5)}}>
                            <Text>6</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(7,6)}}>
                            <Text>7</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(7,7)}}>
                            <Text>8</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(7,8)}}>
                            <Text>9</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(7,9)}}>
                            <Text>10</Text>
                        </Row>
                    </Col>
                    <Col style={{flex:1, backgroundColor: 'red'}}>
                         <Row style={{flex:1, backgroundColor: this.backGroundColor(8,0)}}>
                            <Text>1</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(8,1)}}>
                            <Text>2</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(8,2)}}>
                            <Text>3</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(8,3)}}>
                            <Text>4</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(8,4)}}>
                            <Text>5</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(8,5)}}>
                            <Text>6</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(8,6)}}>
                            <Text>7</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(8,7)}}>
                            <Text>8</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(8,8)}}>
                            <Text>9</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(8,9)}}>
                            <Text>10</Text>
                        </Row>
                    </Col>
                    <Col style={{flex:1, backgroundColor: 'red'}}>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(9,0)}}>
                            <Text>1</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(9,1)}}>
                            <Text>2</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(9,2)}}>
                            <Text>3</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(9,3)}}>
                            <Text>4</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(9,4)}}>
                            <Text>5</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(9,5)}}>
                            <Text>6</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(9,6)}}>
                            <Text>7</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(9,7)}}>
                            <Text>8</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(9,8)}}>
                            <Text>9</Text>
                        </Row>
                        <Row style={{flex:1, backgroundColor: this.backGroundColor(9,9)}}>
                            <Text>10</Text>
                        </Row>
                    </Col>

                    {/* <Col>
                        <Row>
                            <Text>3</Text>
                        </Row>
                        <Row>
                            <Text>4</Text>
                        </Row>
                     </Col> */}
                </Grid>
            </View>
        )
    }

}