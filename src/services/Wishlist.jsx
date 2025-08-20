import { db } from "../firebase";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

export const addToWishlist = async (userId, product) => {
    try {
        await setDoc(
            doc(db, "users", userId, "wishlist", product.id),
            product
        );
    } catch (error) {
        console.error("Error adding to wishlist:", error);
    }
};
export const removeFromWishlist = async (userId, productId) => {
    try {
        await deleteDoc(doc(db, "users", userId, "wishlist", productId));
    } catch (error) {
        console.error("Error removing from wishlist:", error);
    }
};