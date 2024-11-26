// scripts/executeTransfer.ts

import { createPublicClient, createWalletClient, http, parseEther, parseGwei, encodeFunctionData } from 'viem';
import { mainnet, base } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { ethers } from 'ethers';

async function main() {
  // Replace with your actual values
  const contractAddress: `0x${string}` = '0xYourDeployedContractAddress';
  const degenTokenAddress: `0x${string}` = '0xYourDegenTokenAddress';
  const recipientAddress = '0xRecipientAddress';
  const ownerPrivateKey = '0xOwnerPrivateKey';
  const payeePrivateKey = '0xPayeePrivateKey';

  // Initialize clients
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
  });

  const ownerAccount = privateKeyToAccount(ownerPrivateKey);
  const payeeAccount = privateKeyToAccount(payeePrivateKey);

  const walletClient = createWalletClient({
    account: payeeAccount,
    chain: mainnet,
    transport: http(),
  });

  // Load ABI
  const abiPath = resolve(__dirname, '../artifacts/contracts/GaslessTokenTransfer.sol/GaslessTokenTransfer.json');
  const abi = JSON.parse(readFileSync(abiPath, 'utf-8')).abi;

  // Define transfer parameters
  const value = parseEther('1');
  const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600); // 1 hour from now

  // Define EIP-712 domain
  const domain = {
    name: 'YourTokenName',
    version: '1',
    chainId: await publicClient.getChainId(),
    verifyingContract: degenTokenAddress,
  };

  // Define EIP-712 types
  const types = {
    Permit: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  };

  // Get nonce
  const nonce = await publicClient.readContract({
    address: degenTokenAddress,
    abi,
    functionName: 'nonces',
    args: [ownerAccount.address],
  });

  const message = {
    owner: ownerAccount.address,
    spender: contractAddress,
    value,
    nonce,
    deadline,
  };

 // Sign the permit
 const rawSignature = await walletClient.signTypedData({
    domain,
    types,
    message,
    primaryType: 'Permit',
  });

  // Split the signature into v, r, and s
  const { v, r, s } = ethers.utils.splitSignature(rawSignature);


  // Encode function data
  const data = encodeFunctionData({
    abi,
    functionName: 'executePermitAndTransfer',
    args: [ownerAccount.address, recipientAddress, value, deadline, v, r, s],
  });

  // Send transaction
  const hash = await walletClient.sendTransaction({
    to: contractAddress,
    data,
    value: parseGwei('0.1'), // Adjust gas fee as needed
  });

  console.log('Transaction sent! Hash:', hash);
}

main().catch((error) => {
  console.error('Error in transfer script:', error);
  process.exitCode = 1;
});
