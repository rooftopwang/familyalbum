// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
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
const storage = getStorage(app);

// Get a list of cities from your database
async function get(table) {
  const colRef = collection(db, table);
  const usersSnapshot = await getDocs(colRef);
  const data = usersSnapshot.docs.map((doc) => doc.data());
  return data;
}

async function uploadData(table, obj) {
  await uploadMultipleData(table, [obj]);
}
async function post(table, objs = []) {
  const batch = writeBatch(db);
  objs.forEach((obj) => {
    const ref = doc(db, table, obj.id);
    batch.set(ref, obj);
  });

  await batch.commit();
}

async function delete_all(table) {
  const batch = writeBatch(db);
  const objs = await get(table);

  objs.forEach((obj) => {
    const ref = doc(db, table, obj.id);
    batch.delete(ref);
  });

  await batch.commit();
}

async function saveImage(filename, blob) {
  try {
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const storageRef = ref(storage, "/memories/" + filename);

    uploadBytesResumable(storageRef, buffer)
      .then((snapshot) => {})
      .catch((err) => {});
  } catch (e) {}
  // Create a reference to 'images/mountains.jpg'
}

async function createImageUrl(type, filename) {
  return getDownloadURL(ref(storage, `${type}/${filename}`));
}

exports.get = get;
exports.post = post;
exports.delete_all = delete_all;
exports.saveImage = saveImage;
exports.createImageUrl = createImageUrl;
