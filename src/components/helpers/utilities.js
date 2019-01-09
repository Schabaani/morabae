import {BOARD_SIZE} from "./constants";

export function clone(obj) {
    let copy;

    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    if (obj instanceof Map) {
        return new Map(clone(Array.from(obj)));
    }

    if (obj instanceof Array) {
        copy = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    if (obj instanceof Object) {
        copy = {};
        for (const attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = clone(obj[attr]);
            }
        }
        return copy;
    }
    throw new Error('Unable to copy object! Its type isn\'t supported');
}

export function indexOf(row, col) {
    return row * 10 + col;
}
export function extractRowCol(number) {
    return({
        row: Math.floor(number / BOARD_SIZE),
        col: number % BOARD_SIZE
    })
}

export function parser(row, col) {
    let index = indexOf(row, col);
    if (index >= 0 &&
        index <= (BOARD_SIZE * BOARD_SIZE) - 1) {
        return index
    }
    return undefined
}