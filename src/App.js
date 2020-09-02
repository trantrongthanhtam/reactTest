import React, { useState, useEffect } from "react";
import "./App.css";
import StudentList from "./components/StudentList";
import { Button, Label, FormGroup, Input, Form } from "reactstrap";

let studentdata = [
  {
    id: 1,
    name: "Nguyen Long",
    class: "10A",
    dob: "11/10/1992",
    gender: "male",
    grades: [1.5, 4.25, 5],
  },
  {
    id: 2,
    name: "Nguyễn Quang",
    class: "10C",
    dob: "11/11/1993",
    gender: "male",
    grades: [6, 7, 8],
  },
  {
    id: 3,
    name: "Nguyễn Linh",
    class: "10B",
    dob: "08/05/1992",
    gender: "female",
    grades: [5, 8, 4.5],
  },
  {
    id: 4,
    name: "nguyễn Hùng",
    class: "10D",
    dob: "25/02/1996",
    gender: "male",
    grades: [8.5, 7, 5.6],
  },
  {
    id: 5,
    name: "Trần Nga",
    class: "10A",
    dob: "11/12/1997",
    gender: "female",
    grades: [5.7, 4.6, 8.5],
  },
];

function App() {
  const [studentfilter, setStudentFilter] = useState(studentdata);
  const [editMode, setEditMode] = useState(false);
  const [editStudentId, setEditStudentId] = useState(0);

  function handleFilter(event) {
    const studentName = document.getElementById("tenId").value;
    const className = document.getElementById("lopId").value;
    const fromDate = new Date(
      document.getElementById("tungayId").value.split("-")
    );
    const toDate = new Date(
      document.getElementById("denngayId").value.split("-")
    );
    event.preventDefault();
    if (!editMode) {
      const getGender = document.getElementsByName("gioitinh");
      const gender = getGender[0].checked
        ? "male"
        : getGender[1].checked
        ? "female"
        : "All";

        console.log(fromDate);

      setStudentFilter(
        studentdata.filter((item) => {
          const d = item.dob.split("/");
          let date = new Date(d[2], d[1] - 1, d[0]);
          return (
            item.name.toLowerCase().includes(studentName.toLowerCase()) &&
            (className === "All" || item.class === className) &&
            (gender === "All" || item.gender === gender) &&
            (document.getElementById("tungayId").value === "" || (date > fromDate && date < toDate))
          );
        })
      );
    }

    if (editStudentId > 0) {
      const date = document.getElementById("tungayId").value.split("-");
      console.log("get here");
      studentdata.forEach((student, index) => {
        if (student.id === editStudentId) {
          let updateStudent = {
            ...student,
            name: studentName,
            class: className,
            gender: document.getElementsByName("gioitinh")[0].checked
              ? "male"
              : "female",
            dob: date[2] + "/" + date[1] + "/" + date[0],
          };
          studentdata[index] = updateStudent;
        }
      });
      let updateStudentData = [...studentdata];
      setStudentFilter(updateStudentData);
      document.getElementById("submitForm").reset();
      setEditMode(false);
      setEditStudentId(0);
    }
  }

  function handleAddStudent() {
    const date = document.getElementById("tungayId").value.split("-");
    studentdata.push({
      id: studentdata.length + 1,
      name: document.getElementById("tenId").value,
      class: document.getElementById("lopId").value,
      gender: document.getElementsByName("gioitinh")[0].checked
        ? "male"
        : "female",
      dob: date[2] + "/" + date[1] + "/" + date[0],
      grades: [0, 0, 0],
    });
    let updateStudentData = [...studentdata];
    setStudentFilter(updateStudentData);
    document.getElementById("submitForm").reset();
    setEditMode(false);
    setEditStudentId(0);
  }

  function handleStudentChange(student) {
    console.log(student);
    setEditMode(true);
    setEditStudentId(student.id);
    document.getElementById("tenId").value = student.name;
    document.getElementById("lopId").value = student.class;
    if (student.gender === "male") {
      document.getElementsByName("gioitinh")[0].checked = true;
    } else document.getElementsByName("gioitinh")[1].checked = true;
    const stringToDate = student.dob.split("/");
    document.getElementById("tungayId").value =
      stringToDate[2] + "-" + stringToDate[1] + "-" + stringToDate[0];
  }

  function handleDeleteStudent(deleteStudent) {
    let updateStudentData = studentdata.filter(
      (student) => student.id !== deleteStudent.id
    );
    setStudentFilter(updateStudentData);
    studentdata = [...updateStudentData];
    document.getElementById("submitForm").reset();
    setEditMode(false);
    setEditStudentId(0);
  }

  return (
    <div className="App">
      <h2>Form Quản Lý Học Sinh</h2>
      <Form id="submitForm" className="form">
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
          <Button className="btn-success" onClick={handleFilter}>
            {editMode ? "Cập nhật" : "Tìm kiếm"}
          </Button>
          <Button className="btn btn-info" onClick={handleAddStudent}>
            Thêm Mới
          </Button>
          <Button
            className="btn-danger"
            onClick={() => handleDeleteStudent({ id: editStudentId })}
            disabled={!editMode}
          >
            Xóa
          </Button>
        </FormGroup>
      </Form>
      <StudentList
        list={studentfilter}
        getStudent={handleStudentChange}
        deleteStudent={handleDeleteStudent}
      />
    </div>
  );
}

export default App;
