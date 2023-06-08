import { doc, getDoc, collection, query, onSnapshot, orderBy } from "firebase/firestore";
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

export const getUserBookingData = async (userId) => {
    try {
        const userBookingCollection = doc(db, "Users", userId, "Bookings");
        const q = query(userBookingCollection);
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
