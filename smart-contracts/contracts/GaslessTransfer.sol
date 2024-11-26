// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";
contract GaslessTokenTransfer {
    address public degenTokenAddress;
    address public payee; // The address that pays for gas

    event TransferExecuted(address indexed owner, address indexed to, uint256 amount);

    constructor(address _degenTokenAddress, address _payee) {
        degenTokenAddress = _degenTokenAddress;
        payee = _payee;
    }

    modifier onlyPayee() {
        require(msg.sender == payee, "Only the payee can call this function");
        _;
    }

    //  to execute gasless approval and transfer in one call
    function executePermitAndTransfer(
        address owner,
        address to,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external onlyPayee {
        // Call the `permit` function on the token contract to approve the transfer
        IERC20Permit(degenTokenAddress).permit(owner, address(this), value, deadline, v, r, s);

        // Transfer the tokens from the owner to the recipient
        IERC20(degenTokenAddress).transferFrom(owner, to, value);

        emit TransferExecuted(owner, to, value);
    }
}
