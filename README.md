# Pay4Me: Recovering Assets from Compromised Wallets

Pay4Me is a solution designed to help users with compromised wallets recover and transfer their assets securely. By utilizing gasless approvals and token transfers, the smart contract facilitates the transfer of funds from compromised wallets to secure destinations, ensuring safety and control.

---

## Why Pay4Me?

The need for Pay4Me arises from a critical issue many users face: wallet compromise. Once a wallet's private key is exposed, attackers can drain funds at will. Pay4Me addresses this by:
- Allowing users to securely transfer funds from a compromised wallet without needing to directly fund it with gas (avoiding instant theft).
- Using off-chain signatures to authorize transactions, ensuring no gas fees are deducted from the compromised wallet itself.
- Providing a straightforward interface for secure recovery.

---

## Smart Contract Module

This repository contains the smart contract module for Pay4Me. It leverages the EIP-2612 `permit` function to enable gasless token transfers and integrates secure access control for gas payments.

---

### Features

- **Gasless Approvals and Transfers**:
   - Uses `permit` functionality to authorize transfers without requiring gas fees from the compromised wallet.
- **Access Control**:
   - Only designated payees (gas sponsors) can execute transactions.
- **Event Logging**:
   - Tracks all token approvals and transfers for transparency and debugging.

---
