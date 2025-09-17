"use client";

import React, { useState } from "react";
import  "../components/styles/inputForm.css";
import axios from "axios";

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
  "احاطہ برکاتیہ": 7,
  "احاطہ ابن عباس": 8,
  "احاطہ سیداکرم دین": 28,
  "احاطہ ابو ہریرہ صدیقی": 7,
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
    address: "",
    room: "",
    previousSchool: "",
    lastClass: "",
    grade: "",
    ahata: "",
    ahataRooms: "",
    taqdeer: "",
    taqdeerRange: "",
  });

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "ahata") {
      setFormData((prev) => ({
        ...prev,
        ahata: value,
        ahataRooms: value ? ahataData[value] : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/api/student/create", formData)

      if (res.data.success) {
        alert("✅ فارم کامیابی سے جمع ہوگیا")
        console.log("Saved:", res.data.student)
        setFormData({
        name: "",
        parent: "",
        village: "",
        district: "",
        tehsil: "",
        cnic: "",
        contact: "",
        guardian: "",
        address: "",
        room: "",
        previousSchool: "",
        lastClass: "",
        grade: "",
        ahata: "",
        taqdeer: "",
        ahataRooms: "",
        admissionNo: "",
      })
      } else {
        alert("❌ " + res.data.message)
      }

      
      
    } catch (error) {
      console.error(error)
      alert("⚠️ سرور پر مسئلہ ہے")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 to-green-200 ">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8" dir="rtl">
        <h1 className="text-2xl font-bold text-center mb-6 text-green-700">
          رجسٹریشن فارم
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* نام + ولدیت */}
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
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-green-400 focus:outline-none  appearance-none text-sm"
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
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>
          </div>

          {/* تحصیل + شناختی کارڈ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="tehsil" className="block mb-1 font-medium text-gray-700">
                تحصیل
              </label>
              <input
                type="text"
                id="tehsil"
                name="tehsil"
                value={formData.tehsil}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
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
                placeholder="12345-1234567-1"
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
                placeholder="0300-1234567"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
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
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-green-400 focus:outline-none appearance-none text-sm "
              >
                <option value="">انتخاب کریں</option>
                {Object.keys(ahataData).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="ahataRooms" className="block mb-1 font-medium text-gray-700">
                کمرے کی تعداد
              </label>
              <input
                type="text"
                id="ahataRooms"
                name="ahataRooms"
                value={formData.ahataRooms ? `${formData.ahataRooms} کمرے` : ""}
                readOnly
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 focus:outline-none"
              />
            </div>
          </div>

          {/* کمرہ نمبر + سابقہ مدرسہ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="room" className="block mb-1 font-medium text-gray-700 ">
                کمرہ نمبر
              </label>
              <input
                type="text"
                id="room"
                name="room"
                value={formData.room}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>
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
              <input
                type="text"
                id="lastClass"
                name="lastClass"
                value={formData.lastClass}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="taqdeer" className="block mb-1 font-medium text-gray-700">
                تقدیر
              </label>
              <select
                id="taqdeer"
                name="taqdeer"
                value={formData.grade}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-green-400 focus:outline-none  appearance-none text-sm"
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
