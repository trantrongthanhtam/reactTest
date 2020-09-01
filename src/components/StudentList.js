import React, { useState } from "react";
import PropTypes from "prop-types";
import "./styles.css";
import { Input, Button } from "reactstrap";

const propTypes = {
  list: PropTypes.array,
};

function StudentList(props) {
  const { list, getStudent, deleteStudent } = props;
  const [allchecked, setAllChecked] = useState(false);
  const checkedList = Array(list.length).fill(0);
  const [itemchecked, setItemChecked] = useState(checkedList);

  function handleCheckAll() {
    setAllChecked(!allchecked);
  }

  function handleItemCheck() {
    console.log("checked");
  }

  return (
    <table className="studentList">
      <thead>
        <tr>
          <th>
            <Input type="checkbox" onChange={handleCheckAll} />
          </th>
          <th>Tên</th>
          <th>Lớp</th>
          <th>Ngày sinh</th>
          <th>Giới tính</th>
          <th>Điểm 1</th>
          <th>Điểm 2</th>
          <th>Điểm 3</th>
          <th>Điểm TB</th>
          <th>Tình Trạng</th>
          <th>Số lượng: {list.length}</th>
        </tr>
      </thead>

      <tbody>
        {list &&
          list.map((item, index) => {
            const avg = (item.grades[0] + item.grades[1] + item.grades[2]) / 3;
            return (
              <tr key={item.id}>
                <th>
                  <Input
                    type="checkbox"
                    checked={allchecked || itemchecked[index]}
                    onChange={handleItemCheck}
                  />
                </th>
                <th>{item.name}</th>
                <th>{item.class}</th>
                <th>{item.dob}</th>
                <th>{item.gender === "male" ? "Nam" : "Nữ"}</th>
                <th>{item.grades[0]}</th>
                <th>{item.grades[1]}</th>
                <th>{item.grades[2]}</th>
                <th>{avg.toFixed(1)}</th>
                <th>{avg > 5 ? "Đậu" : "Rớt"}</th>
                <th>
                  <Button
                    className="btn-primary"
                    onClick={() => {
                      getStudent(item);
                    }}
                  >
                    Cập nhật
                  </Button>
                </th>
                <th>
                  <Button className="btn-danger" onClick={() => {
                      deleteStudent(item);
                    }}>Xóa</Button>
                </th>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

StudentList.propTypes = propTypes;

export default StudentList;
