import {Pair} from "./util";

function isInBounds(size) {
    return position => (
        0 <= position.first && position.first < size &&
        0 <= position.second && position.second < size
    )
}

// fun isAvailable(size: Int, taken: Set<Pair<Int, Int>>) = { position: Pair<Int, Int> ->
// !taken.contains(position)
// }

function isAvailable(size, taken) {
    return position => !taken.has(position);
}


// fun(position: Pair<Int, Int>): Set<Pair<Int, Int>> {
//     val MoveTable = arrayOf(
//         Pair(+3, 0),
//         Pair(+2, +2),
//         Pair(0, +3),
//         Pair(-2, +2),
//         Pair(-3, 0),
//         Pair(-2, -2),
//         Pair(0, -3),
//         Pair(2, -2)
//     )
//     val isInBounds = isInBounds(size)
//     val isAvailable = isAvailable(size, taken)
//
//     val positions = MoveTable.map(addPosition(position))
//     val inBounds = positions.filter(isInBounds)
//     val available = inBounds.filter(isAvailable)
//     return available.toSet()

export function calculateAvailableMoves(size, taken) {
    let moveTable = [Pair(+3, 0), Pair(+2, +2), Pair(0, +3), Pair(-2, +2), Pair(-3, 0), Pair(-2, -2), Pair(0, -3), Pair(+2, -2)];
    let isInBounds = isInBounds(size);
    let isAvailable = isAvailable(size, taken);

    let positions = moveTable.map((position) => {
        return (it) => {
            Pair(it.first + position.first, it.second + position.second)
        };

    });

    let inBounds = positions.filter(isInBounds);
    let available = inBounds.filter(isAvailable);
    return new Set(available);
}
