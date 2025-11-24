'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import FormDialog from './custumComp/FormDialog'
import { useAppContext } from '@/context/AppContext'
import './../components/styles/inputForm.css'
import { Eye, PencilIcon, Trash2 } from "lucide-react";
import "../components/custumComp/studentTable.css";
import "../components/styles/print.css";


const StudentsData = () => {

  const { fetchStudentsData, students } = useAppContext()

  const [filterGrade, setFilterGrade] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const grades = [
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

  const sessions = [
    { label: "2022-2023", year: 2023 },
    { label: "2023-2024", year: 2024 },
    { label: "2024-2025", year: 2025 },
    { label: "2025-2026", year: 2026 },
  ];

  const handleDelete = async (student) => {
    try {
      await axios.delete(`/api/student/${student._id}`);
      alert("Deleted Successfully!");
      fetchStudentsData();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchStudentsData()
  }, [])

  // FILTER LOGIC
  const filteredStudents = students.filter((student) => {
    const matchGrade = filterGrade ? student.grade === filterGrade : true;

    const studentYear = new Date(student.createdAt).getFullYear();
    const matchYear = filterYear ? studentYear === Number(filterYear) : true;

    return matchGrade && matchYear;
  });

   // Reset function
  const resetFilters = () => {
    setFilterGrade("");
    setFilterYear("");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <div className='mb-4 no-print'>
        <FormDialog />
      </div>

        {/* PRINT BUTTON */}
<div className="text-center mb-6 no-print">
  <button
    onClick={() => window.print()}
    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg
               hover:bg-blue-700 active:scale-95 transition-transform"
  >
    Print Data
  </button>
</div>

      <h1 className="text-3xl font-bold text-center text-amber-600 mb-8 mt-2 printTable">
        تمام طلباء کی تفصیلات
      </h1>

    


      {/* FILTERS */}
     <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-6 mb-8 no-print">
  <h2 className="text-center text-xl font-semibold text-gray-700 mb-6">
    طلباء کی تلاش / فلٹر
  </h2>

  <div className="flex flex-wrap gap-6 justify-center items-end">

    {/* Grade Filter */}
    <div className="flex flex-col w-48">
      <label className="text-sm font-medium mb-2 text-gray-600 text-right">درجہ منتخب کریں</label>
      <select
        value={filterGrade}
        onChange={(e) => setFilterGrade(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50
                   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500
                   focus:border-blue-500 transition-all shadow-sm"
      >
        <option value="">تمام درجات</option>
        {grades.map((g, i) => (
          <option key={i} value={g}>{g}</option>
        ))}
      </select>
    </div>

    {/* Session Filter */}
    <div className="flex flex-col w-48">
      <label className="text-sm font-medium mb-2 text-gray-600 text-right">سال داخلہ منتخب کریں</label>
      <select
        value={filterYear}
        onChange={(e) => setFilterYear(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50
                   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500
                   focus:border-green-500 transition-all shadow-sm"
      >
        <option value="">تمام سال</option>
        {sessions.map((s, i) => (
          <option key={i} value={s.year}>{s.label}</option>
        ))}
      </select>
    </div>

    {/* Reset Button */}
    <div className="flex">
      <button
        onClick={resetFilters}
        className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg shadow-md
                   hover:bg-red-600 active:scale-95 transition-transform"
      >
        Reset
      </button>
    </div>

  </div>
</div>


      <div className="overflow-x-auto shadow-lg rounded-lg printTable">
        <table className="w-full border-collapse text-[11px]">
          <thead className="bg-black text-white sticky top-0">
            <tr>
              <th className="px-1 py-3 text-sm">Admission No</th>
              <th className="px-1 py-3 text-sm">Name</th>
              <th className="px-1 py-3 text-sm">Parent</th>
              <th className="px-1 py-3 text-sm">Address</th>
              <th className="px-1 py-3 text-sm">Grade</th>
              <th className="px-1 py-3 text-sm">Ahata</th>
              <th className="px-1 py-3 text-sm">Room</th>
              <th className="px-1 py-3 text-sm">Taqdeer</th>
              <th className="px-1 py-3 text-sm no-print" colSpan={2}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((student, index) => (
              <tr
                key={student._id}
                className={`text-center ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                } hover:bg-amber-100`}
              >
                <td className="px-1 py-2">{student.admissionNo}</td>
                <td className="px-1 py-2 font-medium text-gray-700">{student.name}</td>
                <td className="px-1 py-2">{student.parent}</td>
                <td className="px-1 py-2">{student.address}</td>
                <td className="px-1 py-2">{student.grade}</td>
                <td className="px-1 py-2">{student.ahata}</td>
                <td className="px-1 py-2">{student.room}</td>
                <td className="px-1 py-2 font-semibold text-amber-700">{student.taqdeer}</td>

                <td className='px-1 py-2 no-print'>
                  <div className='flex items-center justify-center gap-2'>
                    <Link href={`/dashboard/${student._id}`}>
                      <Eye className="text-blue-500 cursor-pointer text-xl" title="View" />
                    </Link>
                    <Link href={`/students/${student._id}`}>
                      <PencilIcon className="text-green-500 cursor-pointer text-xl" title="Edit" />
                    </Link>
                    <Trash2
                      onClick={() => handleDelete(student)}
                      className="text-red-500 cursor-pointer text-xl"
                      title="Delete"
                    />
                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  )
}

export default StudentsData
