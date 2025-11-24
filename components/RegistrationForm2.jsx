
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
         

          {/* داخلہ نمبر + مطلوبہ درجہ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="admissionNo" className="block mb-1 font-medium text-gray-700">
                داخلہ فارم نمبر
              </label>
              <input
                type="text"
                id="admissionNo"
                name="admissionNo"
                value={formData.admissionNo}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="grade" className="block mb-1 font-medium text-gray-700">
                مطلوبہ درجہ یا کلاس
              </label>
              <select
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-green-400 focus:outline-none appearance-none text-sm"
              >
                <option value="">انتخاب کریں</option>
                {shuabay.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* نام + ولدیت */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
                نام
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="parent" className="block mb-1 font-medium text-gray-700">
                ولدیت
              </label>
              <input
                type="text"
                id="parent"
                name="parent"
                value={formData.parent}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* گاوں + ضلع */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="village" className="block mb-1 font-medium text-gray-700">
                گاوں
              </label>
              <input
                type="text"
                id="village"
                name="village"
                value={formData.village}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="district" className="block mb-1 font-medium text-gray-700">
                ضلع
              </label>
              <select
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-green-400 focus:outline-none"
              >
                <option value="">انتخاب کریں</option>
                {Object.keys(allDistricts).map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* تحصیل + شناختی کارڈ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="tehsil" className="block mb-1 font-medium text-gray-700">
                تحصیل
              </label>
              <select
                id="tehsil"
                name="tehsil"
                value={formData.tehsil}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-green-400 focus:outline-none"
                disabled={!formData.district}
              >
                <option value="">انتخاب کریں</option>
                {tehsils.map((tehsil, index) => (
                  <option key={index} value={tehsil}>
                    {tehsil}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="cnic" className="block mb-1 font-medium text-gray-700">
                شناختی کارڈ
              </label>
              <input
                type="text"
                id="cnic"
                name="cnic"
                value={formData.cnic}
                onChange={handleChange}
                placeholder="00000-00000000-0"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>
          </div>

          {/* رابطہ نمبر + سربراہ کا نام */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact" className="block mb-1 font-medium text-gray-700">
                رابطہ نمبر
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="0000-0000000"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="guardian" className="block mb-1 font-medium text-gray-700">
                سربراہ کا نام
              </label>
              <input
                type="text"
                id="guardian"
                name="guardian"
                value={formData.guardian}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="guardianFather" className="block mb-1 font-medium text-gray-700">
                ولدیت
              </label>
              <input
                type="text"
                id="guardianFather"
                name="guardianFather"
                value={formData.guardianFather}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block mb-1 font-medium text-gray-700">
                تاریخ پیدائش
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>
          </div>

          {/* پتہ */}
          <div>
            <label htmlFor="address" className="block mb-1 font-medium text-gray-700">
              پتہ
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          {/* احاطہ منتخب کریں + کمرے */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ahata" className="block mb-1 font-medium text-gray-700">
                احاطہ منتخب کریں
              </label>
              <select
                id="ahata"
                name="ahata"
                value={formData.ahata}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              >
                <option value="">انتخاب کریں</option>
                {Object.keys(ahataData).map((ahata, i) => (
                  <option key={i} value={ahata}>{ahata}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="room" className="block mb-1 font-medium text-gray-700">
                کمرہ نمبر
              </label>
              <select
                id="room"
                name="room"
                value={formData.room}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              >
                <option value="">انتخاب کریں</option>
                {rooms.map((room, i) => (
                  <option key={i} value={room}>{room}</option>
                ))}
              </select>
            </div>

            
          </div>

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


          <hr className="h-[2px] bg-gray-400 border-0 rounded" />
          <h3 className="text-2xl text-center text-gray-700 mb-4 heading">جدید طلبہ کے لیے</h3>

          {/* سابقہ مدرسہ */}
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            <div>
              <label htmlFor="previousSchool" className="block mb-1 font-medium text-gray-700">
                سابقہ مدرسہ (نام اور پتہ)
              </label>
              <input
                type="text"
                id="previousSchool"
                name="previousSchool"
                value={formData.previousSchool}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>
          </div>

          {/* اخری پاس کردہ درجہ/کلاس + تقدیر */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="lastClass" className="block mb-1 font-medium text-gray-700">
                اخری پاس کردہ درجہ/کلاس
              </label>
              <select
                id="lastClass"
                name="lastClass"
                value={formData.lastClass}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-green-400 focus:outline-none appearance-none text-sm"
              >
                <option value="">انتخاب کریں</option>
                {shuabay.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="taqdeer" className="block mb-1 font-medium text-gray-700">
                تقدیر
              </label>
              <select
                id="taqdeer"
                name="taqdeer"
                value={formData.taqdeer}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-green-400 focus:outline-none appearance-none text-sm"
              >
                <option value="">انتخاب کریں</option>
                {taqdeer.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold text-lg shadow-md transition"
          >
            جمع کریں
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputForm;