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

     uint256 public listingCounter;

    uint8 public constant STATUS_OPEN = 1;
    uint8 public constant STATUS_DONE = 2;

    uint256 public minAuctionIncrement = 10; // 10 percent

    struct Listing {
        address seller;
        uint256 tokenId;
        uint256 price; // display price
        uint256 netPrice; // actual price
        uint256 startAt;
        uint256 endAt; 
        uint8 status;
    }

    event Minted(address indexed minter, uint256 nftID, string uri);
    event AuctionCreated(uint256 listingId, address indexed seller, uint256 price, uint256 tokenId, uint256 startAt, uint256 endAt);
    event BidCreated(uint256 listingId, address indexed bidder, uint256 bid);
    event AuctionCompleted(uint256 listingId, address indexed seller, address indexed bidder, uint256 bid);
    event WithdrawBid(uint256 listingId, address indexed bidder, uint256 bid);

    mapping(uint256 => Listing) public listings;
    mapping(uint256 => mapping(address => uint256)) public bids;
    mapping(uint256 => address) public highestBidder;

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

    function createAuctionListing (uint256 price, uint256 tokenId, uint256 durationInSeconds) public returns (uint256) {
        listingCounter++;
        uint256 listingId = listingCounter;

        uint256 startAt = block.timestamp;
        uint256 endAt = startAt + durationInSeconds;

        listings[listingId] = Listing({
            seller: msg.sender,
            tokenId: tokenId,
            price: price,
            netPrice: price,
            status: STATUS_OPEN,
            startAt: startAt,
            endAt: endAt
        });

        _transfer(msg.sender, address(this), tokenId);

        emit AuctionCreated(listingId, msg.sender, price, tokenId, startAt, endAt);

        return listingId;
    }

    function bid(uint256 listingId) public payable nonReentrant {
        require(isAuctionOpen(listingId), 'auction has ended');
        Listing storage listing = listings[listingId];
        require(msg.sender != listing.seller, "cannot bid on what you own");

        uint256 newBid = bids[listingId][msg.sender] + msg.value;
        require(newBid >= listing.price, "cannot bid below the latest bidding price");

        bids[listingId][msg.sender] += msg.value;
        highestBidder[listingId] = msg.sender;

        uint256 incentive = listing.price / minAuctionIncrement;
        listing.price = listing.price + incentive;

        emit BidCreated(listingId, msg.sender, newBid);
    }


    function completeAuction(uint256 listingId) public payable nonReentrant {
        require(!isAuctionOpen(listingId), 'auction is still open');

        Listing storage listing = listings[listingId];
        address winner = highestBidder[listingId]; 
        require(
            msg.sender == listing.seller || msg.sender == winner, 
            'only seller or winner can complete auction'
        );

        if(winner != address(0)) {
           _transfer(address(this), winner, listing.tokenId);

            uint256 amount = bids[listingId][winner]; 
            bids[listingId][winner] = 0;
            _transferFund(payable(listing.seller), amount);

        } else {
            _transfer(address(this), listing.seller, listing.tokenId);
        }

        listing.status = STATUS_DONE;

        emit AuctionCompleted(listingId, listing.seller, winner, bids[listingId][winner]);
    }

    function withdrawBid(uint256 listingId) public payable nonReentrant {
        require(isAuctionExpired(listingId), 'auction must be ended');
        require(highestBidder[listingId] != msg.sender, 'highest bidder cannot withdraw bid');

        uint256 balance = bids[listingId][msg.sender];
        bids[listingId][msg.sender] = 0;
        _transferFund(payable(msg.sender), balance);

        emit WithdrawBid(listingId, msg.sender, balance);

    }

    function isAuctionOpen(uint256 id) public view returns (bool) {
        return
            listings[id].status == STATUS_OPEN &&
            listings[id].endAt > block.timestamp;
    }


    function isAuctionExpired(uint256 id) public view returns (bool) {
        return listings[id].endAt <= block.timestamp;
    }


    function _transferFund(address payable to, uint256 amount) internal {
        if (amount == 0) {
            return;
        }
        require(to != address(0), 'Error, cannot transfer to address(0)');

        (bool transferSent, ) = to.call{value: amount}("");
        require(transferSent, "Error, failed to send Ether");
    }

}
