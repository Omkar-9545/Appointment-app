import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Navbar } from './components/Navbar/Navbar';
import { About} from './pages/About';
import { Service } from './pages/Services';
import { Error } from './pages/Error';
import { Footer } from './components/Footer/Footer';
import { Logout } from './pages/Logout';
import { Logo } from './components/logo/Logo';
import { Kolhapur } from './pages/city1-hospital';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Logo/>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Service />} />
          <Route path="/kolhapur" element={<Kolhapur/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App
