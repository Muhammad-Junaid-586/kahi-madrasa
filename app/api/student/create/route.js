import { connectToDatabase } from "@/lib/db";
import Student from "@/modals/student";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// ✅ configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    // ✅ Parse multipart form data
    const formData = await request.formData();

    // Extract fields
    const studentData = {
      admissionNo: formData.get("admissionNo"),
      name: formData.get("name"),
      parent: formData.get("parent"),
      village: formData.get("village"),
      district: formData.get("district"),
      tehsil: formData.get("tehsil"),
      cnic: formData.get("cnic"),
      contact: formData.get("contact"),
      guardian: formData.get("guardian"),
      guardianFather: formData.get("guardianFather"),
      dateOfBirth: formData.get("dateOfBirth"),
      address: formData.get("address"),
      room: formData.get("room"),
      previousSchool: formData.get("previousSchool"),
      lastClass: formData.get("lastClass"),
      grade: formData.get("grade"),
      ahata: formData.get("ahata"),
      taqdeer: formData.get("taqdeer"),
      ahataRooms: formData.get("ahataRooms"),
    };

    // ✅ Handle image upload
    let imageUrl = null;
    let imagePublicId = null;
    const image = formData.get("image");

    if (image && typeof image === "object") {
      // Convert Blob to Buffer
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload to Cloudinary
      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "students" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });

      imageUrl = uploadRes.secure_url;
      imagePublicId = uploadRes.public_id; // Cloudinary public_id
    }

    console.log("Image URL:", imageUrl);
    
    // ✅ Save student in DB
    await connectToDatabase();

    const student = new Student({
  ...studentData,
  image: imageUrl,           // Cloudinary secure_url
  imagePublicId: imagePublicId, // Cloudinary public_id
});


    await student.save();

    return NextResponse.json({
      success: true,
      message: "Student Created Successfully",
      student,
    });
  } catch (error) {
    console.error("Error saving student:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
