// import Navbar from "./pages/Navbar"
import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { Create } from "./pages/Create"
import { Explore } from "./pages/Explore"
import { Profile } from "./pages/Profile"
import { Viewnft } from "./pages/Viewnft"

function App() {

  return (
    <>
      <div>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createNft" element={<Create />} />
          <Route path="/exploreNft" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/viewNft" element={<Viewnft />} />
        </Routes>
      </div>
    </>
  )
}

export default App
