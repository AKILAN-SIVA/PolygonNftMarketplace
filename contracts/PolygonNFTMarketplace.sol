//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PolygonNFTMarketplace is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter public TokenCount;
    Counters.Counter public SoldCount;

    struct ListedToken{
        uint256 tokenId;
        uint256 price;
        address payable owner;
        bool NFTsold;
        bool NFTbought;
    }

    struct ItemsSold{
        uint256 tokenId;
        uint256 price;
        address payable owner;
        address newOwner;
        bool NFTsold;
    }

    mapping(uint256 => ListedToken) public idToListedToken;

    mapping(uint256 => ItemsSold) public idToSoldItems;

    constructor() ERC721("PolygonNFTMarketplace","DARK"){

    }

    function CreateToken(string memory tokenURI) public payable returns(uint256){

        TokenCount.increment();
        uint256 newTokenId = TokenCount.current();
        
        _safeMint(msg.sender,newTokenId);
        
        _setTokenURI(newTokenId, tokenURI);

        createListedToken(newTokenId);

        return newTokenId;
    }

    function createListedToken(uint256 id) private{
        idToListedToken[id] = ListedToken(
            id,
            0,
            payable (msg.sender),
            false,
            false
        ); 
        }
    
    function ListNFT(uint256 price,uint256 id) public{
        idToListedToken[id].price = price;
        idToListedToken[id].NFTbought = false;
    }
    
    function getAllNfts() public view returns(ListedToken[] memory){
        uint256 totalItemCount = TokenCount.current();
        uint256 listCount=0;
        uint256 count=0;
        for(uint256 i=0;i<totalItemCount;i+=1){ 
            if(idToListedToken[i+1].price != 0){
                listCount+=1;
            }
        }
        ListedToken [] memory items = new ListedToken[] (listCount);
        for(uint256 i=0;i<totalItemCount;i+=1){
            ListedToken storage currentItem = idToListedToken[i+1] ; 
            if(idToListedToken[i+1].price != 0){
                items[count] = currentItem ;
                count+=1;
            }
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

    function executeSale(uint256 tokenId) public payable {
        uint256 price = idToListedToken[tokenId].price;
        require(msg.sender != idToListedToken[tokenId].owner,"you can't buy your own nft");
        // require(msg.value == price,"price does not same");
        address payable seller = idToListedToken[tokenId].owner;
        
        _transfer(seller,msg.sender,tokenId);
        approve(seller,tokenId);
        idToListedToken[tokenId].owner = payable (msg.sender);
        idToListedToken[tokenId].NFTsold = true;
        idToListedToken[tokenId].NFTbought = true;
        payable (seller).transfer(msg.value);
        SoldCount.increment();
        uint256 scount = SoldCount.current();
        idToSoldItems[scount] = ItemsSold (
            tokenId,
            price,
            seller,
            msg.sender,
            true
        );
        idToListedToken[tokenId].price = 0;
    }

    function getMySoldNFTs() public view returns(ItemsSold[] memory){
        uint256 totalItemSoldCount = SoldCount.current();
        uint256 count = 0;
        uint256 mySoldNftcount;
        
        for(uint256 i=0;i<totalItemSoldCount;i++){
            
            if(idToSoldItems[i+1].owner == msg.sender){
                    mySoldNftcount++;
            }
        }
        ItemsSold[] memory myItems = new ItemsSold[](mySoldNftcount);
        for(uint256 i=0;i<totalItemSoldCount;i++){
            
            if(idToSoldItems[i+1].owner == msg.sender){
                    ItemsSold storage currentItem = idToSoldItems[i+1];
                    myItems[count] = currentItem;
                    count++;
            }
        }
        return myItems;
    }
}
