import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  admissionNo: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: String,
    required: true,
  },
  village: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  tehsil: {
    type: String,
    required: true,
  },
  cnic: {
    type : String,
    required : true,
  },
  contact: {
    type : String,
    required : true,
  },
  guardian: {
    type : String,
    required : true,
  },
  guardianFather: {
    type : String,
    required : true,
  },
  dateOfBirth: {
    type : String,
    required : true,
  },
  address: {
    type : String,
    required : true,
  },
  room: {
    type : String,
    required : true,
  },
  previousSchool: {
    type : String,
    required : true,
  },
  lastClass: {
    type : String,
    required : true,
  },
  grade: {
    type : String,
    required : true,
  },
  ahata: {
    type : String,
    required : true,
  },
  // ahataRooms: String,
  taqdeer: {
    type : String,
    required : true,
  },
  // taqdeerRange: {
  //   type : String,
  //   required : true,
  // },
});

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;