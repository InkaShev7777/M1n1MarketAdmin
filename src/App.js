import logo from './logo.svg';
import { Route, Routes, useNavigate,BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './MainPage';
import Authorization from './Authorization';
import InfoPage from './InfoPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Authorization/>}></Route>
        <Route path='/mainpage' element={<Main/>}></Route>
        <Route path='/infopage' element={<InfoPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
