var team2 = {
    member : [
        { name : '박우영', nickname : '우영', age : 25 },
        { name : '김민지', nickname : '민지', age : 24 },
        { name : '홍민정', nickname : '민정', age : 22 },
        { name : '최영훈', nickname : '영훈', age : 26 }
    ],

    printInfo : function() {
        this.member.forEach( 
            item => console.log("이름 : " + item.name + ", 별명 : " + item.nickname + ", 나이 :" + item.age)
        )
    },

    addMember : function(name, nickname, age) {
        let obj ={};
        obj.name = name;
        obj.nickname = nickname;
        obj.age = age;
        this.member.push(obj);

    }
};

team2.printInfo();
team2.addMember("성찬", "kohen", 30);
team2.printInfo();