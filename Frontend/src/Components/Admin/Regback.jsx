import React, {useState } from "react";
import Adminhomepage from "../../Layout/Admin/Adminhomepage"
const Regback = () => {
    const [showbackbutton,setshowbackbutton]=useState(false);

    const handlebackbutton = (component) =>{
        if (component === "Back") {
            // setshowbackbutton(true);
            window.close();
            window.location.href = '/Adminhomepage';
        }
    } 
    return (
    <section>
        {showbackbutton && <Adminhomepage/>}
      <div className="absolute h-full">
        <nav className="sideb h-full sm:h-full flex flex-col bg-blue-950">
          {/* Home Buttton */}
          <button
            onClick={() => handlebackbutton("Back")}
            className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 "
          >
            <i
              className="fa-solid fa-house pr-2"
              style={{ color: "#ffffff" }}
            />
            <p className="relative top-2 text-base">Back</p>
          </button>
        </nav>
      </div>
    </section>
  );
};

export default Regback;
