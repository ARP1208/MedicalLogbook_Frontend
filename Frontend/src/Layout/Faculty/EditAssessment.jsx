import React, { useState } from "react";

const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const academicOptions = [
        { value: "select Academic year", label: "select Academic year" },
    ];
    for (let year = currentYear; year >= currentYear - 10; year--) {
        academicOptions.push({
            value: `${year - 1}-${year}`,
            label: `${year - 1}-${year}`,
        });
    }
    return academicOptions;
};

const GenerateProgram = () => {
    return [
        { value: "select Program", label: "select Program" },
        { value: "MBBS", label: "MBBS" },
        { value: "MS", label: "MS" },
        { value: "MD", label: "MD" },
        { value: "BAMS", label: "BAMS" },
        { value: "BHMS", label: "BHMS" },
        { value: "BPT", label: "BPT" },
        { value: "B.VSc", label: "B.VSc" },
        { value: "BUMS", label: "BUMS" },
        { value: "BSMS", label: "BSMS" },
        { value: "BNYS", label: "BNYS" },
    ];
};

const GenerateSemester = () => {
    return [
        { value: "select Semester", label: "select Semester" },
        { value: "1", label: "1 Semester" },
        { value: "2", label: "2 Semester" },
        { value: "3", label: "3 Semester" },
        { value: "4", label: "4 Semester" },
        { value: "5", label: "5 Semester" },
        { value: "6", label: "6 Semester" },
        { value: "7", label: "7 Semester" },
        { value: "8", label: "8 Semester" },
        { value: "9", label: "9 Semester" },
    ];
};

const GenerateSection = () => {
    return [
        { value: "select Section", label: "select Section" },
        { value: "A", label: "Section A" },
        { value: "B", label: "Section B" },
        { value: "C", label: "Section C" },
        { value: "D", label: "Section D" },
    ];
};

const EditAssessment = () => {
    const [academicYear, setAcademicYear] = useState({
        value: "select Academic year",
        label: "select Academic year",
    });
    const [selectedProgram, setSelectedProgram] = useState({
        value: "select Program",
        label: "select Program",
    });
    const [selectedSemester, setSelectedSemester] = useState({
        value: "select Semester",
        label: "select Semester",
    });
    const [selectedSection, setSelectedSection] = useState({
        value: "select Section",
        label: "select Section",
    });

    const [assessmentName, setAssessmentName] = useState("");
    const [assessmentid, setAssessmentid] = useState("");
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [questions, setQuestions] = useState([]);
    const [answer, setAnswer] = useState("");
    const [open, setOpen] = useState(false);

    const handleAddQuestion = () => {
        if (question.trim() !== "") {
            setQuestions((prevQuestions) => [
                ...prevQuestions,
                { question, options, answer },
            ]);
            setQuestion("");
            setOptions(["", "", "", ""]);
            setAnswer("");
            // Reset options
        }
    };

    const handleOptionChange = (index, e) => {
        const newOptions = [...options];
        newOptions[index] = e.target.value;
        setOptions(newOptions);
    };

    return (
        <section className="fixed">
            <div className="fixed flex left-5 top-32 ml-50 h-auto w-auto">
                <button className="bg-sky-500 rounded-md w-auto text-lg">
                    Edit Assessment
                </button>
                <div
                    className={`fixed p-4 flex left-5 ml-50 top-45 flex-wrap w-70vw justify-center items-center border-sky-500 border-3 rounded-md bg-gray-200 ${open ? "blur-background" : ""
                        }`}
                >
                    <div className="flex justify-center items-center gap-5 mb-4 sm:grid sm:grid-cols-1 md:grid-cols-2">
                        <input
                            placeholder="Enter Assessment Name"
                            value={assessmentName}
                            onChange={(e) => setAssessmentName(e.target.value)}
                            className="shadow  border  rounded text-gray-700 px-3 py-2 focus:outline-none focus:shadow-outline"
                        />
                        <input
                            placeholder="Enter Assessment Id"
                            value={assessmentid}
                            onChange={(e) => setAssessmentid(e.target.value)}
                            className="shadow  border  rounded text-gray-700 px-3 py-2  focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-x-10 text-start w-full">
                        <input  type="search" placeholder="Search by Question number" className="mt-2 p-2.5 h-auto text-sm w-full text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <label className="ml-0 mt-2 font-bold w-full flex justify-center items-center flex-col">
                        Question :
                        <textarea
                            className="mt-2 p-2.5 h-auto text-sm w-full text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </label>

                    <label className="font-bold mt-3">
                        Options :
                        <div className="ml-2 mt-2 flex gap-3">
                            {options.map((option, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e)}
                                    placeholder={`Option ${index + 1}`}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            ))}
                        </div>
                    </label>
                    <label className="ml-0 mt-2 font-bold w-full flex justify-center items-center flex-col">
                        Answer :
                        <input
                            className="mt-2 p-2.5 h-auto text-sm max-w-xl text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 "
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                    </label>

                    <div className="flex justify-center h-fit mt-4">
                       
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 w-auto  rounded focus:outline-none focus:shadow-outline"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
       
    </section >
  );
};

export default EditAssessment;
