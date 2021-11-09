import type firebase from "firebase";

export type FirebaseNullOperationResult =
  | { error: firebase.FirebaseError }
  | { error: null };

export type FirebaseOperationResult =
  | {
      data: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
      error: null;
    }
  | { data: null; error: firebase.FirebaseError };
