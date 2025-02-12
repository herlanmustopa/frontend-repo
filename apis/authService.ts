import { signInWithEmailAndPassword } from "firebase/auth";
import { authClient } from "@/config/firebaseConfig";

export const loginWithEmail = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(authClient, email, password);
    const idToken = await userCredential.user.getIdToken();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      throw new Error("Login failed!");
    }

    const data = await response.json();
    return {
      user: {
        id: userCredential.user.uid,
        name: userCredential.user.displayName || "Anonymous",
        email: userCredential.user.email || "",
      },
      token: data.token,
      refreshToken: data.refreshToken,
    };
  };
export const refreshAuthToken = async (refreshToken: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token!");
  }

  return response.json();
};

export const registerUser = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    return response.json();
  };
