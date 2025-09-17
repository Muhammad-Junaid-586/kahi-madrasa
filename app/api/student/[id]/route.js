import { connectToDatabase } from "@/lib/db";
import Student from "@/modals/student";
import { NextResponse } from "next/server";

// GET single student
export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectToDatabase();

    const student = await Student.findById(id);
    if (!student) {
      return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Student Fetched Successfully",
      student,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

// UPDATE student
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();

    await connectToDatabase();
    const updatedStudent = await Student.findByIdAndUpdate(id, data, { new: true });

    if (!updatedStudent) {
      return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Student Updated Successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE student
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await connectToDatabase();

    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Student Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
