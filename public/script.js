document.body.style.background = 'rgb(138, 255, 212)';

console.assert(document.body.style.background === 'rgb(138, 255, 211)', {
    errorMsg: "Nope, it's " + document.body.style.background
});