export default {
  expo: {
    name: "nurturing-reads-app",
    slug: "nurturing-reads-app",
    version: "1.0.0",
    extra: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDERID: process.env.FIREBASE_MESSAGING_SENDERID,
      FIREBASE_APPID: process.env.FIREBASE_APPID,
      MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    }
  }
};