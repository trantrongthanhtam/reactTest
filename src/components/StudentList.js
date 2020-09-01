import React, { useState } from "react";
import PropTypes from "prop-types";
import "./styles.css";
import { Input, Button, Label } from "reactstrap";

const propTypes = {
  list: PropTypes.array,
};

function StudentList(props) {
  const [allchecked, setAllChecked] = useState(false);
  console.log(allchecked);
  const { list } = props;
  console.log(list);

  function handleCheckAll() {
    setAllChecked(!allchecked);
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
          list.map((item) => {
            const avg = (item.grades[0] + item.grades[1] + item.grades[2]) / 3;
            return (
              <tr>
                <th>
                  <Input type="checkbox" checked={allchecked} />
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
                  <Button className="btn-primary">Cập nhật</Button>
                </th>
                <th>
                  <Button className="btn-danger">Xóa</Button>
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
