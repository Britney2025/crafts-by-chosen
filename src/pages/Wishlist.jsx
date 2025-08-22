import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot, doc, deleteDoc, addDoc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

function Wishlist() {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        if (!user) return;
        const q = query(collection(db, "wishlists"), where("userId", "==", user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setWishlist(items);
        });
        return () => unsubscribe();
    }, [user]);

    // Remove item
    const removeFromWishlist = async (id) => {
        await deleteDoc(doc(db, "wishlist", id));
    };

    // Add to Cart
    const addToCart = async (item) => {
        if (!user) return;
        await addDoc(collection(db, "cart"), {
            ...item,
            userId: user.uid,
        });
        await removeFromWishlist(item.id); // optional: remove from wishlist when added to cart
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
            {wishlist.length === 0 ? (
                <p>Your wishlist is empty</p>
            ) : (
                <div className="space-y-6">
                    {wishlist.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center bg-[#d28c67] text-white p-4 rounded-lg shadow"
                        >
                            {/* Left: Image */}
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-40 h-40 object-cover rounded-lg mr-6"
                            />
                            {/* Right: Details */}
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">{item.name}</h2>
                                <p className="text-sm mb-2">{item.description}</p>
                                <p className="font-bold mb-3">Ksh {item.price}</p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="bg-white text-black px-4 py-1 rounded-full"
                                    >
                                        Remove
                                    </button>
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="bg-white text-black px-4 py-1 rounded-full"
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
