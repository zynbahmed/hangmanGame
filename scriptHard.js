const wordText = document.querySelector('.word')
const guessesText = document.querySelector('.guesses')
const kb = document.querySelector('.keyboard')
const img = document.querySelector('.hangman img')
const gameEndsDiv = document.querySelector('.game-ends')
const reset = gameEndsDiv.querySelector('.reset')
const timer = document.getElementById('timer')

const API_URL = 'https://random-word-api.herokuapp.com/all'

let currentWord, correctLtr, wrongGuesses
const maxGuesses = 6

let timerInterval

const startGameTimer = (durationInSeconds) => {
    let timeLeft = durationInSeconds

    timerInterval = setInterval(() => {
        timer.innerText = timeLeft

        if (timeLeft === 0) {
            clearInterval(timerInterval)
            gameEnds(false)
        }
        timeLeft--
    }, 1000)
}

const shuffleKeyboard = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
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
    clearInterval(timerInterval)
}

const resetGame = () => {
    kb.innerHTML = ""
    correctLtr = []
    wrongGuesses = 0
    img.src = "images/hangman-0.png"
    guessesText.innerText = `Incorrect Guesses: ${wrongGuesses} / ${maxGuesses}`
    wordText.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("")
    kb.querySelectorAll("button").forEach(btn => btn.disabled = false)

    const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i))
    shuffleKeyboard(letters)
    for (const letter of letters) {
        const button = document.createElement("button")
        button.innerText = letter
        kb.appendChild(button)
        button.addEventListener("click", (e) => gameStart(e.target, letter))
    }

    gameEndsDiv.classList.remove("show")
    clearInterval(timerInterval)
}

getRandomWord()
reset.addEventListener("click", getRandomWord)