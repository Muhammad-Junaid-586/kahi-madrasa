import { connectToDatabase } from "@/lib/db";
import Student from "@/modals/student";
import { NextResponse } from "next/server";


export async function GET(request) {
  try {
    await connectToDatabase();
    const students = await Student.find({});
    if (students.length === 0) {
      console.log("no student found ", students);
      return NextResponse.json({success : false ,  message: "No Students Found" });
    }
    
    return NextResponse.json({success : true , message : "Students Fetched Successfully" ,  students});
  } catch (error) {
    console.log(error);
    return NextResponse.json({success : false ,  message: "Internal Server Error" });
  }
}