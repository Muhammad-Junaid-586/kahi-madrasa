import { connectToDatabase } from "@/lib/db";
import Grade from "@/modals/Grade";
import { NextResponse } from "next/server";

// GET: Fetch all grades
export async function GET() {
  try {
    await connectToDatabase();

    const grades = await Grade.find().sort({ createdAt: -1 }); // Newest first

    return NextResponse.json({
      success: true,
      grades,
    });
  } catch (error) {
    console.error("Error fetching grades:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
