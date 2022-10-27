const RANDOM_API_URL_QUOTES = 'http://api.quotable.io/random'
const textDisplay = document.getElementById('textDisplay')
const textInput = document.getElementById('textInput')
const timer = document.getElementById('timer')


textInput.addEventListener('input', () => {
    const arrayQuote = textDisplay.querySelectorAll('span')
    const arrayValue = textInput.value.split('')

    let correct = true

    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if(character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        }
        else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })

    if (correct) renderNewQuote()
})

function getRandomQuote() {
    return fetch(RANDOM_API_URL_QUOTES)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote () {
    const quote = await getRandomQuote()
    textDisplay.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        textDisplay.appendChild(characterSpan)
    }) 
    textInput.value = null
    startTimer()
}

let startTime
function startTimer () {
timer.innerText = 0
startTime = new Date()
setInterval(() => {
timer.innerText = getTimerTime()
}, 1000)
}

function getTimerTime () {
  return  Math.floor((new Date() - startTime) / 1000)

}
renderNewQuote()

