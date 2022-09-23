import React from "react";
import { Component } from "react";
class Student extends Component{
    handleClickEdit = (studentEdit) =>{
        this.props.clickEditView(true,'edit',studentEdit);
    }
    handleClickView = (studentView) =>{
        console.log("Test: lấy dữ liệu trong Student")
        console.log(studentView);
        //
        this.props.clickEditView(true,'view',studentView);
    }
    handleClickDelete = (studentID) => {
        this.props.studentDelete(studentID);
    }
    render(){
        // Khai báo 
        let {student, index} = this.props;
        return(
            <tr>
                <td>{index+1}</td>
                <td>{student.studentID}</td>
                <td>{student.studentName}</td>
                <td>{student.age}</td>
                <td>{student.sex?'Nam':'Nữ'}</td>
                <td>
                <div className="template-demo">
                    <button
                    type="button"
                    className="btn btn-danger btn-icon-text"
                    onClick={()=>this.handleClickView(student)}
                    >
                    Xem
                    </button>
                    <button
                    type="button"
                    className="btn btn-warning btn-icon-text"
                    onClick={()=>this.handleClickEdit(student)}
                    >
                    Sửa
                    </button>
                    <button
                    type="button"
                    className="btn btn-success btn-icon-text"
                    onClick={()=>this.handleClickDelete(student.studentID)}
                    >
                    Xóa
                    </button>
                </div>
                </td>
            </tr>
        );
    }
}
export default Student;