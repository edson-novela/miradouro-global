"use server";

import { auth } from "@/lib/auth";

export const signIn = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email: email,
        password: password,
      },
    });
    // Handle successful sign-in
    return {
      success: true,
      message: "Sign-in successful",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Sign-in failed",
    };
  }
};

export const signUp = async (
  username: string,
  email: string,
  password: string
) => {
  console.log("Signing up user:", { username, email, password });

  try {
    await auth.api.signUpEmail({
      body: {
        name: username,
        email: email,
        password: password,
      },
    });
    // Handle successful sign-up
    return {
      success: true,
      message: "Sign-up successful",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Sign-up failed",
    };
  }
};
