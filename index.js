// // let arr = [1,2,3,4,5]

// // let res = arr.map((item)=>{
// //   return item = 8;
// // })

// // console.log(res);

// // let obj = {
// //   a : 1,
// //   b : 2,
// //   c : 3
// // }

// // let res2 = Object.entries(obj);
// // console.log(res2);

// // let a = [1, "q", 3 , 'junaid', 5 , "c"];

// // let  num = [];
// // let str = [];
// // let chr = [];

// // a.forEach((item)=>{
// //   if(typeof item === "number"){
// //     num.push(item);
// //   }else if(typeof item === "string" && item.length > 1){
// //     str.push(item);
// //   }else{
// //     chr.push(item);
// //   }
// // })

// // console.log(num);
// // console.log(str);
// // console.log(chr);


// // let obj1 = {}
// // let obj2 = {
// //   name : "junaid"
// // }
// // let obj3 = {
// //   name : 'asad'
// // }


// // obj1[obj2] ={
// //   name : 'farman'
// // }
// // obj1[obj3] = {
// //   name : 'ahmed'
// // }

// // console.log(obj1[obj2]);


// // function sum(a , b){
// //   if (a && b) {
// //     return a + b
    
// //   }else{
// //   return function(b){
// //       return a + b
// //     }
// //   }
// // }

// // console.log(sum(1)(2));
// // console.log(sum(1,2));


// // console.log([]===[]);
// // console.log([]==[]);

// // let obj = {
// //   a:{
// //     b : undefined
// //   }
// // }

// // console.log(obj.a?.b?.c?.d??"junaid");

// // let abc = 25;

// // if (function f() {}) {
// //   abc = abc + typeof f;
// // }
// // console.log(abc);


// // let str = 'my name is junaid';
// // let res = str.split(' ').reverse().join(' ');
// // console.log(res);

// // let res = str.split(" ").map((item)=>{
// //   return item = item.split("").reverse().join('');
// // })

// // console.log(res);
// let str = 'my name is junaid';
// // let res = str.split(" ")
// // console.log(res);

// // let count = []
// // for (let i = res.length-1; i >= 0; i--) {
  
// //   count.push(res[i])
// //   console.log(count);
  
  
// // }
// // let result = count.join(" ")
// // console.log(result);

// let res = str.split(" ").reverse().map((item)=>{
//   return item = item.split("").reverse().join('');
// })

// console.log(res);

// // // for (let i = 0; i < res.length; i++) {
// // //   // console.log(res[i]);
// // //   // for (let j = i; j < res.length; j++) {
// // //   //   console.log(res[i], res[j]);
    
    
// // //   // }
// // //  let count =  i.reduce((acc,curr)=>{
// // //   console.log(acc,curr);
// // //  } ,0)

// // //  console.log(count);
// // // }

// // // for (let i = 0; i < str.length; i++) {
// // //   if (str[i] !== ' ') {
// // //     console.log(str[i]);
    
// // //   }else{
// // //     console.log(str[i]);
// // //     console.log(str.length);
    
// // //   }
  
// // // }

// // // let result = str.trim();
// // // console.log(result.length);

// // let count = 0;
// // for (let i = 0; i < str.length; i++) {
// //   if (str[i] !== ' ') {
// //     // console.log(str[i]);
// //     count++
// //     // console.log(count);
    
    
// //   }
// //   // console.log(count);
  
// // }

// // let response = str.replace(/ /g, "").length;
// // // console.log(response);

// // function fibonacciUptoNineLength() {
// //   let a = 0, b = 1;
// //   const result = [a, b];

//   // while (true) {
//   //   let next = a + b;
//   //   if (String(next).length > 9) break; // stop if number exceeds 9 digits
//   //   result.push(next);
//   //   a = b;
//   //   b = next;
//   // }

// //   for (let i = 0; i < 9; i++) {
// //     let next = a + b;
// //     result.push(next);
// //     a = b;
// //     b = next;
    
// //   }

// //   console.log(result);
// // }

// // fibonacciUptoNineLength();


// // let obj = [
// //   {
// //     name : 'junaid',
// //     age : 23
// //   },
// //   {
// //     name : 'salman',
// //     age : 24
    
// //   },
// //   {
// //     name : 'irfan',
// //     age : 26
// //   }
// // ]

// // // let less = obj.map((item)=>{
// // //   if (item.age<24) {
// // //     return item
// // //   }
// // // })

// // let less = obj.filter((item)=>{
// //   return item.age<24
// // })
// // console.log(less);


// function abc(a,...b) {
//   console.log(b , typeof b);
  
// }

// abc(1,2,3)

// let str =  'muhammad junaid'

// let reverseStr = ()=>{
 
//   let res = str.split(" ")
//   for (let i = 0; i < res.length; i++) {
//    let result = str.split("").reverse().join('');
//    console.log(result);
    
//   }
// }

// reverseStr()

// if ([]) {
//   console.log('junaid');
  
// }else{
//   console.log('salman');
// }

// var a = 89;

// {
//   var a = 800;
// }

// let b = a ;

// {
//   let b = 900;
// }

// console.log(b);


// console.log('junaid' - 100);
// let arr = [,,,];
// let arr2 = [1,2,3,4];
// let arr3 = [[1,2,3],[4,5,6]];
// console.log(arr.length);
// console.log(arr2.length);
// console.log(arr3.length);

let arr = [1,35, 2, 77, 124, 34]
// console.log(arr.sort());
// let arr1 = arr.map((item)=>{
//   return item<100
// })
// let arr1 = arr.values(0)

// console.log(arr1);

// let a = 0 ?? 2;
// let b = 3
// let x = a || b;
// console.log(x);



// function abc(a, b, c) {
  
// }
// function pqr(a = 0 , b , c) {
  
// }

// console.log(abc.length);
// console.log(pqr.length);

// console.log([]===[]);
// console.log([]==[]);

// let a = 'my name is junaid khan'
// let b = a.split(" ")
// // console.log(b); 
// let c = b.map((item)=>{
//   console.log(item.charAt(0).toUpperCase()+item.slice(1));
// })



// var a = 10
// console.log(++a);
// console.log(a++);
// console.log(a);

// console.log(typeof NaN);
// console.log(NaN === NaN);
// console.log(NaN == NaN);

// const a = 10
// // console.log(++a);
// console.log(a++);
// console.log(a);




"use client";

import React, { useEffect, useState, useRef } from "react";
import "../components/styles/inputForm.css";
import axios from "axios";
import { pakistanData } from "@/public/assests/data";
import { useAppContext } from "@/context/AppContext";

// شعبے
const shuabay = [
  "درجہ دورہ حدیث",
  "درجہ موقوف علیہ",
  "درجہ سادسہ",
  "درجہ خاسہ",
  "درجہ رابعہ",
  "درجہ ثانیہ",
  "درجہ اولی",
  "درجہ متوسطہ",
  "درجہ اعدایہ",
  "شعبہ ناظرہ",
  "شعبہ حفظ",
  "شعبہ تخصص فی الفقہ الاسلامی",
  "شعبہ تخصص فی اللغة العربیہ",
  "شعبہ تجوید العلماء",
  "شعبہ تجوید للمعلمات",
];

// احاطے اور کمرے
const ahataData = {
  "حبیب منزل": 18,
  "جدید منزل": 15,
  "احاطہ عثمانیہ": 16,
  "احاطہ برہانیہ": 7,
  "احاطہ ابن عباس": 8,
  "احاطہ سعیدالکونین": 28,
  "احاطہ ابو بکر صدیق": 7,
  "دارالحافظ": 10,
};

const taqdeer = [
  { name: "راسب", range: "1 تا 239 نمبر" },
  { name: "مقبول", range: "240 تا 299 نمبر" },
  { name: "جید", range: "300 تا 359 نمبر" },
  { name: "جید جداً", range: "360 تا 479 نمبر" },
  { name: "ممتاز", range: "480 تا 600 نمبر" },
];

const InputForm = () => {
  const [formData, setFormData] = useState({
    admissionNo: "",
    name: "",
    parent: "",
    village: "",
    district: "",
    tehsil: "",
    cnic: "",
    contact: "",
    guardian: "",
    guardianFather: "",
    dateOfBirth: "",
    address: "",
    room: "",
    previousSchool: "",
    lastClass: "",
    grade: "",
    ahata: "",
    ahataRooms: "",
    taqdeer: "",
    taqdeerRange: "",
    image: null, // New image field
  });

  const [imagePreview, setImagePreview] = useState(null);

  // Camera feature state
  const [usingCamera, setUsingCamera] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const { fetchStudentsData } = useAppContext();

  // districts and tehsil extraction
  const getAllDistricts = () => {
    const districts = {};
    pakistanData.Pakistan.provinces.forEach(province => {
      province.divisions.forEach(division => {
        division.districts.forEach(district => {
          districts[district.name] = district.tehsils;
        });
      });
    });
    return districts;
  };

  const allDistricts = getAllDistricts();
  const [tehsils, setTehsils] = useState([]);

  useEffect(() => {
    if (formData.district && allDistricts[formData.district]) {
      setTehsils(allDistricts[formData.district]);
      setFormData(prev => ({ ...prev, tehsil: "" }));
    } else {
      setTehsils([]);
    }
  }, [formData.district]);

  // Input field handler (with ahata logic)
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "ahata") {
      setFormData(prev => ({
        ...prev,
        ahata: value,
        ahataRooms: value ? ahataData[value] : "",
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Image upload handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('براہ کرم صرف تصویری فائل اپ لوڈ کریں');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('تصویری فائل کا سائز 5MB سے زیادہ نہیں ہونا چاہیے');
        return;
      }
      setFormData(prev => ({
        ...prev,
        image: file,
      }));
      // Create preview
      const reader = new FileReader();
      reader.onload = e => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Camera feature: Start camera
  const startCamera = async () => {
    setUsingCamera(true);
    setCameraActive(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  };

  // Camera feature: Capture picture
  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
      setFormData(prev => ({ ...prev, image: blob }));
      setImagePreview(URL.createObjectURL(blob));
    }, "image/jpeg");
    stopCamera();
  };

  // Camera feature: Stop camera
  const stopCamera = () => {
    setCameraActive(false);
    setUsingCamera(false);
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
    }));
    setImagePreview(null);
    const fileInput = document.getElementById('image');
    if (fileInput) fileInput.value = '';
  };

  function loopingRooms(room) {
    let rooms = [];
    for (let i = 1; i <= room; i++) {
      rooms.push(i);
    }
    return rooms;
  }

  const rooms = formData.ahata ? loopingRooms(ahataData[formData.ahata]) : [];

  // FORM SUBMIT HANDLER (same as before)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.parent || !formData.contact) {
      alert('براہ کرم تمام ضروری فیلڈز پر کرنے');
      return;
    }
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'image' && formData[key]) {
          submitData.append('image', formData[key]);
        } else {
          submitData.append(key, formData[key]);
        }
      });
      const res = await axios.post("/api/student/create", submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data.success) {
        alert("✅ فارم کامیابی سے جمع ہوگیا");
        setFormData({
          admissionNo: "",
          name: "",
          parent: "",
          village: "",
          district: "",
          tehsil: "",
          cnic: "",
          contact: "",
          guardian: "",
          guardianFather: "",
          dateOfBirth: "",
          address: "",
          room: "",
          previousSchool: "",
          lastClass: "",
          grade: "",
          ahata: "",
          taqdeer: "",
          ahataRooms: "",
          image: null,
        });
        setImagePreview(null);
        fetchStudentsData();
      } else {
        alert("❌ " + res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ سرور پر مسئلہ ہے");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 to-green-200 ">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8" dir="rtl">
        <h1 className="text-2xl font-bold text-center mb-6 text-green-700 heading">
          جامعہ دارالعلوم سراج الاسلام کاہی ہنگو
        </h1>
        <h2 className="text-2xl text-center mb-6 text-green-700 heading">
          داخلہ فارم
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* ... Existing form fields ... */}

          {/* تصویر اپ لوڈ یا لیں */}
          <div className="flex flex-col items-center mb-6">
            <label className="block mb-3 font-medium text-gray-700 text-lg">
              تصویر اپ لوڈ کریں یا لیں
            </label>
            {/* Choice Buttons */}
            <div className="flex gap-2 mb-4">
              <button type="button" className="bg-green-400 px-4 py-2 rounded-lg text-white" onClick={() => { stopCamera(); setUsingCamera(false); }}>اپ لوڈ</button>
              <button type="button" className="bg-blue-400 px-4 py-2 rounded-lg text-white" onClick={startCamera}>تصویر لیں</button>
            </div>
            {/* File Input (if not using camera) */}
            {!usingCamera && (
              <div className="flex flex-col items-center">
                <label
                  htmlFor="image"
                  className="cursor-pointer bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  {formData.image ? 'تصویر تبدیل کریں' : 'تصویر منتخب کریں'}
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <p className="text-sm text-gray-500 mt-2 heading">
                  جیپی جی، پی این جی یا جی آئی ایف فارمیٹ (زیادہ سے زیادہ سائز: 5MB)
                </p>
              </div>
            )}
            {/* Camera Stream */}
            {usingCamera && cameraActive && (
              <div className="flex flex-col items-center">
                <video ref={videoRef} width={320} height={240} autoPlay></video>
                <canvas ref={canvasRef} width={320} height={240} style={{ display: "none" }} />
                <button type="button" className="bg-blue-500 px-6 py-3 rounded-lg text-white mt-3" onClick={captureImage}>تصویر محفوظ کریں</button>
                <button type="button" className="bg-red-500 px-4 py-2 rounded-lg text-white mt-2" onClick={stopCamera}>بند کریں</button>
              </div>
            )}
            {/* Image Preview */}
            {imagePreview && (
              <div className="relative mb-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-full border-4 border-green-200"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center align-center text-center text-sm"
                >
                  ×
                </button>
              </div>
            )}
          </div>

















{/* context page */}

"use client"


import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const AppContext = createContext();


export const useAppContext = ()=>{
  return useContext(AppContext)
}


export const AppContextProvider = ({children})=>{
  


  const [students, setStudents] = useState([])



  const fetchStudentsData = async () => {
        try {
          const { data } = await axios.get('/api/student/get')
          if (data.success) {
            console.log(data.students)
            setStudents(data.students)
          }
        } catch (error) {
          console.error("Error fetching students:", error)
        }
      }
  
    useEffect(() => {
      
  
      fetchStudentsData()
    }, [])
   
  const value = {
   fetchStudentsData,


   students,
   setStudents


  }



  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
now in this file i want to add the logic for getting grade