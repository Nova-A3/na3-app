/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import firebase from "firebase";

// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
importScripts("/__/firebase/9.2.0/firebase-app-compat.js");
importScripts("/__/firebase/9.2.0/firebase-messaging-compat.js");
importScripts("/__/firebase/init.js");

declare const self: ServiceWorkerGlobalScope;

const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically
// and you should use data messages for custom notifications.
// For more info see:
// https://firebase.google.com/docs/cloud-messaging/concept-options
messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  void self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

export {};
