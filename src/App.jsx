// import Navbar from "./pages/Navbar"
import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { Create } from "./pages/Create"
import { Explore } from "./pages/Explore"
import { Profile } from "./pages/Profile"
import { Viewnft } from "./pages/Viewnft"
import { Editprofile } from "./pages/Editprofile"
import { Searchnft } from "./pages/Searchnft"
import { Bid } from "./pages/Bid"
import { ViewnftBidding } from "./pages/ViewnftBidding"

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
          <Route path="/searchNft" element={<Searchnft />} />
          <Route path="/editProfile" element={<Editprofile />} />
          <Route path="/bidNft" element={<Bid />} />
          <Route path="/viewNftBidding" element={<ViewnftBidding />} />
        </Routes>
      </div>
    </>
  )
}

export default App