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
import { NftInfo } from "./pages/LearningHub/HubPages/NftInfo"
import { MetaMaskInfo } from "./pages/LearningHub/HubPages/MetaMaskInfo"
import { MintInfo } from "./pages/LearningHub/HubPages/MintInfo"
import { ListingInfo } from "./pages/LearningHub/HubPages/ListingInfo"
import { BiddingInfo } from "./pages/LearningHub/HubPages/BiddingInfo"

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
          <Route path="/learningHub/NftInfo" element={<NftInfo />} />
          <Route path="/learningHub/MetaMaskInfo" element={<MetaMaskInfo />} />
          <Route path="/learningHub/MintInfo" element={<MintInfo />} />
          <Route path="/learningHub/ListingInfo" element={<ListingInfo />} />
          <Route path="/learningHub/BiddingInfo" element={<BiddingInfo />} />
        </Routes>
      </div>
    </>
  )
}

export default App