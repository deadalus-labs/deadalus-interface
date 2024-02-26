import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAbi = async (provider: any, contractAddress: string) => {
  const { abi: contractAbi } = await provider.getClassAt(contractAddress);
  return contractAbi;
};

export const vaultContractAddress =
  "0x679405b228d60ee81028c001fdeb9eb2e18bc3c943918f340f9a251029142b2";
