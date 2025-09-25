"use client";
import { useState, useEffect, useRef } from "react";
import "./style.css";
import Image from "next/image";
import { useParams } from "next/navigation";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useReactToPrint } from "react-to-print";
import PrintAdmissionForm from "@/components/custumComp/PrintAdmissionForm";
// import {PrintAdmissionForm} from "@/components/custumComp/PrintAdmissionForm"

export default function AdmissionForm() {
  // const [data, setData] = useState({});

  // logic fo print
   const componentRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: componentRef, // ✅ new API
    documentTitle: "Admission Form",
  });

  
  // ✅ Handle Ctrl+P / Browser Print
   useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault(); // ❌ stop Ctrl+P
        alert("Please use the Print button instead!");
        handlePrint();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  // logic fo print

  // useEffect(() => {
  //   // Example dummy data (replace with API fetch)
  //   setTimeout(() => {
  //     setData({
  //       admissionNo: "12345",
  //       date: "19-09-2025",
  //       name: "محمد جنید",
  //       fatherName: "عبدالباسط",
  //       village: "کاٹی خیل",
  //       district: "ہنگو",
  //       tehsil: "ٹل",
  //       cnic: "12345-6789012-3",
  //       dob: "01-01-2000",
  //       phone: "0300-1234567",
  //       address: "خیبر پختونخوا",
  //       lastClass: "ساتویں",
  //       // previousSchool: "مدرسہ عربیہ ہنگو",
  //       previousSchool: "جامعہ دارالعلوم سراج الاسلام کاہی",
  //       witness1: { name: "عبدالرحمن", father: "سید خان", village: "کاٹی خیل" },
  //       witness2: { name: "سہیل", father: "محمد اکبر", village: "ڈوگرہ" },
  //       affiliationName: "احمد",
  //       affiliationFather: "اکرم",
  //       affiliationTehsil: "ٹل",
  //       affiliationDistrict: "ہنگو",
  //       guardianSign: "________",
  //       universitySeal: "________",
  //     });
  //   }, 500);
  // }, []);


  // fetching student data
  const { id } = useParams(); // get student id from URL
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/student/${id}`) // call your API route
        .then((res) => {
          setStudent(res.data.student);
          console.log(res.data , "data from faram page");
          // console.log(student , "data from student log");
          
          
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p className="text-center p-3">Loading...</p>;

  if (!student) return <p className="text-center p-3">No student found</p>;

  
  
  return (
    

   
     <div className="p-6">
    <button
  onClick={handlePrint}
  className="bg-blue-800 text-white px-6 h-10 rounded-full cursor-pointer no-print flex items-center justify-center pb-2 mx-auto"
>
  Print Form
</button>



      {/* Printable Component */}
     <div  ref={componentRef}>
  <PrintAdmissionForm student={student} />
</div>

    </div>
    

      
    
  );
}
