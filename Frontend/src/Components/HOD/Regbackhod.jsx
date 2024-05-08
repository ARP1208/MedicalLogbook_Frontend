import React, { useState } from "react";
import HODhomepage from '../../Layout/HOD/HODhomePage'
const Regbackhod = () => {
  const [showbackbutton, setshowbackbutton] = useState(false);

  const handlebackbutton = (component) => {
    if (component === "Back") {
      // setshowbackbutton(true);
      window.close();
      window.location.href = "/HODhomepage";
    }
  };
  return (
    <section>
      {showbackbutton && <HODhomepage/>}
      <div className="h-full fixed">
        <nav className="sideb h-full sm:h-full flex flex-col bg-blue-950">
          {/* Home Buttton */}
          <button
            onClick={() => handlebackbutton("Back")}
            className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 "
          >
            <i class="fa-solid fa-arrow-left" style={{ color: "#ffffff" }} />

            <p className="relative top-2 text-base">&nbsp;&nbsp;&nbsp;Back</p>
          </button>
        </nav>
      </div>
    </section>
  );
};

export default Regbackhod;
