import firebase from "firebase";

type InitFirebaseConfig = {
  apiKey: string;
  appId: string;
  authDomain: string;
  measurementId: string;
  messagingSenderId: string;
  projectId: string;
  storageBucket: string;
  vapidKey: string;
};

export async function initFirebase({
  vapidKey,
  ...config
}: InitFirebaseConfig): Promise<void> {
  // Initialize default app
  firebase.initializeApp(config);

  // Get the Performance service for the default app
  firebase.performance();

  // Get the Analytics service for the default app
  firebase.analytics();

  // Get the Messaging service for the default app
  const messaging = firebase.messaging();

  try {
    const messagingToken = await messaging.getToken({ vapidKey });

    if (messagingToken) {
      console.log(messagingToken);
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  } catch (err) {
    console.error(err);
  }
}
