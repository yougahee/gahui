const fun1 = (param) => {
    return new Promise((resolved, rejected) => {
        setTimeout (() => {
            console.log('func1 return resolved');
            resolved (`func 1 success : ${param}\n`);
        }, 500);

    });
}

const fun2 = (param) => {
    return new Promise((resolved, rejected) => {
        setTimeout(() => {
            console.log('fun2 return rejected');
            rejected(new Error('func 2 error : ' + param + '\n'));
            
        }, 500);
    });
}

const fun3 = (param) => {
    
}