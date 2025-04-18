export default {
  expo: {
    name: "nurturing-reads-app",
    slug: "nurturing-reads-app",
    version: "1.0.0",
    owner: "chitlchow",
    ios:{
      bundleIdentifier: 'nurturing-reads-app'
    },
    extra: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDERID: process.env.FIREBASE_MESSAGING_SENDERID,
      FIREBASE_APPID: process.env.FIREBASE_APPID,
      MEASUREMENT_ID: process.env.MEASUREMENT_ID,
      eas: {
        "projectId": "3dba9e43-d615-467a-a90b-9c013ab89d04"
      }
    }
  }
};