const word = document.querySelector('.word')
const hint = document.querySelector('.hint')
const guesses = document.querySelector('.guesses')
const kb = document.querySelector('.keyboard')
const img = document.querySelector('.hangman img')
const gameEnds = document.querySelector('.game-ends')
const reset = gameEnds.querySelector('.reset')

let currentWord, correctLtr, wrongGuesses
const maxGuesses = 6

