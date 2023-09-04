// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  writeBatch,
  doc,
} = require("firebase/firestore");

// const { getAnalytics } = require("firebase/analytics");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtjEFRA8hi_QsFNmyVbw_82l5DaOV19yA",
  authDomain: "familyalbum-797db.firebaseapp.com",
  projectId: "familyalbum-797db",
  storageBucket: "familyalbum-797db.appspot.com",
  messagingSenderId: "237256033614",
  appId: "1:237256033614:web:317624a3971d0c340b0a1f",
  measurementId: "G-L8N3C3XT6J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore();

// Get a list of cities from your database
async function getUsers() {
  const colRef = collection(db, "users");
  const usersSnapshot = await getDocs(colRef);
  const users = usersSnapshot.docs.map((doc) => doc.data());
  return users;
}

async function uploadData(table, obj) {
  await uploadMultipleData(table, [obj]);
}
async function uploadMultipleData(table, objs = []) {
  const batch = writeBatch(db);
  objs.forEach((obj) => {
    const ref = doc(db, table, obj.id);
    batch.set(ref, obj);
  });

  await batch.commit();
}
exports.getUsers = getUsers;
exports.uploadMultipleData = uploadMultipleData;
exports.uploadData = uploadData;
