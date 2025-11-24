'use client'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '@/context/AppContext'
import Link from "next/link";
import { FaUserGraduate, FaBook, FaUsers, FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { MdGrade } from "react-icons/md";

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

const gradeIcons = [
  <FaBook />, <FaBook />, <FaBook />, <FaBook />, <FaBook />, <FaBook />,
  <FaBook />, <FaBook />, <FaBook />, <FaCheckCircle />,
  <FaUserGraduate />, <MdGrade />, <MdGrade />, <FaUsers />, <FaUsers />, <FaUsers />
];

const cardColors = [
  'bg-cyan-500', 'bg-green-600', 'bg-orange-400', 'bg-red-400',
  'bg-blue-600', 'bg-purple-500', 'bg-pink-500', 'bg-yellow-500',
  'bg-fuchsia-500', 'bg-teal-400', 'bg-indigo-500', 'bg-sky-500',
  'bg-lime-500', 'bg-rose-600', 'bg-emerald-500', 'bg-violet-500'
];

const StudentStatsDashboard = () => {
  const { fetchStudentsData, students } = useAppContext();

  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    async function fetchData() {
      await fetchStudentsData();
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const gradeCounts = {};
    grades.forEach(grade => { gradeCounts[grade] = 0; });

    students.forEach(student => {
      const year = new Date(student.createdAt).getFullYear();
      if (year === currentYear && gradeCounts.hasOwnProperty(student.grade)) {
        gradeCounts[student.grade]++;
      }
    });

    setCounts(gradeCounts);
  }, [students]);

  return (
    <div className="container mx-auto min-h-screen py-8 px-3 bg-slate-100">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8 drop-shadow">
        اس سال ({currentYear}) کے درجہ وار طلباء
      </h1>

      {loading ? (
        <div className="text-center text-xl font-semibold text-gray-600">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {grades.map((grade, idx) => (
            <Link
              key={grade}
              href={`/dashboard/grade/${encodeURIComponent(grade)}`}
              className="block"
            >
              <div
                className={`
                  relative
                  rounded-xl
                  shadow-lg
                  flex flex-col items-start justify-between
                  py-7 px-5
                  cursor-pointer
                  ${cardColors[idx % cardColors.length]} 
                  hover:scale-105
                  hover:shadow-2xl
                  transition-all
                  duration-200
                  overflow-hidden
                `}
              >
                {/* Icon top right */}
                <div className="absolute top-3 right-3 opacity-30 text-6xl">
                  {gradeIcons[idx % gradeIcons.length]}
                </div>

                {/* Number */}
                <div className="text-5xl font-extrabold text-white mb-2 drop-shadow-lg z-10">
                  {counts[grade]}
                </div>

                {/* Grade Name */}
                <div className="text-xl font-bold text-white mb-8 z-10">
                  {grade}
                </div>

                {/* Bottom Bar */}
                <div className="w-full bg-white/20 text-white font-semibold rounded-b-xl py-2 flex items-center justify-center gap-2">
                  مزید معلومات
                  <FaInfoCircle className="text-white/80" />
                </div>
              </div>
            </Link>
          ))}

        </div>
      )}
    </div>
  );
}

export default StudentStatsDashboard;
