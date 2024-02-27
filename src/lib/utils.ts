import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shortAddress = (address: string) => {
  let displayAddress = address?.slice(0, 5) + "..." + address?.slice(-4);
  return displayAddress;
};
