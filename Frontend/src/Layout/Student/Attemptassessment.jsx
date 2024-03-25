import React, { useState, useEffect } from "react";
import { Questions } from "../../Components/Student/Questions2";
import Assessmentmarkspopup from "./Assessmentmarkspopup";

// Timer component for countdown
const Timer = ({ initialTime, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        clearInterval(timer);
        onTimeout(); // Call onTimeout function when the timer expires
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeout]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <h5 className="mr-5 font-bold">Time Remaining: {formatTime(timeLeft)}</h5>
  );
};

const Attemptassessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [buttonColor, setButtonColor] = useState("bg-blue-950");
  const [buttonText, setButtonText] = useState("Save & Next");
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(Questions.length).fill(null)
  );
  const [showResult, setShowResult] = useState(false); // State to control the display of the result popup
  const [popupDisplayed, setPopupDisplayed] = useState(false); // Flag to track whether the popup has been displayed or not
  const [submitted, setSubmitted] = useState(false); // State to track if assessment has been submitted

  const nextQuestion = () => {
    setCurrentQuestion((currentQuestion) => currentQuestion + 1);
    if (currentQuestion === Questions.length - 2) {
      setButtonText("Submit");
      setButtonColor("bg-green-500");
    }
  };

  const prevQuestion = () => {
    setCurrentQuestion((currentQuestion) => currentQuestion - 1);
    if (currentQuestion === 1) {
      setButtonColor("bg-blue-950");
    }
    if (currentQuestion === 0) {
      setButtonColor("bg-gray-500");
    }
    if (currentQuestion === Questions.length - 1) {
      setButtonText("Next");
    }
  };

  const handleOptionChange = (event) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestion] = event.target.value;
    setSelectedOptions(newSelectedOptions);
  };

  const handleNextOrSubmit = () => {
    if (currentQuestion === Questions.length - 1) {
      handleManualSubmit(); // Call handleManualSubmit if it's the last question
    } else {
      nextQuestion(); // Proceed to the next question
    }
  };

  const handleManualSubmit = () => {
    setShowResult(true); // Show result popup
    setOpen(true); // Open the popup
    setSubmitted(true); // Set submitted flag to true
  };

  const handleTimeout = () => {
    // Automatically submit when the timer expires
    if (!submitted) {
      setShowResult(true); // Show result popup
      setOpen(true); // Open the popup
      setPopupDisplayed(true); // Set the flag to true to indicate that the popup has been displayed
      setSubmitted(true); // Set submitted flag to true
    }
  };

  const calculateMarks = () => {
    let marks = 0;
    Questions.forEach((question, index) => {
      if (question.answer === selectedOptions[index]) {
        marks += 1;
      }
    });
    return marks;
  };

  // Function to handle navigation back to homepage page
  const handleNavigation = () => {
    window.location.href = "/Pglogstudenthome"; // Navigate to homepage page
  };

  return (
    <section className="left-3 absolute">
      <div className="border-1 h-75vh w-70vw rounded-md border-black flex justify-center items-center mt-10 m-10 -mb-10 -pb-5">
        <div className="p-10">
          <div className="overflow-hidden block text-4">
            <h4 className="font-bold text-blue-500">Assessment-1</h4>
          </div>
          <div className="text-start mt-3">
            <div className="grid grid-cols-4 text-center text-blue-950">
              <p className="font-bold">Academic Year : 2022-24</p>
              <p className="font-bold">Program : MBBS</p>
              <p className="font-bold">Semester : 3</p>
              <p className="font-bold">Section : A</p>
            </div>

            <div className="ml-3 flex justify-between items-center text-blue-500 gap-10">
              <h5 className="ml-3 font-bold">
                Question {currentQuestion + 1} of {Questions.length}
              </h5>
              <Timer initialTime={20} onTimeout={handleTimeout} />
            </div>

            <div className="flex w-60vw h-43vh border-2 rounded-tl-3xl rounded-tr-3xl overflow-auto border-sky-500 rounded-xl">
              <div className="text-2xl m-5">
                {currentQuestion >= 0 && currentQuestion < Questions.length && (
                  <div>
                    <p>{Questions[currentQuestion].question}</p>
                    <ul>
                      {Questions[currentQuestion].options.map((option, idx) => (
                        <li key={idx}>
                          <label>
                            <input
                              type="radio"
                              name="options"
                              value={option}
                              checked={
                                option === selectedOptions[currentQuestion]
                              }
                              onChange={handleOptionChange}
                            />
                            &nbsp;&nbsp;
                            {option}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-row gap-10 mt-4 justify-center items-center">
              <button
                className={`bg-blue-950 rounded-md w-auto h-auto px-4 py-2 text-white ${
                  currentQuestion === 0 ? "bg-gray-500" : ""
                }`}
                onClick={prevQuestion}
                disabled={currentQuestion === 0 || submitted}
              >
                <i
                  className="fa-solid fa-chevron-left"
                  style={{ color: "#ffffff" }}
                />
                &nbsp;&nbsp; Previous
              </button>

              <button
                className={`rounded-md w-auto h-auto px-4 py-2 text-white ${
                  (currentQuestion === Questions.length - 1 || submitted) ? "bg-green-500" : "bg-blue-950"
                }`}
                onClick={() => {
                  if ((currentQuestion === Questions.length - 1 || submitted) && !popupDisplayed) {
                    handleManualSubmit(); // Call handleManualSubmit if it's the last question
                  } else {
                    handleNextOrSubmit(); // Proceed to next question or submit
                  }
                }}
                disabled={submitted && !popupDisplayed}
              >
                {buttonText === "Submit" ? "Submit" : buttonText}
                {buttonText !== "Submit" && (
                  <>
                    &nbsp;&nbsp;
                    <i
                      className="fa-solid fa-chevron-right"
                      style={{ color: "#ffffff" }}
                    />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        <div style={{ zIndex: open ? 9999 : "auto" }}>
          {open && (
            <Assessmentmarkspopup open={open} onClose={handleNavigation}>
              <div className="lg:w-30vw md:w-30vw sm:20vw lg:h-40vh md:60vh sm:70vh border-3 border-blue-500 rounded-lg overflow-auto">
                <div className="text-2xl font-black text-blue-950 justify-self-center py-10">
                  Answers Submitted !!!
                </div>
                {showResult && (
                  <div className="">
                    <h5>Total Marks Obtained </h5>
                    <h4>
                      {calculateMarks()} / {Questions.length}
                    </h4>
                  </div>
                )}
              </div>
            </Assessmentmarkspopup>
          )}
        </div>
      </div>
    </section>
  );
};

export default Attemptassessment;
