import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
// deploy address : 0x3235f63AD203987fCD9c5658b701A4cc4EB7442C
const FundAllocator = buildModule("FundAllocator", (m) => {
  const fundAllocator = m.contract("FundAllocator");

  return { fundAllocator };
});

export default FundAllocator;
