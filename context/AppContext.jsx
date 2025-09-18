"use client"

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const useAppContext = ()=>{
  return useContext(AppContext)
}

export const AppContextProvider = ({children})=>{
  

  const [students, setStudents] = useState([])


  const fetchStudentsData = async () => {
        try {
          const { data } = await axios.get('/api/student/get')
          if (data.success) {
            console.log(data.students)
            setStudents(data.students)
          }
        } catch (error) {
          console.error("Error fetching students:", error)
        }
      }
  
    useEffect(() => {
      
  
      fetchStudentsData()
    }, [])
   
  const value = {
   fetchStudentsData,

   students,
   setStudents

  }


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}