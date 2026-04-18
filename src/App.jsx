import Navbar from "./components/navbar";
import { Routes, Route, useLocation } from "react-router-dom";
//import Home from './pages/Home'
import Contact from './pages/Contact'
import Invest from './pages/invest'
import About from './pages/about'
import Properties from './pages/properties'
import PropertyDetails from './pages/PropertyDetails'
import UserProfile from './pages/UserProfile'
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
 import TestSupabasePage from './testSupabase';
import CreateListing from "./pages/createListing";
import Login from './pages/Login';
import Signup from './pages/Signup';
//import { APIProvider, Map } from '@vis.gl/react-google-maps';


function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/signup'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="App">
      {shouldShowNavbar && <Navbar />}
{/* <div className="bg-gray-900 pt-50" > */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/invest" element={<Invest />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/profile" element={<UserProfile />} />
        
<Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
       { <Route path="/testSupabase" element={<TestSupabasePage />} /> }
      </Routes>
      <Routes>
         <Route path="/createListing" element={<CreateListing />} />
      </Routes>

{/* </div> */}
    </div> 
  )
}

export default App
