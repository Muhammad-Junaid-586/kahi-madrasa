"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const GradeForm = () => {
  const [formData, setFormData] = useState({
    grade: "",
    books: [""], // one empty field initially
  });

  const [loading, setLoading] = useState(false);

  const handleGradeChange = (e) => {
    setFormData({ ...formData, grade: e.target.value });
  };

  // Update single book field
  const handleBookChange = (index, value) => {
    const updatedBooks = [...formData.books];
    updatedBooks[index] = value;
    setFormData({ ...formData, books: updatedBooks });
  };

  // Add new book field
  const addBookField = () => {
    setFormData({
      ...formData,
      books: [...formData.books, ""],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.grade) {
      toast.error("درجہ کا انتخاب ضروری ہے");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('/api/grade/create', formData);

      if (res.data.success) {
        toast.success("✅ کامیابی سے محفوظ ہوگیا");

        setFormData({
          grade: "",
          books: [""],
        });
      } else {
        toast.error(res.data.message || "سرور سے جواب نہیں آیا");
      }
    } catch (err) {
      toast.error("سرور پر مسئلہ ہے");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="max-w-lg mx-auto mt-12 bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-3xl shadow-2xl border-t-4 border-blue-400"
    >
      <h2 className="text-3xl text-center font-bold text-blue-700 mb-7 tracking-wider drop-shadow">
        درجہ رجسٹر کریں
      </h2>

      <form onSubmit={handleSubmit} className="space-y-7">
        
        {/* Grade Field */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-blue-700 text-right tracking-wide">
            درجہ *
          </label>
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleGradeChange}
            className="border border-blue-300 px-4 py-2 text-lg rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-right"
            placeholder="درجہ درج کریں"
          />
        </div>

        {/* Dynamic Books Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {formData.books.map((book, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-1 font-medium text-green-700 text-right">
                کتاب نمبر {index + 1}
              </label>
              <input
                type="text"
                value={book}
                onChange={(e) => handleBookChange(index, e.target.value)}
                className="border border-green-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400 bg-white text-right"
                placeholder={`کتاب نمبر ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Add Book Button */}
        <button
          type="button"
          onClick={addBookField}
          className="w-full bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600 transition"
        >
          ➕ مزید کتاب شامل کریں
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-green-600 shadow-md transition-all tracking-wider"
        >
          {loading ? "محفوظ ہو رہا ہے..." : "محفوظ کریں"}
        </button>
      </form>
    </div>
  );
};

export default GradeForm;
