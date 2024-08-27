const inputsContainer = document.querySelector(".inputs"),
  discTitle = document.querySelector(".disc"),
  guessCount = document.querySelector(".guess_count"),
  resetButton = document.querySelector("button"),
  typing = document.querySelector(".typing"),
  winAudio = new Audio("/audios_succ.mp3"),
  winner = document.querySelector(".win");

// all words
const words = [
  {
    word: "react",
    disc: "JavaScript library",
  },
  {
    word: "vue",
    disc: "JavaScript Framework",
  },
  {
    word: "angular",
    disc: "JavaScript MVW Framework",
  },
  {
    word: "nodejs",
    disc: "JavaScript runtime environment",
  },
  {
    word: "php",
    disc: "general-purpose scripting language",
  },
  {
    word: "ruby",
    disc: "open source programming language",
  },
  {
    word: "python",
    disc: "Programming Language",
  },
  {
    word: "tailwind",
    disc: "A utility-first CSS framework",
  },
  {
    word: "bootstrap",
    disc: "world's most famous free CSS framework",
  },
]
// variables
let word , maxGuess = 10 ,countToWin = [] ;

let winFest = `<dotlottie-player
src="https://lottie.host/3342bdc4-e83d-48b2-b248-c928064174ff/nmqHKnU6sS.lottie"
background="transparent"
speed="1"
style="width: 100%; height: 100vh"
direction="1"
mode="normal"
loop
autoplay
></dotlottie-player>`

// Events
document.addEventListener("keydown",() => typing.focus())

typing.addEventListener("input",startGame)

resetButton.addEventListener("click",getRandomWord)

// Functions
function getRandomWord() {
  reset()
  let randomObject = words[Math.floor(Math.random() * words.length)]
  let disc = randomObject.disc
  discTitle.innerHTML = disc
  word = randomObject.word 
  guessCount.innerHTML = maxGuess
  let inputs = ""
  for(let i=0 ; i<word.length ;i++) {
    inputs += `<input type="text" disabled >`
  }
  inputsContainer.innerHTML = inputs
  console.log(inputsContainer)
  console.log(word)
}
getRandomWord()

function startGame(e) {
  const char = e.target.value 
  if (!char.match(/[a-z]/i)) {typing.value = ""};
  if(word.includes(char)) {
    for(i=0 ;i<word.length ; i++) {
      if(word[i] === char && !inputsContainer.querySelectorAll("input")[i].value) {
        inputsContainer.querySelectorAll("input")[i].value = char
        countToWin.push(char)
      }
    }
  } else {
    maxGuess -- ;
  }
  guessCount.innerHTML = maxGuess
  typing.value = "";

  if(word.length === countToWin.length) {
    countToWin = []
    winAudio.play()
    winner.innerHTML = winFest
  }
  setTimeout(() => {
    if (maxGuess === 0) {
      alert("You should work hard more than this yaa lllooossser") 
      for (let index = 0; index < word.length; index++) {
        
        inputsContainer.querySelectorAll("input")[index].value = word[index]
        
      }
    }
  });
}


function reset() {
  countToWin = [] 
  maxGuess = 10 
  winAudio.pause()
  winAudio.currentTime = 0
  winner.innerHTML = ""
}