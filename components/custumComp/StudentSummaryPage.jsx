'use client'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '@/context/AppContext'
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
    // Only count current year students
    const gradeCounts = {};
    grades.forEach(grade => { gradeCounts[grade] = 0; });
    students.forEach(student => {
      const year = new Date(student.createdAt).getFullYear();
      if (year === currentYear && gradeCounts.hasOwnProperty(student.grade)) {
        gradeCounts[student.grade]++;
      }
    });
    setCounts(gradeCounts);
  }, [students, currentYear]);

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
            <div
              key={grade}
              className={`
                relative
                rounded-xl
                shadow-lg
                flex flex-col items-start justify-between
                py-7 px-5
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
              <div className="text-5xl font-extrabold text-white mb-2 drop-shadow-lg z-10">{counts[grade]}</div>
              {/* Grade Name */}
              <div className="text-xl font-bold text-white mb-8 z-10">
                {grade}
              </div>
              {/* More Info */}
              <div className="w-full">
                <button
                  className="w-full bg-white/20 text-white font-semibold rounded-b-xl py-2 flex items-center justify-center gap-2 hover:bg-white/40 transition capitalize"
                  onClick={() => alert(`مزید معلومات: ${grade}۔ طلباء: ${counts[grade]}`)}
                  title="More info"
                >
                  مزید معلومات
                  <FaInfoCircle className="text-white/80"/>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentStatsDashboard;








// 'use client'
// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '@/context/AppContext'
// import { FaUserGraduate, FaBook, FaUsers, FaCheckCircle, FaInfoCircle } from "react-icons/fa";
// import { MdGrade } from "react-icons/md";

// const grades = [
//   "درجہ دورہ حدیث",
//   "درجہ موقوف علیہ",
//   "درجہ سادسہ",
//   "درجہ خاسہ",
//   "درجہ رابعہ",
//   "درجہ ثانیہ",
//   "درجہ اولی",
//   "درجہ متوسطہ",
//   "درجہ اعدایہ",
//   "شعبہ ناظرہ",
//   "شعبہ حفظ",
//   "شعبہ تخصص فی الفقہ الاسلامی",
//   "شعبہ تخصص فی اللغة العربیہ",
//   "شعبہ تجوید العلماء",
//   "شعبہ تجوید للمعلمات",
// ];

// const gradeIcons = [
//   <FaBook />, <FaBook />, <FaBook />, <FaBook />, <FaBook />, <FaBook />,
//   <FaBook />, <FaBook />, <FaBook />, <FaCheckCircle />,
//   <FaUserGraduate />, <MdGrade />, <MdGrade />, <FaUsers />, <FaUsers />, <FaUsers />
// ];

// const cardColors = [
//   'bg-cyan-500', 'bg-green-600', 'bg-orange-400', 'bg-red-400',
//   'bg-blue-600', 'bg-purple-500', 'bg-pink-500', 'bg-yellow-500',
//   'bg-fuchsia-500', 'bg-teal-400', 'bg-indigo-500', 'bg-sky-500',
//   'bg-lime-500', 'bg-rose-600', 'bg-emerald-500', 'bg-violet-500'
// ];

// // Helper for year list
// function getYearOptions(students) {
//   const yearsSet = new Set();
//   students.forEach(stu => {
//     yearsSet.add(new Date(stu.createdAt).getFullYear());
//   });
//   return Array.from(yearsSet).sort((a, b) => b - a);
// }

// const StudentStatsDashboard = () => {
//   const { fetchStudentsData, students } = useAppContext();

//   const [counts, setCounts] = useState({});
//   const [yearOptions, setYearOptions] = useState([]);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       await fetchStudentsData();
//       setLoading(false);
//     }
//     fetchData();
//   }, []);

//   useEffect(() => {
//     setYearOptions(getYearOptions(students));
//   }, [students]);

//   useEffect(() => {
//     const gradeCounts = {};
//     grades.forEach(grade => { gradeCounts[grade] = 0; });
//     students.forEach(student => {
//       const year = new Date(student.createdAt).getFullYear();
//       if ((selectedYear === 'all' || year === Number(selectedYear)) && gradeCounts.hasOwnProperty(student.grade)) {
//         gradeCounts[student.grade]++;
//       }
//     });
//     setCounts(gradeCounts);
//   }, [students, selectedYear]);

//   return (
//     <div className="container mx-auto min-h-screen py-8 px-3 bg-slate-100">
//       <h1 className="text-3xl font-bold text-center text-blue-700 mb-8 drop-shadow">
//         سالانہ درجہ وار طلباء: {selectedYear !== 'all' ? selectedYear : "تمام"}
//       </h1>

//       {/* Filter */}
//       <div className="mb-6 flex gap-3 items-center justify-center">
//         <select
//           className="px-4 py-2 border-2 border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
//           value={selectedYear}
//           onChange={(e) => setSelectedYear(e.target.value)}
//         >
//           {yearOptions.map(y => (
//             <option key={y} value={y}>{y}</option>
//           ))}
//           <option value="all">تمام سال</option>
//         </select>
//         <FaInfoCircle className="text-blue-400 text-2xl" title="فلٹر طلباء مکمل سال یا مخصوص سال کے مطابق"/>
//       </div>

//       {loading ? (
//         <div className="text-center text-xl font-semibold text-gray-600">Loading...</div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {grades.map((grade, idx) => (
//             <div
//               key={grade}
//               className={`
//                 relative
//                 rounded-xl
//                 shadow-lg
//                 flex flex-col items-start justify-between
//                 py-7 px-5
//                 ${cardColors[idx % cardColors.length]} 
//                 hover:scale-105
//                 hover:shadow-2xl
//                 transition-all
//                 duration-200
//                 overflow-hidden
//               `}
//             >
//               {/* Icon top right */}
//               <div className="absolute top-3 right-3 opacity-30 text-6xl">
//                 {gradeIcons[idx % gradeIcons.length]}
//               </div>
              
//               {/* Number */}
//               <div className="text-5xl font-extrabold text-white mb-2 drop-shadow-lg z-10">{counts[grade]}</div>
//               {/* Grade Name */}
//               <div className="text-xl font-bold text-white mb-8 z-10">
//                 {grade}
//               </div>
//               {/* More Info */}
//               <div className="w-full">
//                 <button
//                   className="w-full bg-white/20 text-white font-semibold rounded-b-xl py-2 flex items-center justify-center gap-2 hover:bg-white/40 transition capitalize"
//                   onClick={() => alert(`مزید معلومات: ${grade}۔ طلباء: ${counts[grade]}`)}
//                   title="More info"
//                 >
//                   مزید معلومات
//                   <FaInfoCircle className="text-white/80"/>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default StudentStatsDashboard;
