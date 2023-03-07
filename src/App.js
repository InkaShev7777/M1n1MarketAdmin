import logo from './logo.svg';
import { Route, Routes, useNavigate,BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './MainPage';
import Authorization from './Authorization';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Authorization/>}></Route>
        <Route path='/mainpage' element={<Main/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
