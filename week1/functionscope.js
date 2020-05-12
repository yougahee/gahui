var is;

function funcscope() {
    var v1 = 123;

    if(true) {
        var v2 = 123;
        let l1 = 'abc';
        console.log('let은 Block Scope, l1 : ', l1);

        is = false;
    }

    //console.log('let은 Block Scope, l1 : ', l1);
    console.log("v2 : ", v2);
    
    console.log("is :", is);
    
}


console.log("is :", is);

//console.log("v1 : ", v1);

funcscope();