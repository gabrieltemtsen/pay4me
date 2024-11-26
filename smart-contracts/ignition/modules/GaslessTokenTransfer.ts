import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";


const GaslessTokenTransferModule = buildModule("GaslessTokenTransferModule", (m) => {
  const degenTokenAddress = m.getParameter<string>(
    "degenTokenAddress",
    "0x4ed4e862860bed51a9570b96d89af5e1b0efefed" // Replace with your actual token address
  );
  const payeeAddress = m.getParameter<string>(
    "payeeAddress",
    "0x7231D8CCF0bcF5678dB30730EfE18F21d520C379" // Replace with your actual payee address
  );

  const gaslessTokenTransfer = m.contract("GaslessTokenTransfer", [degenTokenAddress, payeeAddress]);

  return { gaslessTokenTransfer };
});

export default GaslessTokenTransferModule;
