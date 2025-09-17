let arr = [1,2,3,4,5]

let res = arr.map((item)=>{
  return item = 8;
})

// console.log(res);

// let obj = {
//   a : 1,
//   b : 2,
//   c : 3
// }

// let res2 = Object.entries(obj);
// console.log(res2);

// let a = [1, "q", 3 , 'junaid', 5 , "c"];

// let  num = [];
// let str = [];
// let chr = [];

// a.forEach((item)=>{
//   if(typeof item === "number"){
//     num.push(item);
//   }else if(typeof item === "string" && item.length > 1){
//     str.push(item);
//   }else{
//     chr.push(item);
//   }
// })

// console.log(num);
// console.log(str);
// console.log(chr);


// let obj1 = {}
// let obj2 = {
//   name : "junaid"
// }
// let obj3 = {
//   name : 'asad'
// }


// obj1[obj2] ={
//   name : 'farman'
// }
// obj1[obj3] = {
//   name : 'ahmed'
// }

// console.log(obj1[obj2]);


// function sum(a , b){
//   if (a && b) {
//     return a + b
    
//   }else{
//   return function(b){
//       return a + b
//     }
//   }
// }

// console.log(sum(1)(2));
// console.log(sum(1,2));


// console.log([]===[]);
// console.log([]==[]);

// let obj = {
//   a:{
//     b : undefined
//   }
// }

// console.log(obj.a?.b?.c?.d??"junaid");

let abc = 25;

if (function f() {}) {
  abc = abc + typeof f;
}
console.log(abc);
