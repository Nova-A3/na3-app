import firebase from "firebase";
import { useCallback } from "react";

import type { Na3Department } from "../../na3-types";
import { translateFirebaseError } from "../utils";
import { useStateSlice } from "./useStateSlice";

export type UseNa3AuthResult = {
  department: Na3Department | null;
  error: firebase.auth.Error | null;
  helpers: {
    signIn: (
      dptId: string,
      password: string
    ) => Promise<
      | { error: firebase.FirebaseError; user: null }
      | { error: null; user: firebase.auth.UserCredential }
    >;
    signOut: () => Promise<{ error: firebase.FirebaseError } | { error: null }>;
  };
  loading: boolean;
};

export function useNa3Auth(): UseNa3AuthResult {
  const auth = useStateSlice("auth");

  const signIn = useCallback(async (dptId: string, password: string) => {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(`${dptId}@novaa3-app.com.br`, password);
      return { error: null, user };
    } catch (error) {
      const fbError = error as firebase.FirebaseError;
      return {
        error: { ...fbError, message: translateFirebaseError(fbError.code) },
        user: null,
      };
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await firebase.auth().signOut();
      return { error: null };
    } catch (error) {
      const fbError = error as firebase.FirebaseError;
      return {
        error: { ...fbError, message: translateFirebaseError(fbError.code) },
        user: null,
      };
    }
  }, []);

  return {
    department: auth.department,
    error: auth.error,
    helpers: { signIn, signOut },
    loading: auth.loading,
  };
}
