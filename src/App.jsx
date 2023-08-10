import Create from "./pages/Create"
import Navbar from "./pages/Navbar"
import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"

function App() {

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createNft" element={<Create />} />
        </Routes>
      </div>
    </>
  )
}

export default App
