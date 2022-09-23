import React, {Component} from "react";

class Control extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchData:''
            
        }
    }
    handleClickNewStudent = () => {
        // Xử lý sự kiên onclick thêm mới sinh viên. Gọi props có vai trò là event của cha
        this.props.clickNewStudent(true,'create');
    }
    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]:value
        })
    }
    handleSearch = (e) =>{
        // Thực hiện chuyển searchData -> app Component
        this.props.handleSearch(this.state.searchData);
        e.preventDefault();
    }
    handleChangeSort = (e) => {
        let value = e.target.value;
        let arrSort = value.split('-');
        this.props.handleSort(arrSort[0],arrSort[1]);
    }
    render(){
        return(
            <div className="card-header">
                <div className="row">
                    <div className="col-3 ">
                        <button type="button" className="btn btn-primary btn-icon-text" onClick={this.handleClickNewStudent}>
                        Thêm mới sinh viên
                        </button>
                    </div>
                    <div className="col-6 ">
                        <form className="search-form" action="#">
                        <i className="icon-search" />
                        <input
                            type="search"
                            name="searchData"
                            className="form-control"
                            placeholder="Search Here"
                            title="Search here"
                            onChange={this.handleChange}
                        />
                        <button className="btn btn-primary btn-icon-text" onClick={this.handleSearch}>
                            Tìm kiếm
                        </button>
                        </form>
                    </div>
                    <div className="col-3 d-flex align-items-center">
                        <select className="form-control" onChange={this.handleChangeSort}>
                        <option value="StudentName-ASC">Tên SV tăng dần</option>
                        <option value="StudentName-DESC">Tên SV giảm dần</option>
                        <option value="Age-ASC">Tuổi tăng dần</option>
                        <option value="Age-DESC">Tuổi giảm dần</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}
export default Control;