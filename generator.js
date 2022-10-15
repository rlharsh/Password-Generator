const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?",
    "/"
];

let passwordContainerOne = document.getElementById("password-container-one")
let passwordContainerTwo = document.getElementById("password-container-two")
let allowNumbers = document.getElementById("options-allow-numbers")
let allowSymbols = document.getElementById("options-allow-symbols")

var slider = document.getElementById("options-range")
var rangeDescription = document.getElementById("range-description")

slider.oninput = function() {
    rangeDescription.textContent = "Password Length: " + this.value
}

function getRandomPassword() {
    return generatePassword()
}

function generatePassword() {
    let temporaryPasswordOne = ""
    let temporaryPasswordTwo = ""
    let testingNumberOne = ""
    let testingNumberTwo = ""
    let testPassed = false

    for (let i = 0; i < slider.value; i++) {
        testingNumberOne = characters[Math.floor(Math.random() * characters.length)]
        testingNumberTwo = characters[Math.floor(Math.random() * characters.length)]

        if (allowNumbers.checked === true && allowSymbols.checked === true) {
            testPassed = true
        } else if (allowNumbers.checked === true && allowSymbols.checked === false) {
            if (isNumberButNotLetter(testingNumberOne) === false || isNumberButNotLetter(testingNumberTwo) === false) {
                i--
                testingNumberOne = ""
                testingNumberTwo = ""
                testPassed = false
            } else {
                testPassed = true
            }
        } else if (allowNumbers.checked === false && allowSymbols.checked === true) {
            if (isNumber(testingNumberOne) === true || isNumber(testingNumberTwo) === true) {
                i--
                testingNumberOne = ""
                testingNumberTwo = ""
                testPassed = false
            } else {
                testPassed = true
            }
        }

        if (testPassed === true) {
            temporaryPasswordOne += testingNumberOne
            temporaryPasswordTwo += testingNumberTwo
        }
    }

    if (testPassed === true) {
        passwordContainerOne.value = temporaryPasswordOne
        passwordContainerTwo.value = temporaryPasswordTwo
    }
}

function isNumberButNotLetter(c) {
    let queryOne = isNumber(c)
    let queryTwo = isLetter(c)

    if (queryOne === true) {
        return true
    }
    if (queryTwo === true) {
        return true
    }
    return false
}

function isNumber(c) {
    return /\d/.test(c);
}

function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
}

function copyPasswordOne() {
    passwordContainerOne.select()
    passwordContainerOne.setSelectionRange(0, 99999)

    navigator.clipboard.writeText(passwordContainerOne.value)
    alert("Copied the text: " + passwordContainerOne.value)
}

function copyPasswordTwo() {
    passwordContainerTwo.select()
    passwordContainerTwo.setSelectionRange(0, 99999)

    navigator.clipboard.writeText(passwordContainerTwo.value)
    alert("Copied the text: " + passwordContainerTwo.value)
}