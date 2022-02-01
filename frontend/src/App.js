import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Tasks from './pages/Tasks';
import { useState } from 'react';
import Alert from './components/Alert';
import EditTask from './pages/EditTask';
import PageNotFound from './pages/PageNotFound';

function App() {
  document.title = "Home - Task App"

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }
  
  return (
    <BrowserRouter>
      <Navbar />
      <Alert alert={alert} />
      <Routes>
        <Route path="/" element={<Tasks showAlert={showAlert}/>} />
        <Route path="/edit/task/:id" element={<EditTask showAlert={showAlert}/>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
