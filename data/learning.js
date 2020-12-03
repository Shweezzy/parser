function delay(ms) {
    return new Promise(r => {
        setTimeout(() => r(), ms)

    })
}

delay(2000).then(() => console.log('a'))

const url = "https://jsonplaceholder.typicode.com/todos/1"

async function fet() {
    return delay(2000).then(() => {
        return fetch(url)
    })
        .then(response => response.json())
        .then(data => console.log(data))

}
fet()

