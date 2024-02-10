import React from 'react';
import TextareaAutosize from 'react-textarea-autosize'; // Import TextareaAutosize
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateTaskPglogbook = ({ onSearch }) => {
    const [rollno, setRollno] = React.useState('');
    const [names, setNames] = React.useState('');
    const [startDate, setStartDate] = React.useState(new Date());
 
    const handleSubmit = (e) => {
      e.preventDefault();
      onSearch(rollno, names.split(','), startDate); // Split names by comma
    };
  
    return (
      <section className='relative ml-50 top-2 overflow-hidden '>
        {/* <div className='ml-50 mb-50'> */}
        <div className="relative flex left-3 top-0 w-auto">
          <button className="bg-sky-500 rounded-md w-auto text-lg">
            Create Task
          </button>
        </div>
        <div className="p-4 flex left-5 top-5 flex-wrap w-fit border-sky-500 border-3 rounded-md bg-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div className="flex mb-1 gap-10">
              <label htmlFor="TaskName" className="block text-start text-gray-700 font-bold mb-2">
                Task Name
                <input
                  type="text"
                  id="TaskName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
              <label htmlFor="Task_ID" className="block text-gray-700 font-bold mb-2 text-start">
                Task ID
                <input
                  type="text"
                  id="TaskID"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-start text-gray-700 font-bold mb-2">
                Task Description
                <TextareaAutosize
                  id="Description"
                  placeholder='Enter Task Description Name'
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none min-h-10 focus:shadow-outline"
                />
              </label>
              </div>
            <div className="mb-4">
              <label htmlFor="rollno" className="block text-start text-gray-700 font-bold mb-2">
                Roll No
                <input
                  type="text"
                  id="rollno"
                  placeholder='Enter the student`s Roll No'
                  value={rollno}
                  onChange={(e) => setRollno(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-start text-gray-700 font-bold mb-2">
                Name
                <input // Use TextareaAutosize component
                  id="name"
                  value={names}
                  placeholder='Enter the student`s Name (comma-separated if multiple)'
                  onChange={(e) => setNames(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <div className="flex justify-center gap-10 mb-4">
              <label htmlFor="startDate" className="block text-start text-gray-700 font-bold mb-2">
                Start Date
                <br/>
                <DatePicker
                  id="startDate"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
              <label htmlFor="startDate" className="block text-start text-gray-700 font-bold mb-2">
                End Date
                <br/>
                <DatePicker
                  id="startDate"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create
            </button>
          </form>
        </div>
        {/* </div> */}
      </section>
    );
};

export default CreateTaskPglogbook;