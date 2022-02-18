let counter = 0
let json = {}
const h1 = document.querySelector('main h1')
const h2 = document.querySelector('main h2')
const footer = document.querySelector('footer')
let localCounters = document.querySelectorAll('footer span')

function incrementCount(that) {
    h1.innerText = ++counter
    h2.innerText = that.previousElementSibling.previousElementSibling.innerText
    that.previousElementSibling.innerText = counter
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
        counter.innerText = json.counters[index + 1] || 0
    })
}
readFromLocalStorage()


const toggleTheme = () => {
    const bool = document.documentElement.classList.toggle('dark')
    const theme = bool ? 'dark' : 'light'
    localStorage.setItem('theme', theme)
}



const updateCounters = sign => {
    const currentCounters = localCounters.length
    if (sign == '+') {
        const newCounter = `
        <div class="bg-neutral-200 rounded-md flex flex-col items-center p-10 gap-5 dark:bg-neutral-800 flex-1">
            <h2 class="text-lg">Counter #${currentCounters + 1}</h2><span class="font-black text-5xl">0</span><button
                class="bg-black text-white px-3 py-1 rounded dark:bg-white dark:text-black"
                onclick="incrementCount(this)">+</button>
        </div>
        `
        footer.innerHTML += newCounter
    }
    localCounters = document.querySelectorAll('footer span')
}


document.addEventListener('keypress', e => {
    if (!(e.code.includes('Numpad') || e.code.includes('Digit'))) return
    const numberPressed = e.code.replace('Numpad', '').replace('Digit', '')
    if (localCounters.length >= numberPressed)
        localCounters[numberPressed - 1].nextElementSibling.click()
})
