import {React, Component} from 'react';
class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
            studentID:'',
            studentName:'',
            age:'',
            sex:true,
            birthDate:'',
            birthPlace:'',
            address:''
        }
    }
    handleClickSubmit = (event) => {
        // Đóng Form
        this.props.clickSubmit(false);
        // Xử lý với trường hợp actionName = 'create
        if(this.props.actionName==='create'){
            // Test nhan thong tin nhap vao
            console.log('Test dữ diệu nhập vào');
            console.log('StudentID: '+this.state.studentID+' - StudentName: '+this.state.studentName);
            //Chuyển đối tượng sinh viên mới sang App component
            let studentNew = {
                studentID:this.state.studentID,
                studentName:this.state.studentName,
                age:this.state.age,
                sex:this.state.sex,
                birthDate:this.state.birthDate,
                birthPlace:this.state.birthPlace,
                address:this.state.address
            }
            // Chuyển đối tượng studentNew về App component
            this.props.handleCreateNewSt(studentNew);
        }else if(this.props.actionName==='edit'){
            // Xử lý cho trường hợp cập nhật thông tin sinh viên
            let studentEdit = {
                studentID:this.state.studentID,
                studentName:this.state.studentName,
                age:this.state.age,
                sex:this.state.sex,
                birthDate:this.state.birthDate,
                birthPlace:this.state.birthPlace,
                address:this.state.address
            } 
            this.props.handleEdit(studentEdit);
        }
        event.preventDefault();
    }

    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        if(name==='sex'){
            value = (value==='true');
        }
        this.setState({
            [name]:value
        })
    }
    componentWillMount(){
        // set lại state
        let {selectedStudent} = this.props;
        this.setState({
            studentID:selectedStudent.studentID,
            studentName:selectedStudent.studentName,
            age:selectedStudent.age,
            sex:selectedStudent.sex,
            birthDate:selectedStudent.birthDate,
            birthPlace:selectedStudent.birthPlace,
            address:selectedStudent.address
        })
    }
    componentWillReceiveProps(nextProps){
        // set lại state
        let {selectedStudent} = nextProps;
        this.setState({
            studentID:selectedStudent.studentID,
            studentName:selectedStudent.studentName,
            age:selectedStudent.age,
            sex:selectedStudent.sex,
            birthDate:selectedStudent.birthDate,
            birthPlace:selectedStudent.birthPlace,
            address:selectedStudent.address
        })
    }
    render(){
        let checkReadOnly = false;
        let checkStudentID = true;
        let elementSubmit = '';
        if(this.props.actionName=='create'){
            checkStudentID = false;
            elementSubmit = <button type="submit" className="btn btn-primary me-2" onClick={this.handleClickSubmit}>
                Create
            </button>
        } else if(this.props.actionName=='edit'){
            elementSubmit = <button type="submit" className="btn btn-primary me-2" onClick={this.handleClickSubmit}>
                Edit
            </button>
        } else{
            checkReadOnly = true;
            elementSubmit ='';
        }
        return(
            <div className="col-5 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">Thông tin sinh viên</h3>
                        <form className="form-sample">
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Mã sinh viên</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name='studentID' onChange={this.handleChange} value={this.state.studentID} readOnly={checkStudentID} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Tên sinh viên</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name='studentName' onChange={this.handleChange} value={this.state.studentName} readOnly={checkReadOnly} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Tuổi</label>
                            <div className="col-sm-9">
                            <input type="text" className="form-control" name='age' onChange={this.handleChange} value={this.state.age} readOnly={checkReadOnly} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Giới tính</label>
                            <div className="col-sm-9">
                            <select className="form-control" name='sex' onChange={this.handleChange} value={this.state.sex} readOnly={checkReadOnly} >
                                <option value={true}>Nam</option>
                                <option value={false}>Nữ</option>
                            </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Ngày sinh</label>
                            <div className="col-sm-9">
                            <input type={'date'} className="form-control" placeholder="dd/mm/yyyy" name='birthDate' onChange={this.handleChange} value={this.state.birthDate} readOnly={checkReadOnly} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Nơi sinh</label>
                            <div className="col-sm-9">
                            <select className="form-control" name='birthPlace' onChange={this.handleChange} value={this.state.birthPlace} readOnly={checkReadOnly} >
                                <option value={'HN'}>Hà Nội</option>
                                <option value={'TPHCM'}>TP. Hồ Chí Minh</option>
                                <option value={'DN'}>Đà Nẵng</option>
                                <option value={'QN'}>Quảng Ninh</option>
                            </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Địa chỉ</label>
                            <div className="col-sm-9">
                            <textarea className="form-control" name="address" onChange={this.handleChange} value={this.state.address} readOnly={checkReadOnly} />
                            </div>
                        </div>
                        {/* button Submit start */}
                        {elementSubmit}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Form;