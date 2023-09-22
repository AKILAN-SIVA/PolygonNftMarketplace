// import Navbar from "./pages/Navbar"
import { Routes, Route, useSearchParams } from "react-router-dom";
import { Home } from "./pages/Home";
import { Create } from "./pages/Create";
import { Explore } from "./pages/Explore";
import { Profile } from "./pages/Profile";
import { Viewnft } from "./pages/Viewnft";
import { Editprofile } from "./pages/Editprofile";
import { Searchnft } from "./pages/Searchnft";
import { Bid } from "./pages/Bid";
import { ViewnftBidding } from "./pages/ViewnftBidding";
import { NftInfo } from "./pages/LearningHub/HubPages/NftInfo";
import { MetaMaskInfo } from "./pages/LearningHub/HubPages/MetaMaskInfo";
import { MintInfo } from "./pages/LearningHub/HubPages/MintInfo";
import { ListingInfo } from "./pages/LearningHub/HubPages/ListingInfo";
import { BiddingInfo } from "./pages/LearningHub/HubPages/BiddingInfo";
import Admin from "./pages/Admin";
import { useEffect, useState } from "react";
import { AdminViewNft } from "./pages/AdminViewNft";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          setWalletAddress(accounts[0]);
          console.log(walletAddress);
        });
    } else {
      alert("Install Metamask Extension");
    }
  });
  return (
    <>
      <div>
        {/* <Navbar /> */}
        <Routes>
          {walletAddress == "0x80bbec3a0e1e91abd7a0adbc848afe6045d513ad" ? (
            <Route path="/" element={<Admin />} />
          ) : (
            <Route path="/" element={<Home />} />
          )}
          <Route path="/adminViewNft" element={<AdminViewNft />} />
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
  );
}

export default App;
