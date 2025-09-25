"use client";
// import { useState, useEffect } from "react";
import "./style.css";
import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

const PrintAdmissionForm = forwardRef(({ student }, ref) => {
  // // const { id } = useParams();
  // const router = useRouter();
  // // const [student, setStudent] = useState([]);
  // const [loading, setLoading] = useState(true);

  const Line = ({ value, className }) => (
    <span
      className={cn(
        `border-b border-dashed border-blue-800 min-w-[100px] text-center inline-block`,
        className
      )}
    >
      {value || ""}
    </span>
  );

  // if (loading) return <p>Loading...</p>;
  if (!student) return <p>No student found</p>;

  return (
    <div
      id="printable"
      dir="rtl"
      className="max-w-4xl mx-auto bg-white border-2 border-blue-800 m-1  font-urdu"
      ref={ref}
    >
      {/* print logic */}

      {/* print logic */}

      {/* Header */}
      <div className="flex justify-between p-3">
        <div className="w-[15%]">
          <div
            className="w-[150px] h-[130px] bg-no-repeat bg-cover bg-center mx-auto rounded-md border-blue-800 border-2 "
            style={{ backgroundImage: `url(${student.image})` }}
          ></div>
        </div>
        <div className="flex-1 text-center  pb-2 mb-4">
          <h1 className="text-2xl font-bold text-blue-900 mb-2 mt-1">
            جامعہ دارالعلوم سراج الاسلام کاہی ہنگو
          </h1>
          <p className="text-blue-900 font-medium">
            تحصیل و ضلع ہنگو، خیبر پختونخوا، پاکستان
          </p>
          <h2 className="inline-block border-2 border-blue-900 rounded-xl text-blue-900 px-6 py-1 mt-2 text-lg font-bold">
            داخلہ فارم
          </h2>
        </div>
        <div className="w-[15%] flex justify-start">
          <div
            className="w-[150px] h-[130px] bg-no-repeat bg-cover bg-center mx-auto rounded-md border-blue-800 border-2"
            style={{ backgroundImage: `url(${student.image})` }}
          ></div>
        </div>
      </div>

      {/* Admission number and date */}
      <div className="flex justify-between mb-4 text-blue-900 px-3">
        <div className="flex gap-2 items-center">
          <span>داخلہ نمبر:</span>
          <Line value={student.admissionNo} />
        </div>
        <div className="flex gap-2 items-center">
          <span>مطلو بہ درجہ :</span>
          <Line value={student.grade} />
        </div>
      </div>

      {/* Intro text */}
      <div className="px-3">
        <p className="leading-relaxed text-justify mb-3 font-medium text-blue-900">
          بخدمت اقدس جناب ناظم تعلیمات صاحب زید مجدہ
        </p>
        <p className="leading-relaxed text-justify mb-3 font-medium text-blue-900">
          السلام علیکم ورحمتہ اللہ و برکاته
        </p>
        <div className="pr-5">
          <p className="leading-relaxed text-justify mb-3 font-medium text-blue-900">
            جناب عالی!
          </p>
          <p className="leading-[1.8rem]  mb-4 text-blue-900 pr-4 text-justify">
            خدمت عالیہ میں داخلہ کی استدعا کرتے ہوئے صدق دل سے اقرار کرتا ہوں کہ
            فارم ہذا کے پشت پر دیئے گئے تمام ہدایات بغور پڑھ کر مذکورہ اور
            انتظامیہ کی جانب سے دوران سال جاری ہونے والے جملہ قوانین کا احترام
            کرتے ہوئے ان کا پابند رہوں گا اور منتظمین کو شکایت کا موقع نہیں دوں
            گا۔ ‎ ‎ ‎ ‎لہذا مجھے داخلہ کی اجازت مرحمت فرما کر تحصیل علم ، وتہذیب
            اخلاق کا موقع عنایت فرمائیں
          </p>
        </div>
      </div>

      {/*  date & student signature */}
      <div className="flex justify-between mb-4 text-blue-900 px-3">
        <div className="flex gap-2 ">
          <span>تاریخ:</span>
          <Line value={student.date} />
        </div>
        <div className="flex gap-2 ">
          <span>دستخط طالب علم :</span>
          <Line value={student.StudentSignature} />
        </div>
      </div>

      {/* Student Details */}
      <div className=" border-t-2 border-blue-800 mb-6">
        <div className="bg-blue-100 border rounded-xl text-blue-900 border-blue-800 text-center font-bold py-1 mx-auto my-1 w-[140px]">
          کوائف نامہ
        </div>

        <div className="p-4 space-y-3 text-blue-900">
          {/* <div className="grid grid-col-1  md:grid-cols-[170px_170px_1fr_1fr] gap-4"> */}
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <span>نام:</span>
              <Line value={student.name} />
            </div>
            <div className="flex gap-2 items-center">
              <span>ولدیت:</span>
              <Line value={student.parent} />
            </div>

            <div className="flex gap-2 items-center text-sm">
              <span>تاریخ پیدائش:</span>
              <Line value={student.dateOfBirth} />
            </div>

            <div className="flex gap-2 items-center text-sm">
              <span>شناختی کارڈ نمبر:</span>
              <Line value={student.cnic} className="text-[12px]" />
            </div>
          </div>

          <div className="grid grid-col-1 md:grid-cols-4 gap-4">
            <div className="flex gap-2 items-center">
              <span>گاؤں:</span>
              <Line value={student.village} />
            </div>

            <div className="flex gap-2 items-center">
              <span>ضلع:</span>
              <Line value={student.district} />
            </div>
            <div className="flex gap-2 items-center">
              <span>تحصیل:</span>
              <Line value={student.tehsil} />
            </div>

            <div className="flex gap-2 items-center">
              <span>رابطہ نمبر:</span>
              <Line value={student.contact} />
            </div>
          </div>

          <div className="grid grid-col-1 md:grid-cols-3 gap-4">
            <div className="flex gap-2 items-center">
              <span>سرپرست کا نام:</span>
              <Line value={student?.guardian} />
            </div>

            <div className="flex gap-2 items-center">
              <span>ولدیت:</span>
              <Line value={student?.guardianFather} />
            </div>

            <div className="flex gap-2 items-center">
              <span>پتہ:</span>
              <Line value={student.address} />
            </div>
          </div>
        </div>
      </div>

      {/* For new students */}
      <div className=" border-t-2 border-blue-800 mb-6">
        <div className="bg-blue-100 border rounded-xl text-blue-900 border-blue-800 text-center font-bold py-1 mx-auto my-1 w-[140px]">
          جدید طلباء کے لئے
        </div>
        <div className="flex flex-col md:flex-row justify-between p-4 space-y-2 text-blue-900">
          <div className="flex  gap-2 items-center">
            <span>جس مدرسہ کو چھوڑ کر ایا ہے اس کا پتہ :</span>
            <Line value={student.previousSchool} />
          </div>

          <div className="flex gap-2 items-center">
            <span>آخری پاس کردہ درجہ:</span>
            <Line value={student.lastClass} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-between px-4  text-blue-900">
          <div className="flex gap-2 items-center">
            <span> تقدیر:</span>
            <Line value={student?.taqdeer} />
          </div>

          <div className="flex gap-2 ">
            <span>دستخط وہ مہر ناظم تعلیمات :</span>
            <Line value={student.dastkhata} />
          </div>
        </div>
      </div>

      {/* Witness info */}
      {/* <div className="border-2 border-blue-800 mb-6">
           <div className="bg-blue-100 border-b border-blue-800 text-center font-bold py-1">
             دستخط و دیگر تفصیلات
           </div>
           <div className="p-4 text-blue-900 space-y-2">
             <div className="flex gap-2 items-center">
               <span>۱۔</span>
               <Line value={student.witness1?.name} />
               <span>ولد</span>
               <Line value={data.witness1?.father} />
               <span>گاؤں</span>
               <Line value={data.witness1?.village} />
             </div>
             <div className="flex gap-2 items-center">
               <span>۲۔</span>
               <Line value={data.witness2?.name} />
               <span>ولد</span>
               <Line value={data.witness2?.father} />
               <span>گاؤں</span>
               <Line value={data.witness2?.village} />
             </div>
           </div>
         </div> */}

      {/* Affiliation certificate */}
      <div className="border-t-2 border-dashed border-blue-800 mt-8">
        <div className="bg-blue-100 border rounded-xl border-blue-800 text-blue-900 text-center font-bold py-1 mx-auto my-1 w-[140px]">
          سند التحاق
        </div>

        <div className="flex flex-col md:flex-row px-3">
          <div
            className="w-[150px] h-[130px] bg-no-repeat bg-cover bg-center mx-auto rounded-md border-blue-800 border-2 -mt-3"
            style={{ backgroundImage: `url(${student.image})` }}
          ></div>

          <div className="p-4 space-y-3 text-blue-900 flex-1">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex gap-2 ">
                <span>تصدیق کی جاتی ہے کہ طالب علم مسمی :</span>
                <Line value={student?.name} />
              </div>
              <div className="flex gap-2 ">
                <span>بن :</span>
                <Line value={"Juanid Khan"} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-1">
              <div className="flex gap-2 items-center">
                <span>گاؤں:</span>
                <Line value={student?.village} />
              </div>

              <div className="flex gap-2 items-center">
                <span>تحصیل:</span>
                <Line value={student?.tehsil} />
              </div>
              <div className="flex gap-2 items-center">
                <span>ضلع:</span>
                <Line value={student?.district} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3 text-blue-900">
          <div className="flex flex-col md:flex-row gap-4 Md:mr-6 md:pr-4">
            <div className="flex gap-2">
              <span>نے فارم پر کر کے حسب اقرار عہد نامہ درجہ :</span>
              <Line value={student?.class} />
            </div>

            <span>
              میں اس کا داخلہ باقاعدہ مکمل ہوا اور سند التحاق اس کے نام پر جاری
              ہوا-
            </span>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-2 mt-6">
            <div className="flex gap-2 items-center">
              <span>کمرہ نمبر :</span>
              <Line value={student?.room} />
            </div>
            <div className="flex gap-2 ">
              <span>کتب خانہ نمبر :</span>
              <Line value={student?.khata} />
            </div>
            <div className="flex gap-2 ">
              <span>دستخط وہ مہر ناظم تعلیمات :</span>
              <Line value={student?.nazimSignature} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PrintAdmissionForm;
