//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PolygonNFTMarketplace is ERC721 {

    using Counters for Counters.Counter;
    Counters.Counter public TokenCount;

    constructor() ERC721("PolygonNFTMarketplace","DARK"){

    }

    function mint() public returns(uint256){
        TokenCount.increment();
        uint256 newTokenId = TokenCount.current();
        _safeMint(msg.sender,newTokenId);
        return newTokenId;
    }
}