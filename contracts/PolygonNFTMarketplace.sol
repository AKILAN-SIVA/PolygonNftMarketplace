//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

contract PolygonNFTMarketplace is ERC721URIStorage , ReentrancyGuard {

    using Counters for Counters.Counter;
    Counters.Counter public TokenCount;
    Counters.Counter public SoldCount;
    Counters.Counter public BuyCount;
    Counters.Counter public listingCounter;
    Counters.Counter public biddingCounter;
    Counters.Counter public CreatorsCount;

    struct ListedToken{
        uint256 tokenId;
        uint256 price;
        uint256 bidPrice;
        address payable owner;
        uint256 format;
        bool NFTsold;
        bool NFTbought;
        bool NFTListed;
        bool NFTBidded;
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

    mapping(uint256 => string) public idToImageHash;

    mapping(uint256 => address) public Creators;

    uint8 public constant STATUS_OPEN = 1;
    uint8 public constant STATUS_DONE = 0;

    uint256 public minAuctionIncrement = 10; // 10 percent

    struct Listing {
        uint256 biddingId;
        address payable seller;
        uint256 tokenId;
        uint256 price; // display price
        uint256 netPrice; // actual price
        uint256 startAt;
        uint256 deadline;
        string  date;
        uint256 status;
    }

    mapping(uint256 => Listing) public listings;
    mapping(uint256 => address) public highestBidder;
    mapping(uint256 => uint256) public highestBiddingAmount;
    // uint256 public highestBidding = 0;
    

    constructor() ERC721("PolygonNFTMarketplace","DARK"){

    }

    function checkImageExist(string memory imageHash) public view {
        uint256 tokenCount = TokenCount.current();
        string memory imghash = imageHash;
        string memory idHash;
        uint256 count = 0;
        for(uint256 i=0;i<tokenCount;i++){
            idHash = idToImageHash[i+1];
            if(keccak256(abi.encodePacked(idHash)) == keccak256(abi.encodePacked(imghash))){
                count = count + 1;
            }
        }
        require(count == 0,"NFT Already exist");
        
    } 

    function CreateToken(string memory tokenURI, string memory imageHash, uint256 fileType) public payable returns(uint256){

        checkImageExist(imageHash);
        TokenCount.increment();
        uint256 newTokenId = TokenCount.current();
        
        _safeMint(msg.sender,newTokenId);
        
        _setTokenURI(newTokenId, tokenURI);

        idToImageHash[newTokenId] = imageHash;

        createListedToken(newTokenId,fileType);

        return newTokenId;
    }

    function createListedToken(uint256 id,uint256 fileType) private{
        idToListedToken[id] = ListedToken(
            id,
            0,
            0,
            payable (msg.sender),
            fileType,
            false,
            false,
            false,
            false
        ); 
        newUser(msg.sender);
        }
    
    function newUser(address user) public {
        uint256 Totuser = CreatorsCount.current();
        uint256 count=0;
        for(uint256 i=0;i<Totuser;i++){
            if(Creators[i+1] == user){
                    count +=1;
            }
        }
        if(count == 0){
            CreatorsCount.increment();
            uint256 count2 = CreatorsCount.current();
            Creators[count2] = user;
        }
    }
    
    function ListNFT(uint256 price,uint256 id) public{
        idToListedToken[id].price = price;
        idToListedToken[id].NFTListed = true;
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

    function getTotalMintedTokens() public view returns(uint256){
        return TokenCount.current();
    }

    function getTotalSoldTokens() public view returns(uint256){
        return SoldCount.current();
    }

    function getTotalBiddedTokens() public view returns(uint256){
        return biddingCounter.current();
    }

    function getTotalUser() public view returns(uint256){
        return CreatorsCount.current();
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
        newUser(msg.sender);
        idToListedToken[tokenId].NFTListed = false;
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

    struct Bidding{
        uint256 tokenId;
        uint256 biddingId;
        address bidder;
        uint256 price;
    }

    mapping (uint256 => Bidding) public idToBiddedToken;


    function createAuctionListing (uint256 price, uint256 tokenId, uint256 deadline, string memory aucDate) public returns (uint256) {
        listingCounter.increment();
        uint256 listingId = listingCounter.current() ;
        uint256 startAt = block.timestamp;
        uint256 endAt = startAt + deadline;
        idToListedToken[tokenId].bidPrice = price;

        listings[listingId] = Listing({
            biddingId: listingId,
            seller: payable (msg.sender),
            tokenId: tokenId,
            price: price,
            netPrice: price,
            status: STATUS_OPEN,
            startAt: startAt,
            date: aucDate,
            deadline: endAt
        });
        idToListedToken[tokenId].NFTBidded = true; 
        // _transfer(msg.sender, address(this), tokenId);

        return listingId;
    }

    function bid(uint256 listingId) public payable nonReentrant {
        require(isAuctionOpen(listingId), "auction has ended");
        require(msg.value > listings[listingId].price, "Value is smaller than bid value");
        require(msg.sender != listings[listingId].seller,"you can't bid your own nft");
        uint256 count = 0;
        uint256 highestBidding =0;
        for(uint256 i=0;i<biddingCounter.current();i++){
            if((msg.sender == idToBiddedToken[i+1].bidder) && (listingId==idToBiddedToken[i+1].biddingId)){
                idToBiddedToken[i+1].price += msg.value;
                count = 1;
                highestBidding = highestBiddingAmount[listingId];
            if( idToBiddedToken[i+1].price > highestBidding){
                highestBidder[listingId] = msg.sender;
                highestBiddingAmount[listingId] = idToBiddedToken[i+1].price;
        }
        }
        }
        if(count == 0){
            biddingCounter.increment();
        uint256 newbiddingCount = biddingCounter.current();
        idToBiddedToken[newbiddingCount] = Bidding(
            listings[listingId].tokenId,
            listingId,
            payable (msg.sender),
            msg.value
            );
        highestBidding = highestBiddingAmount[listingId];
        if(msg.value > highestBidding){
            highestBidder[listingId] = msg.sender;
            highestBiddingAmount[listingId] = msg.value;
        }
        }
        newUser(msg.sender);
    }

    function getHighestBidder(uint256 listingId) public view returns(address){
            return highestBidder[listingId];
    }

    function getHighestBiddingAmount(uint256 listingId) public view returns(uint256){
            return highestBiddingAmount[listingId];
    }

    function getAllBiddingWithListingID() public view returns(Bidding[] memory){
        uint256 totalbiddingCount = biddingCounter.current();
        uint256 count = 0;
        uint256 biddingToListingId;
        
        for(uint256 i=0;i<totalbiddingCount;i++){
            
            if(idToBiddedToken[i+1].price != 0){
                    biddingToListingId++;
            }
        }
        Bidding[] memory myItems = new Bidding[](biddingToListingId);
        for(uint256 i=0;i<totalbiddingCount;i++){
            
            if(idToBiddedToken[i+1].price != 0){
                    Bidding storage currentItem = idToBiddedToken[i+1];
                    myItems[count] = currentItem;
                    count++;
            }
        }
        return myItems;
    }

    function completeAuction(uint256 listingId) public payable nonReentrant {
        require(!isAuctionOpen(listingId), 'auction is still open');
        Listing storage listing = listings[listingId];
        address winner = highestBidder[listingId];
        require(
            msg.sender == listing.seller || msg.sender == winner, 
            'only seller or winner can complete auction'
        );
        uint256 amount = highestBiddingAmount[listingId];
        uint256 tokenId = listing.tokenId;
        if( amount == 0){
            listing.status = STATUS_DONE;
            idToListedToken[tokenId].NFTBidded = false;
            idToListedToken[tokenId].bidPrice = 0;
        }else{
        address payable seller = listing.seller;
        _transfer(seller,winner,listing.tokenId);
        // approve(seller,listing.tokenId);
        payable (seller).transfer(amount);
        SoldCount.increment();
        uint256 scount = SoldCount.current();
        idToSoldItems[scount] = ItemsSold (
            tokenId,
            amount,
            seller,
            msg.sender,
            true
        );
        
        listing.seller = payable (winner);
        // listing.price = 0;
        idToListedToken[tokenId].owner = payable (winner);
        listing.status = STATUS_DONE;
        idToListedToken[tokenId].bidPrice = 0;
        idToListedToken[tokenId].NFTBidded = false;
        }
    }

    function withdrawBid(uint256 listingId) public payable nonReentrant {
        require(isAuctionExpired(listingId), "auction must be ended");
        require(highestBidder[listingId] != msg.sender, "highest bidder cannot withdraw bid");
        uint256 totalBiddingCount = biddingCounter.current();
        uint256 price;
        for(uint256 i=0;i<totalBiddingCount;i++){
            if((idToBiddedToken[i+1].bidder == msg.sender) && (listingId == idToBiddedToken[i+1].biddingId)){
                price += idToBiddedToken[i+1].price;
                idToBiddedToken[i+1].price = 0;
            }
        }
        
        payable (msg.sender).transfer(price);

    }

    function isAuctionOpen(uint256 id) public view returns (bool) {
        return
            listings[id].status == STATUS_OPEN &&
            listings[id].deadline > block.timestamp;
    }


    function isAuctionExpired(uint256 id) public view returns (bool) {
        return listings[id].deadline <= block.timestamp;
    }

    function getAllBiddedNfts() public view returns(Listing[] memory){
        uint256 totalItemCount = listingCounter.current();
        uint256 listCount=0;
        uint256 count=0;
        for(uint256 i=0;i<totalItemCount;i+=1){ 
            if(listings[i+1].price != 0){
                listCount+=1;
            }
        }
        Listing [] memory items = new Listing[] (listCount);
        for(uint256 i=0;i<totalItemCount;i+=1){
            Listing storage currentItem = listings[i+1] ; 
            if(listings[i+1].price != 0){
                items[count] = currentItem ;
                count+=1;
            }
        }
        return items;
    }

}