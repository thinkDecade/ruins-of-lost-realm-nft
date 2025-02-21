// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract RunesOfLostRealms is Initializable, ERC721Upgradeable, OwnableUpgradeable, UUPSUpgradeable {
    // State variables
    uint256 public constant TOTAL_SUPPLY = 8;
    uint256 public constant MINT_PRICE = 0.00777 ether;
    uint256 public constant MAX_PER_WALLET = 2;
    string private baseTokenURI;
    uint256 private _tokenIdCounter;

    // Events
    event BaseURIUpdated(string newBaseURI);
    event WithdrawCompleted(address owner, uint256 amount);
    
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(string memory initialBaseURI) public initializer {
        __ERC721_init("Runes of the Lost Realms", "RLR");
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        baseTokenURI = initialBaseURI;
    }

    function mint() external payable {
        require(_tokenIdCounter < TOTAL_SUPPLY, "Minting would exceed max supply");
        require(msg.value == MINT_PRICE, "Incorrect payment amount");
        require(balanceOf(msg.sender) < MAX_PER_WALLET, "Exceeds max per wallet");
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        _safeMint(msg.sender, tokenId);
    }

    function mintBatch(uint256 quantity) external payable {
        require(_tokenIdCounter + quantity <= TOTAL_SUPPLY, "Minting would exceed max supply");
        require(msg.value == MINT_PRICE * quantity, "Incorrect payment amount");
        require(balanceOf(msg.sender) + quantity <= MAX_PER_WALLET, "Exceeds max per wallet");
        
        for(uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = _tokenIdCounter;
            _tokenIdCounter++;
            _safeMint(msg.sender, tokenId);
        }
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory newBaseURI) external onlyOwner {
        baseTokenURI = newBaseURI;
        emit BaseURIUpdated(newBaseURI);
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "Transfer failed");
        emit WithdrawCompleted(msg.sender, balance);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
} 