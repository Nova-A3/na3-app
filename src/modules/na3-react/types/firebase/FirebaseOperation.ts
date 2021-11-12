import type firebase from "firebase";

export type FirebaseNullOperationResult =
  | { error: firebase.FirebaseError }
  | { error: null };

export type FirebaseOperationResult<T> =
  | { data: firebase.firestore.DocumentReference<T>; error: null }
  | { data: null; error: firebase.FirebaseError };
