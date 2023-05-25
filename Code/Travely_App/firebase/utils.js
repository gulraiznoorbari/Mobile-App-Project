import { doc, getDoc } from "firebase/firestore";
import { db } from "./config";

export const getUserData = async (userId) => {
    try {
        const docRef = doc(db, "Users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
