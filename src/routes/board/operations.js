
export function makeRowAndCol(num){
  if(num < 9){
    num = 0 + '' + num.toString()
  }
  num = num.toString()
  return {row: parseInt(num[0]), col: parseInt(num[1])}

}
export function parser(row, col){
  if(!isNaN(row + '' + col) && parseInt(row + '' + col) > 0 && parseInt(row + '' + col) < 99){
    return parseInt(row + '' + col)
  }
    return undefined
  }

export function generateGameCellsByLevel(level, rowInit, colInit){
  let gameCells = [];
  let moveAreas = findMoveAreas(rowInit, colInit)
  console.log(moveAreas)
  for(var i=0; i < level; i++){

    isAppended = false;
    while(!isAppended){
      const randomNumber = Math.floor(Math.random() * moveAreas.length) ;
      if(!gameCells.includes(moveAreas[randomNumber])){
        isAppended = true;
        gameCells.push(moveAreas[randomNumber]);
      }
      let newPoint = makeRowAndCol(moveAreas[randomNumber])
      moveAreas = findMoveAreas(newPoint.row, newPoint.col)
    }
  }
  return gameCells;
}

export function findMoveAreas(rowInit, colInit ){

 let moveAreas = []
  if(!parser(row + 3, col).isNaN ){
    moveAreas.push(parser(row + 3, col))
  }
  if(!parser(row - 3, col).isNaN){
    moveAreas.push(parser(row - 3, col))
  }
  if(!parser(row, col + 3)){
    moveAreas.push(parser(row , col + 3))
  }
  if(!parser(row, col - 3)){
    moveAreas.push(parser(row , col - 3))
  }
  // 
  if(!parser(row + 2, col - 2)){
    moveAreas.push(parser(row +2  , col - 2))
  }
  if(!parser(row + 2, col + 2)){
    moveAreas.push(parser(row + 2  , col + 2))
  }
  if(!parser(row - 2, col + 2)){
    moveAreas.push(parser(row  - 2  , col + 2))
  }
  if(parser(row - 2, col - 2)){
    moveAreas.push(parser(row - 2  , col - 2))
  }

  return moveAreas
}