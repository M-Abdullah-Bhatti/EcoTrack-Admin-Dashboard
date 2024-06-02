import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase"; // adjust the path as necessary to where you export `storage` from firebase.js

export const uploadImageToFirebase = async (file: File): Promise<string> => {
  if (!file) throw new Error("No file available to upload.");

  // Create a reference to 'images/filename'
  const storageRef = ref(storage, `images/${file.name}`);

  // Upload the file to Firebase Storage
  const snapshot = await uploadBytes(storageRef, file);
  console.log("Uploaded a blob or file!", snapshot);

  // Get the URL of the uploaded file
  const downloadURL = await getDownloadURL(snapshot.ref);
  console.log("File available at", downloadURL);

  return downloadURL; // returns the URL pointing to the uploaded file
};
