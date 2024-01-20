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
    //resetGame()
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
    if(wrongGuessCount === maxGuesses) return gameEnds(false)
    if(correctLtr.length === currentWord.length) return gameEnds(true)
}

const gameEnds = (isVictory) => {
    const vicText = isVictory ? `You got the word:` : 'The correct word was:'
    gameEndsDiv.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`
    gameEndsDiv.querySelector("h2").innerText = isVictory ? 'You Won!' : 'Game Over!'
    gameEndsDiv.querySelector("p").innerHTML = `${vicText} <b>${currentWord}</b>`
    gameEndsDiv.classList.add("show")
}

const resetGame = () => {
}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button")
    button.innerText = String.fromCharCode(i)
    kb.appendChild(button)
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)))
}

getRandomWord()
playAgainBtn.addEventListener("click", getRandomWord)