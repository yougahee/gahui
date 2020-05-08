
let asyncFunc1 = (msg) =>
new Promise((resolve) => {
    setTimeout(() => {
        resolve(`func1 : ${msg}`)
    }, 1000)
})

let asyncFun2 = (msg) =>
new Promise((resolve) => {
    setTimeout(() => {
        resolve(`func2 : ${msg}`)
    },1000)
})

function promiseMain () {
    asyncFunc1('Hello').then((result) => {
        console.log(result)
        return asyncFun2('world')
    }).then((result) => {
        console.log(result)
    })
}

//async function
async function asyncMain() {
    let result = await asyncFunc1('Hello')
    console.log(result)
    result = await asyncFun2('world')
    console.log(result)
}

promiseMain()
//asyncMain()