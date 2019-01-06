import {getRandomInt, shuffle} from "./util";
import {calculateAvailableMoves} from "./boardMaker";

class Point {
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }

    static add = (other) => {
        return (p) => {
            return new Point(p.first + other.first, p.second + other.second)
        }
    };

    copy = () => new Point(this.first, this.second);

}

console.log('Before Path');

export class Path {
    // val nodes: Set<Point>, val path: List<Point>
    constructor(nodes, path) {
        this.nodes = nodes;
        this.path = path;
    }

    static empty = () => {
        return new Path(new Set(), [])
    };

    copy = () => {
        let pathCopy = this.path.map(it => it.copy());

        return new Path(new Set(pathCopy), pathCopy);
    };

    push = (point) => {
        const pathCopy = this.path.map(it => it.copy()).push(point.copy());
        return new Path(new Set(pathCopy), pathCopy);
    };

    count = () => {
        return this.nodes.length;
    };

    cutRest = (cutPoint) => {
        if (cutPoint < 0 || cutPoint > this.nodes.length - 1) {
            return this.copy();
        }
        const cutPath = this.path.slice(cutPoint);
        return Path(new Set(cutPath), cutPath);

    };
}

console.log('Before Chromosome');

// data class Chromosome(val boardSize: Int, val level: Int, val startingPoint: Point, val path: Path) {

export class Chromosome {
    constructor(boardSize, level, startingPoint, point, path) {
        console.log('In constructor.');
        this.boardSize = boardSize;
        this.level = level;
        this.startingPoint = startingPoint;
        this.point = point;
        this.path = path;
        console.log('done with constructor');
    }

    static random = (boardSize, startingPoint, takenPath, desiredLevel) => {
        let currentPoint = startingPoint;
        let currentTaken = takenPath;
        let currentLevel = takenPath.count();

        // ((calculateAvailableMoves(boardSize, currentTaken.nodes))(currentPoint)).shuffled();

        let candidates = shuffle(calculateAvailableMoves(boardSize, currentTaken.nodes, currentPoint));

        while (currentLevel < desiredLevel && !candidates.isEmpty()) {
            currentPoint = candidates.first();
            currentLevel += 1;
            currentTaken.push(currentPoint);
            candidates = shuffle(calculateAvailableMoves(boardSize, currentTaken.nodes, currentPoint));
        }

        return Chromosome(boardSize, currentLevel, startingPoint, currentTaken)

    };

    backtrack = (desiredLevel) =>{
        let cutPoint = getRandomInt(this.path.count() - 1);

        return Chromosome.random(this.boardSize, this.startingPoint, this.path.cutRest(cutPoint), desiredLevel)
    };


    fitness = (desiredLevel) => {
        return desiredLevel - this.level
    };

}