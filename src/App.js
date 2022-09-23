import {React, Component} from "react";
// khai báo các hàm
import Form from "./component/Form";
import Control from "./component/Control";
import ListStudent from "./component/ListStudent";

class App extends Component {
    constructor(props){
        super(props);
        // Khởi tạo state chứa mock data danh sách sinh viên
        this.state = {
            students:[
                {
                    studentID: 'SV001',
                    studentName: 'Nguyễn Văn A',
                    age: 20,
                    sex: true,
                    birthDate: '2000-04-15',
                    birthPlace: 'HN',
                    address: '25, Vũ Ngọc Phan'
                },
                {
                    studentID: 'SV002',
                    studentName: 'Nguyễn B',
                    age: 19,
                    sex: false,
                    birthDate: '2002-06-15',
                    birthPlace: 'DN',
                    address: '1, Phan Bội Châu'
                },
                {
                    studentID: 'SV003',
                    studentName: 'Đỗ Đình Huệ',
                    age: 20,
                    sex: true,
                    birthDate: '2000-10-06',
                    birthPlace: 'TPHCM',
                    address: '5, Lý Tự Trọng'
                }
            ],
            isToggle: false,
            actionName:'',
            searchData:'',
            orderDir:'',
            orderBy:'',
            selectedStudent:{}
        }
    }
    handleClickNewStudent = (toggle, actionName) =>{
        // Xử lý dữ liệu từ component con -> Control - Set lại state isToggle
        this.setState({
            isToggle:toggle,
            actionName:actionName
        })

    }
    handleClickSubmitForm = (toggle) =>{
        // Xử lý dữ liệu con (từ Form) - thực hiện set state isToggle
        this.setState({
            isToggle:toggle
        })
    }
    handleClickEditView = (toggle, actionName, selectedStudent) => {
        // 
        console.log('test lấy dữ liệu từ ListStudent sang App component');
        console.log(selectedStudent);
        this.setState({
            isToggle:toggle,
            actionName: actionName,
            selectedStudent:selectedStudent
        })
    }
    handleSearch = (searchData) =>{
        // Test nhận dữ liệu tìm kiếm từ input
        console.log(searchData);
        // Lưu trữ searchData vào State
        this.setState({
            searchData:searchData
        })
    }
    handleSort = (orderDir, orderBy) =>{
        // Test
        console.log(orderDir+'-'+orderBy);
        this.setState({
            orderDir: orderDir,
            orderBy: orderBy
        })
    }
    handleCreateNewSt = (studentNew) => {
        console.log('test dữ liệu chuyển từ form sang app component')
        console.log(studentNew);
        // Xử lý nhận dữ liệu từ component con - Control - set state isToggle
        let studentsNew = [...this.state.students];
        studentsNew.push(studentNew);
        this.setState({
            students:studentsNew
        })
    }
    handleUpdateSt = (studentEdit) => {
        console.log('test nhận thông tin edit');
        console.log(studentEdit);
        // Xử lý cập nhật thông tin sinh viên 
        let {students} = this.state;
        students.forEach((st,index)=>{
            if(st.studentID===studentEdit.studentID){
                students[index] = studentEdit;
            }
        });
        this.setState({
            students:students
        })
    }
    handleClickDelete = (studentID) => {
        console.log(studentID);
        // Xoá studentID trong danh sách sinh viên 
        let {students} = this.state;
        let indexDelete = 0;
        students.forEach((st, index) => {
            if(st.studentID===studentID){
                indexDelete = index;
            }
        })
        students.splice(indexDelete,1);
        this.setState({
            students:students
        })
    }
    render(){   
        // Lọc dữ liệu theo tiêu chí search để hiển thị trên component ListStudent
        let students = [];
        if(this.state.searchData==''){
            students = [...this.state.students]
        }else{
            // Lọc giá trị 
            this.state.students.forEach((st) =>{
                if (st.studentName.toLowerCase().includes(this.state.searchData.toLowerCase())){
                    students.push(st);
                }
            })
        }
        // Sắp xếp dữ liệu
        if (this.state.orderDir==='StudentName'){
            if(this.state.orderBy==='ASC'){
                students.sort((a,b) => ((a.studentName>b.studentName)?1:(a.studentName>b.studentName)?-1:0));
            }else{
                students.sort((a,b) => ((a.studentName>b.studentName)?-1:(a.studentName>b.studentName)?1:0));
            }
        }else{
            if(this.state.orderBy==='ASC'){
                // Sắp xếp tuổi tăng dần
                students.sort((a,b) => a.age-b.age);
            }else{
                // Sắp xếp tuổi giảm dần
                students.sort((a,b) => b.age-a.age);
            }
        }
        let elementForm = '';
        if (this.state.isToggle){
            elementForm = <Form clickSubmit = {this.handleClickSubmitForm} actionName={this.state.actionName} handleCreateNewSt={this.handleCreateNewSt} selectedStudent={this.state.selectedStudent} handleEdit={this.handleUpdateSt} />;
        }
        return(
            // JSX Student Management Start
            <div className="row">
                <div className="col-lg-7 grid-margin stretch-card">
                    <div className="card">
                        {/* Control Start */}
                        <Control clickNewStudent={this.handleClickNewStudent} handleSearch={this.handleSearch} handleSort={this.handleSort} />
                        {/* Control End */}
                        {/* List Student Start */}
                        <ListStudent students={students} clickEditView={this.handleClickEditView} clickDelete={this.handleClickDelete} />
                        {/* List Student End */}
                    </div>
                </div>
                {/* Form Start */}
                {elementForm}
                {/* Form End */}
            </div>
        );
    }   
}

export default App;
