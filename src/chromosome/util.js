export const shuffle =(arr) => {
    let ctr = arr.length;
    let temp;
    let index;

    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = arr[ctr];
        arr[ctr] = arr[index];
        arr[index] = temp;
    }
    return arr;
};

export const Pair = (first, second) => {
   return {first,second}
};
export const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};