const wordText = document.querySelector('.word')
const hintText = document.querySelector('.hint')
const guesses = document.querySelector('.guesses')
const kb = document.querySelector('.keyboard')
const img = document.querySelector('.hangman img')
const gameEndsDiv = document.querySelector('.game-ends')
const reset = gameEndsDiv.querySelector('.reset')

let currentWord, correctLtr, wrongGuesses
const maxGuesses = 6

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]
    currentWord = word
    hintText.innerText = hint
    //resetGame();
}

const gameStart = (button, letterClicked) => {

}

const gameEnds = (isVictory) => {

}

const resetGame = () => {
    
}

getRandomWord()
playAgainBtn.addEventListener("click", getRandomWord)