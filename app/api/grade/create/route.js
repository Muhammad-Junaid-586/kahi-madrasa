import { connectToDatabase } from "@/lib/db";
import Grade from "@/modals/Grade";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const { grade, books } = body;

    if (!grade) {
      return NextResponse.json(
        { success: false, message: "درجہ ضروری ہے" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const gradeData = {
      grade,
      books: books?.filter(item => item.trim() !== "") || [],  // remove empty fields
    };

    const savedGrade = await Grade.create(gradeData);

    return NextResponse.json({
      success: true,
      message: "Grade Created Successfully",
      grade: savedGrade,
    });

  } catch (error) {
    console.error("Error saving grade:", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
