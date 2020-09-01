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
    dob: "08/05/1992",
    gender: "female",
    grades: [5, 8, 4.5],
  },
  {
    name: "nguyễn Hùng",
    class: "10D",
    dob: "25/02/1996",
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

localStorage.setItem("studentList", JSON.stringify(studentdata));

function App() {
  const [studentfilter, setStudentFilter] = useState(studentdata);
  function handleFilter(event) {
    event.preventDefault();

    const studentName = document.getElementById("tenId").value;
    const className = document.getElementById("lopId").value;
    const getGender = document.getElementsByName("gioitinh");
    const gender = getGender[0].checked
      ? "male"
      : getGender[1].checked
      ? "female"
      : "All";
    const fromDate = document.getElementById("tungayId").value;
    const toDate = document.getElementById("denngayId").value;

    console.log(gender);
    setStudentFilter(
      studentdata.filter((item) => {
        const d = item.dob.split("/");
        let date = new Date(d[2], d[1] - 1, d[0]);
        return (
          item.name.toLowerCase().includes(studentName.toLowerCase()) &&
          (className === "All" || item.class === className) &&
          (gender === "All" || item.gender === gender)
        );
      })
    );
  }

  return (
    <div className="App">
      <h2>Form Quản Lý Học Sinh</h2>
      <Form id="submitForm" className="form" onSubmit={handleFilter}>
        <FormGroup className="form__group">
          <Label for="tenId">Tên:</Label>
          <Input type="text" id="tenId" placeholder="Nhập tên học sinh" />
        </FormGroup>
        <FormGroup className="form__group">
          <Label for="lopId">Lớp:</Label>
          <Input type="select" id="lopId">
            <option>All</option>
            <option>10A</option>
            <option>10B</option>
            <option>10C</option>
            <option>10D</option>
          </Input>
        </FormGroup>
        <FormGroup className="form__group" check inline>
          <Label check> Giới tính: </Label>
        </FormGroup>
        <FormGroup className="form__group" check inline>
          <Label check>
            <Input type="radio" name="gioitinh" />
            Nam
          </Label>
        </FormGroup>
        <FormGroup className="form__group" check inline>
          <Label check>
            <Input type="radio" name="gioitinh" />
            Nữ
          </Label>
        </FormGroup>
        <FormGroup className="form__group" inline>
          <Label for="tungayId">Ngày sinh:</Label>
          <Input type="date" id="tungayId"></Input>
          </FormGroup>
          <FormGroup className="form__group" inline>
          <Label for="denngayId"> ~ </Label>
          <Input type="date" id="denngayId"></Input>
        </FormGroup>
        <FormGroup className="buttongroup">
          <Button className="btn-success">Tìm Kiếm</Button>
          <Button className="btn btn-info">Thêm Mới</Button>
          <Button className="btn-danger">Xóa</Button>
        </FormGroup>
      </Form>
      <StudentList list={studentfilter} />
    </div>
  );
}

export default App;
