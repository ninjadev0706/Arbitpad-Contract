// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * Users can purchase tokens after sale started and claim after sale ended
 */

contract IDOSale is Pausable, ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    // user address => purchased token amount
    mapping(address => uint256) public purchasedAmounts;
    // user address => purchased eth amount
    mapping(address => uint256) public purchasedETHAmounts;
    // user address => purchased arb amount
    mapping(address => uint256) public purchasedARBAmounts;
    // user address => claimed token amount
    mapping(address => uint256) public claimedAmounts;
    // participants addresses
    mapping(address => bool) public purchasedStatus;
    // IDO token price
    uint256 public swapRate;
    uint256 public swapRate1;
    // IDO token address
    IERC20 public ido;
    // ARB token address
    IERC20 public arb;
    // The cap amount each user can purchase IDO up to
    uint256 public purchaseCap;
    // The total purchased amount
    uint256 public totalPurchasedAmount;

    // Date timestamp when token sale start
    uint256 public startTime;
    // Date timestamp when token sale ends
    uint256 public endTime;
    // number of participants
    uint256 public participants;

    // Used for returning purchase history
    struct Purchase {
        address account;
        uint256 amount;
    }

    event SwapRateChanged(uint256 swapRate);
    event SwapRate1Changed(uint256 swapRate1);
    event PurchaseCapChanged(uint256 purchaseCap);
    event Deposited(address indexed sender, uint256 amount);
    event Purchased(address indexed sender, uint256 amount);
    event Claimed(address indexed sender, uint256 amount);
    event Swept(address indexed sender, uint256 amount);

    constructor(
        IERC20 _ido,
        IERC20 _arb,
        uint256 _swapRate,
        uint256 _swapRate1,
        uint256 _purchaseCap
    ) {
        require(address(_ido) != address(0), "IDOSale: IDO_ADDRESS_INVALID");
        require(address(_arb) != address(0), "IDOSale: ARB_ADDRESS_INVALID");
        require(_swapRate > 0, "IDOSale: TOKEN_PRICE_INVALID");
        require(_swapRate1 > 0, "IDOSale: TOKEN_PRICE_INVALID");
        require(_purchaseCap > 0, "IDOSale: PURCHASE_CAP_INVALID");

        ido = _ido;
        arb = _arb;
        swapRate = _swapRate;
        swapRate1 = _swapRate1;
        purchaseCap = _purchaseCap;
    }

    /**************************|
    |          Setters         |
    |_________________________*/

    /**
     * @dev Set ido token price in purchaseToken
     */
    function setSwapRate(uint256 _swapRate) external onlyOwner {
        swapRate = _swapRate;

        emit SwapRateChanged(_swapRate);
    }

    /**
     * @dev Set arb token price in purchaseToken
     */
    function setSwapRate1(uint256 _swapRate1) external onlyOwner {
        swapRate1 = _swapRate1;

        emit SwapRate1Changed(_swapRate1);
    }

    /**
     * @dev Set purchase cap for each user
     */
    function setPurchaseCap(uint256 _purchaseCap) external onlyOwner {
        purchaseCap = _purchaseCap;

        emit PurchaseCapChanged(_purchaseCap);
    }

    /**
     * @dev Set purchase cap for each user
     */
    function setStartTime(uint256 _startTime) external onlyOwner {
        startTime = _startTime;
    }

    /**
     * @dev Set purchase cap for each user
     */
    function setEndTime(uint256 _endTime) external onlyOwner {
        endTime = _endTime;
    }

    /***************************|
    |          Pausable         |
    |__________________________*/

    /**
     * @dev Pause the sale
     */
    function pause() external onlyOwner {
        super._pause();
    }

    /**
     * @dev Unpause the sale
     */
    function unpause() external onlyOwner {
        super._unpause();
    }


    /***************************|
    |          Purchase         |
    |__________________________*/


    /**
     * @dev Deposit IDO token to the sale contract
     */
    function depositTokens(uint256 amount) external onlyOwner whenNotPaused {
        require(amount > 0, "IDOSale: DEPOSIT_AMOUNT_INVALID");
        ido.safeTransferFrom(_msgSender(), address(this), amount);

        emit Deposited(_msgSender(), amount);
    }

    /**
     * @dev Purchase IDO token
     * users can purchase within `purchcaseCap` amount
     */
    function purchase() external nonReentrant whenNotPaused payable {
        require(startTime <= block.timestamp, "IDOSale: SALE_NOT_STARTED");
        require(block.timestamp < endTime, "IDOSale: SALE_ALREADY_ENDED");
        require(msg.value > 0, "IDOSale: PURCHASE_AMOUNT_INVALID");

        require(purchasedAmounts[_msgSender()] + msg.value * swapRate / 100 <= purchaseCap, "IDOSale: PURCHASE_CAP_EXCEEDED");
        uint256 idoBalance = ido.balanceOf(address(this));
        require(totalPurchasedAmount + msg.value * swapRate / 100 <= idoBalance, "IDOSale: INSUFFICIENT_SELL_BALANCE");

        purchasedAmounts[_msgSender()] += msg.value * swapRate / 100;
        purchasedETHAmounts[_msgSender()] += msg.value;
        totalPurchasedAmount += msg.value * swapRate / 100;

        if(!purchasedStatus[_msgSender()]) {
            purchasedStatus[_msgSender()] = true;
            participants++;
        }

        emit Purchased(_msgSender(), msg.value);
    }

    /**
     * @dev Purchase IDO token with other token
     * users can purchase within `purchcaseCap` amount
     */
    function purchaseWithToken(uint token_amount) external nonReentrant whenNotPaused {
        require(startTime <= block.timestamp, "IDOSale: SALE_NOT_STARTED");
        require(block.timestamp < endTime, "IDOSale: SALE_ALREADY_ENDED");
        require(token_amount > 0, "IDOSale: PURCHASE_AMOUNT_INVALID");
        require(purchasedAmounts[_msgSender()] + token_amount * swapRate1 / 100 <= purchaseCap, "IDOSale: PURCHASE_CAP_EXCEEDED");
        uint256 idoBalance = ido.balanceOf(address(this));
        require(totalPurchasedAmount + token_amount * swapRate1 / 100 <= idoBalance, "IDOSale: INSUFFICIENT_SELL_BALANCE");

        arb.transferFrom(msg.sender, address(this), token_amount); 

        purchasedAmounts[_msgSender()] += token_amount * swapRate1 / 100;
        purchasedARBAmounts[_msgSender()] += token_amount;
        totalPurchasedAmount += token_amount * swapRate1 / 100;
    
        if(!purchasedStatus[_msgSender()]) {
            purchasedStatus[_msgSender()] = true;
            participants++;
        }

        emit Purchased(_msgSender(), token_amount);
    }


    /************************|
    |          Claim         |
    |_______________________*/

    /**
     * @dev Users claim purchased tokens after token sale ended
     */
    function claim(uint256 amount) external nonReentrant whenNotPaused {
        require(endTime <= block.timestamp, "IDOSale: SALE_NOT_ENDED");
        require(amount > 0, "IDOSale: CLAIM_AMOUNT_INVALID");
        require(claimedAmounts[_msgSender()] + amount <= purchasedAmounts[_msgSender()], "IDOSale: CLAIM_AMOUNT_EXCEEDED");

        claimedAmounts[_msgSender()] += amount;
        ido.safeTransfer(_msgSender(), amount);

        emit Claimed(_msgSender(), amount);
    }

    /**
     * @dev `Operator` sweeps `purchaseToken` from the sale contract to `to` address
     */
    function withdraw() external onlyOwner {
        // =============================================================================

        // This will payout the owner 100% of the contract balance.
        // Do not remove this otherwise you will not be able to withdraw the funds.
        // =============================================================================
        (bool os, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(os);
        // =============================================================================
    }

    function withdrawToken(address _tokenAddr) external onlyOwner {

        require(IERC20(_tokenAddr).balanceOf(address(this)) > 0, "Sufficient Token balance");
        
        IERC20(_tokenAddr).transfer(msg.sender, IERC20(_tokenAddr).balanceOf(address(this)));
    }
}