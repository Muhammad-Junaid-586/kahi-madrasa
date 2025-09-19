// let arr = [1,2,3,4,5]

// let res = arr.map((item)=>{
//   return item = 8;
// })

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

// let abc = 25;

// if (function f() {}) {
//   abc = abc + typeof f;
// }
// console.log(abc);


// let str = 'my name is junaid';
// let res = str.split(' ').reverse().join(' ');
// console.log(res);

// let res = str.split(" ").map((item)=>{
//   return item = item.split("").reverse().join('');
// })

// console.log(res);
let str = 'my name is junaid';
// let res = str.split(" ")
// console.log(res);

// let count = []
// for (let i = res.length-1; i >= 0; i--) {
  
//   count.push(res[i])
//   console.log(count);
  
  
// }
// let result = count.join(" ")
// console.log(result);

let res = str.split(" ").reverse().map((item)=>{
  return item = item.split("").reverse().join('');
})

console.log(res);

// // for (let i = 0; i < res.length; i++) {
// //   // console.log(res[i]);
// //   // for (let j = i; j < res.length; j++) {
// //   //   console.log(res[i], res[j]);
    
    
// //   // }
// //  let count =  i.reduce((acc,curr)=>{
// //   console.log(acc,curr);
// //  } ,0)

// //  console.log(count);
// // }

// // for (let i = 0; i < str.length; i++) {
// //   if (str[i] !== ' ') {
// //     console.log(str[i]);
    
// //   }else{
// //     console.log(str[i]);
// //     console.log(str.length);
    
// //   }
  
// // }

// // let result = str.trim();
// // console.log(result.length);

// let count = 0;
// for (let i = 0; i < str.length; i++) {
//   if (str[i] !== ' ') {
//     // console.log(str[i]);
//     count++
//     // console.log(count);
    
    
//   }
//   // console.log(count);
  
// }

// let response = str.replace(/ /g, "").length;
// // console.log(response);