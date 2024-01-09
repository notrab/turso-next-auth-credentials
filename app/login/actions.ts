"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function loginOrRegister(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials. Please try again.";
        default:
          return "Something went wrong. Please try again.";
      }
    }

    throw error;
  }
}
