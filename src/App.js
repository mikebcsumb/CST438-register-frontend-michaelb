import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SchedList from './components/SchedList';
import Semester from './components/Semester';
import Admin from './components/Admin';
//import Student from './components/Student';
import StudentList from './components/StudentList';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <AppBar position="static" color="default">
        <Toolbar>
           <Typography variant="h6" color="inherit">
            Course Registration test
           </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
       <Switch>
        <Route exact path='/' component={Semester} />
        <Route path='/schedule' component={SchedList} />
		<Route path='/students' component={StudentList} />	//maybe dont need this one. 
		<Route path='/admin' component={Admin} />		
       </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;