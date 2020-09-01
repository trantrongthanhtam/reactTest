import React, { useState } from "react";
import "./App.css";
import StudentList from "./components/StudentList";
import { Button, Label, FormGroup, Input, Form } from "reactstrap";

const studentdata = [
  {
    name: "Nguyen Long",
    class: "10A",
    dob: "11/10/1992",
    gender: "male",
    grades: [1.5, 4.25, 5],
  },
  {
    name: "Nguyễn Quang",
    class: "10C",
    dob: "11/11/1993",
    gender: "male",
    grades: [6, 7, 8],
  },
  {
    name: "Nguyễn Linh",
    class: "10B",
    dob: "8/5/1992",
    gender: "female",
    grades: [5, 8, 4.5],
  },
  {
    name: "nguyễn Hùng",
    class: "10D",
    dob: "30/2/1996",
    gender: "male",
    grades: [8.5, 7, 5.6],
  },
  {
    name: "Trần Nga",
    class: "10A",
    dob: "11/12/1997",
    gender: "female",
    grades: [5.7, 4.6, 8.5],
  },
];

// localStorage.setItem("studentList", studentdata);

function App() {
  const [studentfilter, setStudentFilter] = useState(studentdata);
  function handleFilter(event) {
    event.preventDefault();

    var studentName = document.getElementById("tenId").value;
    var className = document.getElementById("lopId").value;
    var gender = document.getElementById("gioitinhId").checked?"male":"female";
    setStudentFilter(studentdata.filter((item)=> item.name.includes(studentName) && (className === "All" || item.class === className) && item.gender === gender))
  }

  return (
    <div className="App">
      <h2>Form Quản Lý Học Sinh</h2>
      <Form id="submitForm" className="form" onSubmit={handleFilter}>
        <FormGroup>
          <Label for="tenId">Tên</Label>
          <Input type="text" id="tenId" placeholder="Nhập tên học sinh" />
        </FormGroup>
        <FormGroup>
          <Label for="lopId">Lớp</Label>
          <Input type="select" id="lopId">
            <option>All</option>
            <option>10A</option>
            <option>10B</option>
            <option>10C</option>
            <option>10D</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="gioitinhId">Giới tính</Label>
          <Input type="checkbox" id="gioitinhId"></Input>
        </FormGroup>
        <FormGroup className="buttongroup">
          <Button>Tìm Kiếm</Button>
          <Button>Thêm Mới</Button>
          <Button>Xóa</Button>
        </FormGroup>
      </Form>
      <StudentList list={studentfilter} />
    </div>
  );
}

export default App;
