import Navbar from "./components/navbar";
import { Routes, Route } from "react-router-dom";
//import Home from './pages/Home'
import Contact from './pages/Contact'
import Invest from './pages/invest'
import About from './pages/about'
import Properties from './pages/properties'
import Footer from './components/Footer';
import HomePage from './pages/Home';
 import TestSupabasePage from './testSupabase';
import CreateListing from "./pages/createListing";
import Login from './pages/Login';
import Signup from './pages/Signup';
//import { APIProvider, Map } from '@vis.gl/react-google-maps';


function App() {
  return (
    <div className="App">

      <Navbar />
{/* <div className="bg-gray-900 pt-50" > */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/about" element={<About />} />
        <Route path="/properties" element={<Properties />} />
        
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
