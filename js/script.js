let counter = 0
let json = {}
const h1 = document.querySelector('main h1')
const h2 = document.querySelector('main h2')
const localCounters = document.querySelectorAll('footer span')

function incrementCount(that) {
    h1.innerText = ++counter
    h2.innerText = that.previousSibling.previousSibling.innerText
    that.previousSibling.innerText = counter
    writeToLocalStorage()
    const counterNo = h2.innerText.replace('Counter #', '')
    const voice = `Token number ${counter}, please proceed to counter number ${counterNo}.`
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(voice))
}

const reset = () => {
    h1.innerText = counter = 0
    h2.innerText = ''
    localCounters.forEach(counter => counter.innerText = 0)
    localStorage.removeItem('counterData')
}

const writeToLocalStorage = () => {
    json.main = {}
    json.main['counter'] = counter
    json.main['counterNo'] = h2.innerText
    json.counters = {}
    localCounters.forEach((counter, index) => {
        json.counters[index + 1] = counter.innerText
    })
    localStorage.setItem('counterData', JSON.stringify(json))
}

const setData = (el, data) => {
    el.innerText = data
}

const setTheme = () => {
    if (localStorage.theme === 'dark')
        document.documentElement.classList.add('dark')
    else
        document.documentElement.classList.remove('dark')
}
setTheme()

const readFromLocalStorage = () => {
    const jsonString = localStorage.getItem('counterData')
    if (!jsonString) return
    json = JSON.parse(jsonString)
    setData(h1, json.main.counter)
    setData(h2, json.main.counterNo)
    counter = json.main.counter
    localCounters.forEach((counter, index) => {
        counter.innerText = json.counters[index + 1]
    })
}
readFromLocalStorage()


const toggleTheme = () => {
    const bool = document.documentElement.classList.toggle('dark')
    const theme = bool ? 'dark' : 'light'
    localStorage.setItem('theme', theme)
}
