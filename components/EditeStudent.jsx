"use client";

import React, { useEffect, useState } from "react";
import  "../components/styles/inputForm.css";
import axios from "axios";
import { pakistanData } from "@/public/assests/data";
import { useAppContext } from "@/context/AppContext";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

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

const EditeStudent = ({id}) => {
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
    image: null,
    existingImage: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const router = useRouter();
  const { fetchStudentsData } = useAppContext();

  // districts and tehsil
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

  // Update tehsils when district changes
  useEffect(() => {
    if (formData.district && allDistricts[formData.district]) {
      setTehsils(allDistricts[formData.district]);
      setFormData(prev => ({ ...prev, tehsil: "" }));
    } else {
      setTehsils([]);
    }
  }, [formData.district]);

  // Handle input changes
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

  // Handle image upload - FIXED: Added setIsImageChanged(true)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('براہ کرم صرف تصویری فائل اپ لوڈ کریں');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('تصویری فائل کا سائز 5MB سے زیادہ نہیں ہونا چاہیے');
        return;
      }

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // FIX: Set image changed flag to true
      setIsImageChanged(true);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image - FIXED: Added setIsImageChanged(true)
  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
      existingImage: "",
    }));
    setImagePreview(null);
    // FIX: Set image changed flag to true
    setIsImageChanged(true);
    
    // Reset file input
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.parent || !formData.contact) {
      alert('براہ کرم تمام ضروری فیلڈز پر کرنے');
      return;
    }

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'image' && formData[key]) {
          // Only append image if it's changed
          submitData.append('image', formData[key]);
        } else if (key !== 'image' && key !== 'existingImage') {
          submitData.append(key, formData[key]);
        }
      });

      // Add flag to indicate image change - FIXED: Use actual boolean
      submitData.append('isImageChanged', isImageChanged.toString());

      console.log('Submitting data with isImageChanged:', isImageChanged);
      
      const res = await axios.put(`/api/student/${id}`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        alert("✅ طالب علم کی معلومات کامیابی سے اپ ڈیٹ ہوگئیں");
        console.log("Updated:", res.data.student);
        
        fetchStudentsData();
        router.push('/students');
      } else {
        alert("❌ " + res.data.message);
      }
    } catch (error) {
      console.error('Error updating student:', error);
      alert("⚠️ سرور پر مسئلہ ہے");
    }
  }

  // Fetching data - FIXED: Properly handle existing image
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { data } = await axios.get(`/api/student/${id}`);
        if (data.success) {
          console.log("Fetched student:", data.student);
          setFormData(data.student);
          
          // Set existing image preview if available
          if (data.student.image || data.student.imageUrl) {
            const existingImage = data.student.image || data.student.imageUrl;
            setImagePreview(existingImage);
            setFormData(prev => ({
              ...prev,
              existingImage: existingImage
            }));
          }
          
          // Reset image changed flag when loading data
          setIsImageChanged(false);
        }
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };
    fetchStudent();
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 to-green-200 ">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8" dir="rtl">
        <h1 className="text-2xl font-bold text-center mb-6 text-green-700 heading">
          جامعہ دارالعلوم سراج الاسلام کاہی ہنگو
        </h1>
        <h2 className="text-2xl text-center mb-6 text-green-700 heading">
          طالب علم کی معلومات میں ترمیم
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* تصویر اپ لوڈ */}
          <div className="flex flex-col items-center mb-6">
            <label htmlFor="image" className="block mb-3 font-medium text-gray-700 text-lg">
              {formData.existingImage ? 'تصویر تبدیل کریں' : 'تصویر اپ لوڈ کریں'}
            </label>
            
            {/* Image Preview */}
            {(imagePreview || formData.existingImage) && (
              <div className="relative mb-4">
                <img 
                  src={imagePreview || formData.existingImage} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-full border-4 border-green-200"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* File Input */}
            <div className="flex flex-col items-center">
              <label 
                htmlFor="image" 
                className="cursor-pointer bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                {imagePreview || formData.existingImage ? 'تصویر تبدیل کریں' : 'تصویر منتخب کریں'}
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
              {/* Debug info */}
              <p className="text-xs text-gray-400 mt-1 heading">
                تصویر تبدیل ہوئی: {isImageChanged ? 'ہاں' : 'نہیں'}
              </p>
            </div>
          </div>


          {/* Rest of your form remains the same */}
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
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-green-400 focus:outline-none appearance-none"
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
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-green-400 focus:outline-none appearance-none "
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
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-green-400 focus:outline-none appearance-none "
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
          {/* ... (all your existing form fields) ... */}

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold text-lg shadow-md transition"
            >
              اپ ڈیٹ کریں
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="flex-1 py-3 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-semibold text-lg shadow-md transition"
            >
              منسوخ کریں
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditeStudent;