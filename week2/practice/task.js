function task1() {
    setTimeout(() => {
        console.log('task1');
    },0);
}

function task2() {
    console.log('task2');
}

function task3() {
    console.log('task3');
}

//0초 라서,, 바로 task1 -> task2 -> task3로 나올 줄 알았다
//하지만, 결과는 task2 -> task3 -> task1
//그 이유는?!
//스케줄러가 할일을 다 끝내고 0초후에 task1을 실행
task1();
task2();
task3();