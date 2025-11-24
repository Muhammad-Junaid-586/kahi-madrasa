"use client"

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const useAppContext = ()=>{
  return useContext(AppContext)
}

export const AppContextProvider = ({children})=>{
  // Students state and fetch
  const [students, setStudents] = useState([]);
  const fetchStudentsData = async () => {
    try {
      const { data } = await axios.get('/api/student/get');
      if (data.success) {
        setStudents(data.students);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }

  // Grades state and fetch
  const [grades, setGrades] = useState([]);
  const fetchGradesData = async () => {
    try {
      const { data } = await axios.get('/api/grade/get'); // Matches your grades API
      if (data.success) {
        console.log(data.grades);
        
        setGrades(data.grades);
      }
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  }

  // Optional: fetch both on mount, or fetch grades where needed
  useEffect(() => {
    fetchStudentsData();
    fetchGradesData();
  }, []);

  const value = {
    fetchStudentsData,
    fetchGradesData,
    students,
    setStudents,
    grades,
    setGrades
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
