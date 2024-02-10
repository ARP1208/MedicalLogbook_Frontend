import React,{useState} from 'react'
import LogoNav from '../../Components/Admin/LogoNav'
import FacultyNavbar from '../../Components/Faculty/FacultyNavbar'
import Profilefaculty from './Profilefaculty';

const Profilehomepage = () => {
    const [showprofile, setshowprofile] = useState(false);
  
    const handleOptions = (component) => {
      if (component === "Profile") {
        setshowprofile(true);
      }
    };

  return (
    <section>
      <LogoNav/>
      <FacultyNavbar/>
      {showprofile && <Profilefaculty/>}
      <div className="absolute h-full">
        <nav className="sideb h-83vh flex flex-col bg-blue-950">
          <button onClick={() => handleOptions("Profile")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
          <i className="fa-regular fa-address-card" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">&nbsp;Profile</p>
          </button>
        </nav>
      </div>
    </section>
  )
}

export default Profilehomepage
