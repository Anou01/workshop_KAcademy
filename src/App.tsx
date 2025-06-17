import { Route, BrowserRouter as Router ,Routes } from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import { Container, } from 'react-bootstrap'
import RegisterForm from './components/RegisterForm'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './components/HomePage'

function App() {

  return (
    <>
    <Router>
      <Container fluid>
        <Routes>
          <Route path='/login' element={<LoginForm/>}></Route>
          <Route path='/register' element={<RegisterForm/>}></Route>

          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } /> 
          <Route path="/home" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
          />
        </Routes>

      </Container>
      <ToastContainer/>

      

    </Router>
     
     


    </>
  )
}

export default App
