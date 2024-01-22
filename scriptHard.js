const wordText = document.querySelector('.word')
const guessesText = document.querySelector('.guesses')
const kb = document.querySelector('.keyboard')
const img = document.querySelector('.hangman img')
const gameEndsDiv = document.querySelector('.game-ends')
const reset = gameEndsDiv.querySelector('.reset')
const timerElement = document.getElementById('timer'); // New element for the timer

const API_URL = 'https://random-word-api.herokuapp.com/all'

let currentWord, correctLtr, wrongGuesses
const maxGuesses = 6

const startGameTimer = (durationInSeconds) => {
    let timeLeft = durationInSeconds;

    const timerInterval = setInterval(() => {
        timerElement.textContent = timeLeft

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            gameEnds(false)
        }
        timeLeft--
    }, 1000)
}

const getRandomWord = async () => {
    const response = await axios.get(API_URL)
    const words = response.data

    const randomIndex = Math.floor(Math.random() * words.length)
    const randomWord = words[randomIndex]

    currentWord = randomWord
    resetGame()
    startGameTimer(60)
}

const gameStart = (button, letterClicked) => {
    if(currentWord.includes(letterClicked)) {
        [...currentWord].forEach((letter, index) => {
            if(letter === letterClicked) {
                correctLtr.push(letter)
                wordText.querySelectorAll("li")[index].innerText = letter
                wordText.querySelectorAll("li")[index].classList.add("guessed")
            }
        })
    } else {
        wrongGuesses++
        img.src = `images/hangman-${wrongGuesses}.png`
    }
    button.disabled = true
    guessesText.innerText = `Incorrect Guesses: ${wrongGuesses} / ${maxGuesses}`
    if(wrongGuesses === maxGuesses) return gameEnds(false)
    if(correctLtr.length === currentWord.length) return gameEnds(true)
}

const gameEnds = (isVictory) => {
    const vicText = isVictory ? `You got the word:` : 'The correct word was:'
    gameEndsDiv.querySelector("h2").innerText = isVictory ? 'You Won!' : 'Game Over!'
    gameEndsDiv.querySelector("p").innerHTML = `${vicText} <b>${currentWord}</b>`
    gameEndsDiv.classList.add("show")
}

const resetGame = () => {
    correctLtr = []
    wrongGuesses = 0
    img.src = "images/hangman-0.png"
    guessesText.innerText = `Incorrect Guesses: ${wrongGuesses} / ${maxGuesses}`
    wordText.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("")
    kb.querySelectorAll("button").forEach(btn => btn.disabled = false)
    gameEndsDiv.classList.remove("show")
}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button")
    button.innerText = String.fromCharCode(i)
    kb.appendChild(button)
    button.addEventListener("click", (e) => gameStart(e.target, String.fromCharCode(i)))
}

getRandomWord()
reset.addEventListener("click", getRandomWord)