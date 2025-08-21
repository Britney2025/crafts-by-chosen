import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot, doc, deleteDoc, addDoc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

function Wishlist() {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState([]);

    //Fetch wishlist for logged-in user
    useEffect(() => {
        if (!user) return;
        const q = query(collection(db, "wishlists"), where("userId", "==", user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setWishlist(items);
        });
        return () => unsubscribe();
    }, [user]);

    //Remove from wishlist
    const handleRemove = async (id) => {
        await deleteDoc(doc(db, "wishlist", id));
    };

    // Add to cart
    const handleAddToCart = async (item) => {
        try {
            await addDoc(collection(db, "cart"), {
                name: item.name,
                price: item.price,
                image: item.image,
                productId: item.productId,
                userId: user.uid,
            });
            // Optionally remove from wishlist after adding to cart
            await deleteDoc(doc(db, "wishlist", item.id));
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
            {wishlist.length === 0 ? (
                <p className="text-gray-500">Your wishlist is empty.</p>
            ) : (
                <div className="space-y-4">
                    {wishlist.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white shadow-md rounded-lg p-4 flex items-center gap-6"
                        >
                            {/* Image on the left */}
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-28 h-28 object-cover rounded-lg"
                            />
                            {/* Product details */}
                            <div className="flex flex-col flex-1">
                                <h2 className="text-lg font-semibold">{item.name}</h2>
                                <p className="text-gray-600 mb-3">Price: {item.price}</p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default Wishlist;
