import React from 'react'
//import '../../Components/Style/style.css';
import Navbar from '../../Components/Student/Navbar';
import Sidebar from '../../Components/Student/Sidebar';
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/esm/Button';
const Internals = () => {
  return (
    <div className='container'>
    <Navbar/>
    <Sidebar/>
    <Button className='btninternalmarks' >Internal Marks</Button>
      <Card
        border="dark"
        style={{
          width: "87rem",
          height:"35rem",
          marginBlockStart: "200px",
          marginLeft: "100px",
          marginTop:"290px",

        }}
      >
        {/* <Card.Header>Name</Card.Header> */}
        <Card.Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "white",
            fontWeight: "bold",
          }}
        >
        <div style={{ textAlign: 'left' }}>
      <span>Name: </span>
      <input type='text'></input>
    </div>
    <div style={{ textAlign: 'center' }}>
      <span className="header-info">Registration Number: </span>
      <input type='number'></input>
    </div>
    <div style={{ textAlign: 'right' }}>
      <span className="header-info">Year: </span>
      <select>
        <option>I</option>
        <option>II</option>
        <option>III</option>
        <option>IV</option>
      </select>
    </div>
        </Card.Header>
        <Card.Body>
          {/* <Card.Title>Grade Sheet</Card.Title> */}
          <table
            style={{
              border: "1px solid black",
              width: "80rem",
              height: "25rem",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid black",
                    backgroundColor: "lightblue",
                    color: "black",
                  }}
                >
                  Internal marks
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    backgroundColor: "lightblue",
                    color: "black",
                  }}
                >
                  Maximum marks
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    backgroundColor: "lightblue",
                    color: "black",
                  }}
                >
                  Marks obtained
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ marginTop: "12px" }}>
                <td
                  style={{
                    border: "1px solid black",
                    fontWeight: "500",
                    backgroundColor: "",
                  }}
                >
                  Internal sessional1
                </td>
                <td style={{ border: "1px solid black", fontWeight: "500" }}>
                  {" "}
                </td>
                <td style={{ border: "1px solid black", fontWeight: "500" }}>
                  {" "}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black", fontWeight: "500" }}>
                  Total marks
                </td>
                <td style={{ border: "1px solid black", fontWeight: "500" }}>
                  {" "}
                </td>
                <td style={{ border: "1px solid black", fontWeight: "500" }}>
                  {" "}
                </td>
              </tr>
              {/* <th></th> */}
            </tbody>
            
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid black",
                    backgroundColor: "lightblue",
                    color: "black",
                  }}
                >
                  Assignments
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    backgroundColor: "lightblue",
                    color: "black",
                  }}
                >
                  Maximum marks
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    backgroundColor: "lightblue",
                    color: "black",
                  }}
                >
                  Marks obtained
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid black", fontWeight: "500" }}>
                  Assignment1
                </td>
                <td
                  style={{ border: "1px solid black", fontWeight: "500" }}
                ></td>
                <td
                  style={{ border: "1px solid black", fontWeight: "500" }}
                ></td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black", fontWeight: "500" }}>
                  Assignment2
                </td>
                <td style={{ border: "1px solid black", fontWeight: "500" }}>
                  {" "}
                </td>
                <td style={{ border: "1px solid black", fontWeight: "500" }}>
                  {" "}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black", fontWeight: "500" }}>
                  Assignment3
                </td>
                <td style={{ border: "1px solid black", fontWeight: "500" }}>
                  {" "}
                </td>
                <td style={{ border: "1px solid black", fontWeight: "500" }}>
                  {" "}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black", fontWeight: "500" }}>
                  Total marks
                </td>
                <td style={{ border: "1px solid black", fontWeight: "500" }}>
                  {" "}
                </td>
                <td style={{ border: "1px solid black", fontWeight: "500" }}>
                  {" "}
                </td>
              </tr>
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Internals
