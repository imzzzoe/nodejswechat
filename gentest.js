/**
 * Created by liuzhuo on 2016/12/5.
 */
var gen = function*(n) {
    for(var i = 0; i<3; i++) {
        n++;

        yield n;
    }
};
// create a object, do not execute gen()
var genObj = gen(2);
//execute 1st time, n=3
console.log(genObj.next())
//execute 1st time, n=4
console.log(genObj.next())
//execute 1st time, n=5
console.log(genObj.next())
//execute 1st time, undefined
console.log(genObj.next())

