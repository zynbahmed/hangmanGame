const wordText = document.querySelector('.word')
const hintText = document.querySelector('.hint')
const guessesText = document.querySelector('.guesses')
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
    if(currentWord.includes(letterClicked)) {
        [...currentWord].forEach((letter, index) => {
            if(letter === letterClicked) {
                correctLtr.push(letter)
                wordText.querySelectorAll("li")[index].innerText = letter
                wordText.querySelectorAll("li")[index].classList.add("guessed")
            }
        });
    } else {
        wrongGuesses++;
        //hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
    }
    button.disabled = true
    guessesText.innerText = `${wrongGuesses} / ${maxGuesses}`
    if(wrongGuessCount === maxGuesses) return gameOver(false)
    if(correctLtr.length === currentWord.length) return gameOver(true)
}

const gameEnds = (isVictory) => {

}

const resetGame = () => {

}



getRandomWord()
playAgainBtn.addEventListener("click", getRandomWord)