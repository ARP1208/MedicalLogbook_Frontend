import React,{useState} from 'react'
import LogoNav from '../../Components/Admin/LogoNav'
import FacultyNavbar from '../../Components/Faculty/FacultyNavbar'
import Facultyannouncement from './Facultyannouncement';

const Facultyhomepage = () => {
    const [showAnnouncement, setshowAnnouncement] = useState(false);
  
    const handleOptions = (component) => {
      if (component === "Announcement") {
        setshowAnnouncement(true);
      }
    };
  

  return (
    <section>
      <LogoNav/>
      <FacultyNavbar/>
      {showAnnouncement && <Facultyannouncement/>}
      <div className="relative h-full">
        <nav className="sideb h-83vh flex flex-col bg-blue-950">
          <button onClick={() => handleOptions("Announcement")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
          <i className="fa-solid fa-bullhorn p-2" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">Announcement</p>
          </button>
        </nav>
      </div>
    </section>
  )
}

export default Facultyhomepage
