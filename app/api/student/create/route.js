import { connectToDatabase } from "@/lib/db";
import Student from "@/modals/student";

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {admissionNo , name, parent, village, district, tehsil, cnic, contact, guardian, address, room, previousSchool, lastClass, grade, ahata , taqdeer } = await request.json();
    const student = new Student({admissionNo , name, parent, village, district, tehsil, cnic, contact, guardian, address, room, previousSchool, lastClass, grade, ahata , taqdeer });
    await connectToDatabase();
    await student.save();
    return NextResponse.json({success : true ,  message: "Student Created Successfully" , student });
    
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Server Error" });
    
  }
  
}