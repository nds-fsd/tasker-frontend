import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import LogIn from './views/login';
import SignUp from './views/signup';
import Dashboard from './views/dashboard';
import Colections from './views/colections';
import OneColection from './views/oneColection';
import Calendar from './views/calendar';
import Main from './views/main';
import { TaskerContextProvider } from './context';

const App = () => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <TaskerContextProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="login" element={<LogIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="app" element={<Main />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="collections" element={<Colections />} />
              <Route path="collections/:id" element={<OneColection />} />
              <Route path="calendar" element={<Calendar />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </TaskerContextProvider>
  </MuiPickersUtilsProvider>
);

export default App;
