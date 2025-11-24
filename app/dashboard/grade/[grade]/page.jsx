"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, PencilIcon, Trash2 } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import "@/components/styles/print-grade.css";


const GradeStudentsPage = ({ params }) => {
  const { grade } = params;
  const decodedGrade = decodeURIComponent(grade);

  const { students, fetchStudentsData } = useAppContext();
  const [filteredStudents, setFilteredStudents] = useState([]);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetchStudentsData();
  }, []);

  useEffect(() => {
    const list = students.filter((stu) => {
      const year = new Date(stu.createdAt).getFullYear();
      return stu.grade === decodedGrade && year === currentYear;
    });

    setFilteredStudents(list);
  }, [students, decodedGrade]);

  const handleDelete = (student) => {
    if (confirm("Are you sure you want to delete this student?")) {
      // your delete function here
      console.log("Delete:", student);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-5">

      {/* Header + Print Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700">
          طلباء برائے: {decodedGrade} — {currentYear}
        </h1>

        <button
          onClick={handlePrint}
          className="no-print bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
        >
          پرنٹ کریں
        </button>
      </div>

      {/* TABLE */}
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
              <th className="px-1 py-3 text-sm no-print" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((student, index) => (
              <tr
                key={student._id}
                className={`text-center ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                } hover:bg-amber-100`}
              >
                <td className="px-1 py-2">{student.admissionNo}</td>
                <td className="px-1 py-2 font-medium text-gray-700">
                  {student.name}
                </td>
                <td className="px-1 py-2">{student.parent}</td>
                <td className="px-1 py-2">{student.address}</td>
                <td className="px-1 py-2 font-bold text-blue-700">
                  {student.grade}
                </td>
                <td className="px-1 py-2">{student.ahata}</td>
                <td className="px-1 py-2">{student.room}</td>
                <td className="px-1 py-2 font-semibold text-amber-700">
                  {student.taqdeer}
                </td>

                {/* ACTION BUTTONS — HIDE ON PRINT */}
                <td className="px-1 py-2 no-print">
                  <div className="flex items-center justify-center gap-2">
                    <Link href={`/dashboard/${student._id}`}>
                      <Eye
                        className="text-blue-500 cursor-pointer text-xl"
                        title="View"
                      />
                    </Link>

                    <Link href={`/students/${student._id}`}>
                      <PencilIcon
                        className="text-green-500 cursor-pointer text-xl"
                        title="Edit"
                      />
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

            {filteredStudents.length === 0 && (
              <tr>
                <td
                  className="text-center py-4 text-gray-600"
                  colSpan={10}
                >
                  کوئی طالب علم نہیں ملا۔
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default GradeStudentsPage;
