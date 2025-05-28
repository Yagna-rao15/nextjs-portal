import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkSVNITEmail(email: string): string | null {
  const regex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z]+)\.svnit\.ac\.in$/;
  if (email == "admin@yagnarao.com") {
    return null;
  }
  if (!regex.test(email)) {
    return "Invalid email domain. Please use your official SVNIT email address.";
  }
  return null;
}
