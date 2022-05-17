import './App.css';

import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Detail from './pages/Detail';
import Buy from './pages/Buy';
import TicketPage from './pages/TicketPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ChooseSeat from './pages/ChooseSeat';
import SummaryPage from './pages/SummaryPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='detail/:id' element={<Detail/>}/>  
        <Route path='buy' element={<Buy/>}/>
        <Route path='buy/seat' element={<ChooseSeat/>}/>
        <Route path='buy/seat/summary' element={<SummaryPage/>}/>
        <Route path='ticket' element={<TicketPage/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>      
    </div>
  );
}

export default App;
