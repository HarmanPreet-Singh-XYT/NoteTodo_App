"use client"
import { Categories_Cont } from '@/Helpers/Categories';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useContext, useLayoutEffect } from 'react'
import Calendar from '@/Components/Calender';
import { Calendar_cont } from '@/Helpers/Calendar-Cont';
import ToDoApp from '@/Components/ToDoApp';
import NotesApp from '@/Components/NotesApp'
import SideBar from '@/Components/SideBar';
import Cards from '@/Components/PageComponents/Cards';
const Page = () => {
    const {setCategories} = useContext(Categories_Cont);
    const {showCalendar} = useContext(Calendar_cont);
    function create_categories(category,color){
        const random = Math.random()*100;
        const cat = {id:random,cat:category,col:color};
        setCategories((prevcat)=>[...prevcat,cat]);
    }
    function time(){
      let dateObj = new Date();
 
// Subtract one day from current time                       
      dateObj.setDate(dateObj.getDate() + 19);
      
      return dateObj
    }
    const precat = ["All","Projects","Business","Finance"]
    useLayoutEffect(() => {
      precat.forEach((cat)=>create_categories(cat));
    }, []);
  return (
    <>
    <Cards/>
    <main className="container">
        <div className="sidebar">
            <SideBar/>
        </div>
        <div className="main">
            <ToastContainer/>
            {/* <ToDoApp/> */}
            <NotesApp/>
        </div>
        <div style={{width:"24%",display:"block",transform: `translateX(${showCalendar ? "0" : "110"}%)`}} className='calendar-div'>
        <Calendar/>
        </div>
    </main>
    </>
  )
}

export default Page