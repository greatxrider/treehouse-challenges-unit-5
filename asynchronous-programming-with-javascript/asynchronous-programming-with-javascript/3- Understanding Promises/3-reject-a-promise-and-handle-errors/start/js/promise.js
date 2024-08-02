function addFive(n) {
    return n + 5;
}
function double(n) {
    return n * 2;
}
function finalValue(nextValue) {
    console.log(`The final value is ${nextValue}`);
}

const mathPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve promise if 'value' is a number; otherwise, reject it
        if (typeof value === 'number') {
            resolve(value);
        } else {
            reject('You must specify a number as the value.')
        }
    }, 1000);
});

const value = 5;

mathPromise
    .then(addFive)
    .catch(err => console.log(err))
