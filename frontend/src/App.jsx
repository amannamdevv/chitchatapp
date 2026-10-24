import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import { Toaster } from'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

function App() {
  const { authUser }= useAuthContext();

  return (
    <div className='h-screen flex items-center justify-center'>
      <Routes >
        <Route exact path='/' element={ authUser ? <Home /> : <Navigate to={'/login'} /> } />
        <Route exact path='/login' element={ authUser ? <Navigate to='/' /> : <Login />} />
        <Route exact path='/signup' element={ authUser ? <Navigate to='/' /> : <SignUp />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App;