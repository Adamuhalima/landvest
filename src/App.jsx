import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Contact from './pages/Contact'
import Invest from './pages/invest'
import About from './pages/about'
import Properties from './pages/properties'

function App() {
  return (
    <>
      <Navbar />
{/* <div className="bg-gray-900 pt-50" > */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/about" element={<About />} />
        <Route path="/properties" element={<Properties />} />
      </Routes>

{/* </div> */}
    </> 
  )
}

export default App
