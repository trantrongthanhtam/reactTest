import React from "react";
import PropTypes from "prop-types";
import "./styles.css";
import { Input } from "reactstrap";

const propTypes = {
    list: PropTypes.array
};

function StudentList(props) {
  const {list} = props;
  console.log(list);

  return (
    <table className="studentList">
      <thead><tr>
        <th><Input type="checkbox"/></th>
        <th>Tên</th>
        <th>Lớp</th>
        <th>Ngày sinh</th>
        <th>Giới tính</th>
        <th>Điểm 1</th>
        <th>Điểm 2</th>
        <th>Điểm 3</th>
        <th>Điểm TB</th>
        <th>Tình Trạng</th>
      </tr></thead>
      
      <tbody>
          {list && list.map((item)=>{
              const avg = ((item.grades[0]+item.grades[1]+item.grades[2])/3);
              return (
                <tr>
        <th><Input type="checkbox"/></th>
        <th>{item.name}</th>
        <th>{item.class}</th>
        <th>{item.dob}</th>
        <th>{item.gender ==="male"? "Nam" : "Nữ"}</th>
        <th>{item.grades[0]}</th>
        <th>{item.grades[1]}</th>
        <th>{item.grades[2]}</th>
        <th>{avg.toFixed(1)}</th>
        <th>{avg > 5? "Đậu":"Rớt"}</th>
      </tr>
              )
          })}
      </tbody>
    </table>
  );
}

StudentList.propTypes = propTypes;

export default StudentList;
