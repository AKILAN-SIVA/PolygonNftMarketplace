//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PolygonNFTMarketplace is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter public TokenCount;

    struct ListedToken{
        uint256 tokenId;
        uint256 price;
        address owner;
    }

    mapping(uint256 => ListedToken) public idToListedToken;

    constructor() ERC721("PolygonNFTMarketplace","DARK"){

    }

    function mint(string memory tokenURI, uint256 price) public payable returns(uint256){
        require(price > 0,"price cant't be negative");
        TokenCount.increment();
        uint256 newTokenId = TokenCount.current();
        
        _safeMint(msg.sender,newTokenId);
        
        _setTokenURI(newTokenId, tokenURI);

        createListedToken(newTokenId,price);

        return newTokenId;
    }

    function createListedToken(uint256 id, uint256 price) private{
        idToListedToken[id] = ListedToken(
            id,
            price,
            msg.sender
        ); 
        }
    
    function getAllNfts() public view returns(ListedToken[] memory){
        uint256 totalItemCount = TokenCount.current();
        uint256 count=0;
        ListedToken [] memory items = new ListedToken[] (totalItemCount);
        for(uint256 i=0;i<totalItemCount;i+=1){
            ListedToken storage currentItem = idToListedToken[i+1] ; 
            items[count] = currentItem ;
            count+=1;
        }
        return items;
    }

    function getMyNFTs() public view returns(ListedToken[] memory){
        uint256 totalItemCount = TokenCount.current();
        uint256 count = 0;
        uint256 mynftcount;
        
        for(uint256 i=0;i<totalItemCount;i++){
            
            if(idToListedToken[i+1].owner == msg.sender){
                    mynftcount++;
            }
        }
        ListedToken[] memory myItems = new ListedToken[](mynftcount);
        for(uint256 i=0;i<totalItemCount;i++){
            
            if(idToListedToken[i+1].owner == msg.sender){
                    ListedToken storage currentItem = idToListedToken[i+1];
                    myItems[count] = currentItem;
                    count++;
            }
        }
        return myItems;
    }

    
}