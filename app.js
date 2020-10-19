function longRun(){
    setTimeout(function(){
        for (let index = 0; index < 100000; index++) {
            console.log('hello 0');
        }
    },0)
}
console.log("hello");

longRun()
const endDate = Date.now()
console.log("hello 2");
