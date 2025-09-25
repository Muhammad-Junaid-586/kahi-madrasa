import { connectToDatabase } from "@/lib/db";
import Student from "@/modals/student";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

// GET student
export async function GET(request, { params }) {
  try {
    const id =await params.id;
    await connectToDatabase();
    const student = await Student.findById(id);
    if (!student) {
      return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, student });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

// UPDATE student (with image support)
export async function PUT(request, { params }) {
  try {
    const {id} = params;
    await connectToDatabase();
    const formData = await request.formData();

    const updateData = {};
    for (const [key, value] of formData.entries()) {
      if (key === "image" && value instanceof File) {
        // Delete old image if exists
        const existingStudent = await Student.findById(id);
        if (existingStudent?.imagePublicId) {
          await cloudinary.uploader.destroy(existingStudent.imagePublicId);
        }

        // Upload new image
        const buffer = Buffer.from(await value.arrayBuffer());
        const uploadRes = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "students" }, (err, result) => {
              if (err) reject(err);
              else resolve(result);
            })
            .end(buffer);
        });

        updateData.image = uploadRes.secure_url;
        updateData.imagePublicId = uploadRes.public_id;
      } else {
        updateData[key] = value;
      }
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedStudent) {
      return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, student: updatedStudent });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE student (also delete image from Cloudinary)
export async function DELETE(request, { params }) {
  try {
    const {id} = params;
    await connectToDatabase();
    const student = await Student.findById(id);
    if (!student) {
      return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
    }

    // Delete image from Cloudinary if exists
    if (student.imagePublicId) {
      await cloudinary.uploader.destroy(student.imagePublicId);
    }

    await Student.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Student Deleted Successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
