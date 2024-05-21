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
import { Gadhinglaj } from './pages/city2-hospital';
import { Sangli } from './pages/city3-hospital';
import { ApplyDoctor } from './pages/applyDoctor';
import { Notification } from './pages/Notification';
import { AdminLayout } from './components/Layouts/Admin-Layout';
import { AdminUsers } from './pages/Admin-Users';
import { AdminDoctors } from './pages/Admin-doctors';
import { AdminUpdate } from './pages/Admin-Update';
import { Profile } from './pages/Profile';
import { KolhapurDoc } from './pages/city1-doctors';
import { GadhinglajDoc } from './pages/city2-doctors';
import { SangliDoc } from './pages/city3-doctors';
import { DocProfile } from './pages/doc-profile';
import { Booking } from './pages/Booking-page';
import { Appointment } from './pages/Appointments';
import { Options } from './pages/Options';
import { DoctorLeave } from './pages/Doctor-leave';
import { Substitute } from './pages/Substitute';
import { Substitutes } from './pages/Substitutes';
import { UserAppointment } from './pages/User-Appointment';

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
          <Route path='/options' element={<Options/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path="/services" element={<Service />} />
          <Route path="/kolhapur" element={<Kolhapur />} />
          <Route path='/:id/leaves' element={<DoctorLeave/>} />
          <Route path='/kolhapur/:id/doctors' element={<KolhapurDoc />} />
          <Route path='/gadhinglaj' element={<Gadhinglaj />} />
          <Route path='/gadhinglaj/:id/doctors' element={<GadhinglajDoc/>} />
          <Route path='/sangli' element={<Sangli />} />
          <Route path='/sangli/:id/doctors' element={<SangliDoc/>} />
          <Route path='/apply-doctor' element={<ApplyDoctor />} />
          <Route path='/:id/doc/profile' element={<DocProfile />} />
          <Route path='/:id/booking' element={<Booking />} />
          <Route path='/:id/substitutes' element={<Substitutes />} />
          <Route path='/:id/getappointments' element={<UserAppointment/>} />
          <Route path='/notification' element={<Notification/>} />
          <Route path="/logout" element={<Logout />} />
          <Route path='/:id/substitute-doctors' element={<Substitute/>} />
          <Route path='/admin' element={<AdminLayout/>}>
            <Route path='users' element={<AdminUsers />}/>
            <Route path='doctors' element={<AdminDoctors />}/>
          </Route>
          <Route path='/admin/users/:id/edit' element={<AdminUpdate />} />
          <Route path='/:id/appointments' element={<Appointment/>} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App
