'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import FormDialog from './custumComp/FormDialog'
import { useAppContext } from '@/context/AppContext'
import './../components/styles/inputForm.css'
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import { Eye, Pencil, PencilIcon, Trash, Trash2 } from "lucide-react";

const StudentsData = () => {

  const { fetchStudentsData, students , setStudents } = useAppContext()

  // const [students, setStudents] = useState([])


  const handleDelete = async (student) => { 
      try { 
         await axios.delete(`/api/student/${student._id}`);
        alert("Deleted Successfully!");
        // optionally reload students list
        fetchStudentsData();
      } catch (error) { 
         console.error(error);
      }
    }

  useEffect(() => {
    

    fetchStudentsData()
  }, [])

  // 

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className='mb-4'>
        <FormDialog />
      </div>
      <h1 className="text-3xl font-bold text-center text-amber-600 mb-8 mt-2">
        تمام طلباء کی تفصیلات
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse text-[11px] overflow-x-scroll">
          <thead className="bg-amber-500 text-white sticky top-0">
            <tr >
              <th className="px-1 py-3 text-sm">Admission No</th>
              <th className="px-1 py-3 text-sm">Name</th>
              <th className="px-1 py-3 text-sm">Parent</th>
              <th className="px-1 py-3 text-sm">Address</th>
              {/* <th className="px-1 py-3 text-sm">Previous School</th> */}
              {/* <th className="px-1 py-3 text-sm">LastClass</th> */}
              <th className="px-1 py-3 text-sm">Grade</th>
              <th className="px-1 py-3 text-sm">Ahata</th>
              <th className="px-1 py-3 text-sm">Room</th>
              <th className="px-1 py-3 text-sm">Taqdeer</th>
              <th className="px-1 py-3 text-sm" colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={index}
                className={`text-center transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                } hover:bg-amber-100`}
              >
                <td className="px-1 py-2">{student.admissionNo}</td>
                <td className="px-1 py-2 font-medium text-gray-700">{student.name}</td>
                <td className="px-1 py-2">{student.parent}</td>
                <td className="px-1 py-2">{student.address}</td>
                {/* <td className="px-1 py-2">{student.previousSchool}</td> */}
                {/* <td className="px-1 py-2">{student.lastClass}</td> */}
                <td className="px-1 py-2">{student.grade}</td>
                <td className="px-1 py-2">{student.ahata}</td>
                <td className="px-1 py-2">{student.room}</td>
                <td className="px-1 py-2 font-semibold text-amber-700">
                  {student.taqdeer}
                </td>
            <td className=' flex  gap-2 py-2 items-center justify-center'>
                
  {/* <button  */}
  {/* //   onClick={async () => { */}
  {/* //     try { */}
  {/* //       await axios.delete(`/api/student/${student._id}`);
  //       alert("Deleted Successfully!");
  //       // optionally reload students list
  //       fetchStudentsData();
  //     } catch (error) { */}
  {/* //       console.error(error);
  //     }
  //   }}
  //   className="px-4 py-2 my-1 bg-red-600 rounded-lg text-white/80 hover:text-white cursor-pointer"
  // >
  //   X
  // </button> */}




  {/* <Link href={`/students/${student._id}`} className='my-1'>
    <button className="px-4 py-2 bg-amber-600 rounded-lg text-white/80 hover:text-white cursor-pointer">
      Edit
    </button>
  </Link> */}
  
      <Link href={`/dashboard/${student._id}`}>
      <Eye  className="text-blue-500 cursor-pointer text-xl" title="View" />
      </Link>
      <Link href={`/students/${student._id}`}>
      <PencilIcon className="text-green-500 cursor-pointer text-xl" title="Edit" />
      </Link>
      <Trash2 onClick={() => handleDelete(student)} className="text-red-500 cursor-pointer text-xl" title="Delete" />
    
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
