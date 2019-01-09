import {DIAGONALLY_MOVE, STRAIGHT_MOVE} from "../../components/helpers/constants";
import {extractRowCol, parser} from "../../components/helpers/utilities";

export function makeRowAndCol(num) {
    let extracted = extractRowCol(num);
    return {row: extracted.row, col: extracted.col}
}

export function findMoveAreas(row, col) {
    let moveAreas = [];

    if (parser(row + STRAIGHT_MOVE, col) !== undefined) {
        moveAreas.push(parser(row + STRAIGHT_MOVE, col));
    }
    if (parser(row - STRAIGHT_MOVE, col) !== undefined) {
        moveAreas.push(parser(row - STRAIGHT_MOVE, col));
    }
    if (parser(row, col + STRAIGHT_MOVE) !== undefined) {
        moveAreas.push(parser(row, col + STRAIGHT_MOVE));
    }
    if (parser(row, col - STRAIGHT_MOVE) !== undefined) {
        moveAreas.push(parser(row, col - STRAIGHT_MOVE));
    }
    //
    if (parser(row + DIAGONALLY_MOVE, col - DIAGONALLY_MOVE) !== undefined) {
        moveAreas.push(parser(row + DIAGONALLY_MOVE, col - DIAGONALLY_MOVE));
    }
    if (parser(row + DIAGONALLY_MOVE, col + DIAGONALLY_MOVE) !== undefined) {
        moveAreas.push(parser(row + DIAGONALLY_MOVE, col + DIAGONALLY_MOVE));
    }
    if (parser(row - DIAGONALLY_MOVE, col + DIAGONALLY_MOVE) !== undefined) {
        moveAreas.push(parser(row - DIAGONALLY_MOVE, col + DIAGONALLY_MOVE));
    }
    if (parser(row - DIAGONALLY_MOVE, col - DIAGONALLY_MOVE) !== undefined) {
        moveAreas.push(parser(row - DIAGONALLY_MOVE, col - DIAGONALLY_MOVE));

    }
    return moveAreas
}

export function calculateLives(currentLives, unselectedItemsLength) {
    let newLives = 0;

    if (unselectedItemsLength === 0) {
        newLives = currentLives + 1;
    } else if (currentLives - unselectedItemsLength > 0) {
        newLives = currentLives - unselectedItemsLength
    }
    return newLives
}