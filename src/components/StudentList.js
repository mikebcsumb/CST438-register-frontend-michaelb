import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
import Grid from '@mui/material/Grid';
import {DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddStudent from './AddStudent';

// NOTE:  for OAuth security, http request must have
//   credentials: 'include' 
//

// Name, email required. Set status code 0
// 
// Will need to create something that returns a list of students, 
// similar to the schedule for courses
//  
//  NOTE: because SchedList is invoked via <Route> in App.js  
//  props are passed in props.location

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = { students: [] };
  } 
  
  /* componentDidMount() {
    this.fetchStudents();
  }
  
  fetchStudents = () => {
    console.log("StudentList.fetchStudents");
    const token = Cookies.get('XSRF-TOKEN');
    
    fetch(`${SERVER_URL}/allStudents`, 
      {  
        method: 'GET', 
        headers: { 'X-XSRF-TOKEN': token }
      } )
    .then((response) => {
      console.log("FETCH RESP:"+response);
      return response.json();}) 
    .then((responseData) => { 
      // do a sanity check on response
      if (Array.isArray(responseData)) {
        this.setState({ 
          students: responseData,
        });
      } else {
        toast.error("Fetch failed.", {
          position: toast.POSITION.BOTTOM_LEFT
        });
      }        
    })
    .catch(err => {
      toast.error("Fetch failed.", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err); 
    })
  }
 */
  // Add student
  addStudent = (student) => {
    const token = Cookies.get('XSRF-TOKEN');
 
 ///HMMMMMM / 
    fetch(`${SERVER_URL}/addStudent`,
      { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json',
                   'X-XSRF-TOKEN': token  }, 
        body: JSON.stringify(student)
      })
    .then(res => {
        if (res.ok) {
          toast.success("Student successfully added", {
              position: toast.POSITION.BOTTOM_LEFT
          });
          this.fetchStudents();
        } else {
          toast.error("Error when adding", {
              position: toast.POSITION.BOTTOM_LEFT
          });
          console.error('Post http status =' + res.status);
        }})
    .catch(err => {
      toast.error("Error when adding", {
            position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err);
    })
  } 

  render() {
     const columns = [
      { field: 'name', headerName: 'Name', width: 400 },
      { field: 'email', headerName: 'Email', width: 400 },
      { field: 'status', headerName: 'Status Code', width: 150 }
      ];
  
  return(
      <div>
          <AppBar position="static" color="default">
            <Toolbar>
               <Typography variant="h6" color="inherit">
                  { 'Students'}
                </Typography>
            </Toolbar>
          </AppBar>
          <div className="App">
            <div style={{width:'100%'}}>
                For DEBUG:  display state.
                {JSON.stringify(this.state)}
            </div>
            <Grid container>
              <Grid item>
			    <ButtonGroup>
                  <AddStudent addStudent={this.addStudent}  />
				</ButtonGroup>
              </Grid>
            </Grid>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid rows={this.state.students} columns={columns} />
            </div>
            <ToastContainer autoClose={1500} />   
          </div>
      </div>
      ); 
  }
}

export default StudentList;