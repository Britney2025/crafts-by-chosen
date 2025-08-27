import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot, doc, deleteDoc, addDoc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

export default function Wishlist() {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState([]);
    useEffect(() => {
        if (!user) return;
        const q = query(collection(db, "wishlists"), where("userId", "==", user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setWishlist(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return unsubscribe;
    }, [user]);
    const removeFromWishlist = async (id) => {
        await deleteDoc(doc(db, "wishlists", id));
    };
    const moveToCart = async (item) => {
        await addDoc(collection(db, "cart"), {
            ...item,
            quantity: 1,
            userId: user.uid,
            price: Number(item.price)
        });
        await deleteDoc(doc(db, "wishlists", item.id));
    };
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
            {wishlist.length === 0 ? (
                <p className="text-gray-500">Your wishlist is empty.</p>
            ) : (
                <div className="space-y-6">
                    {wishlist.map(item => (
                        <div key={item.id} className="flex items-center border p-4 rounded-lg shadow-lg bg-[#c47b59]">
                            <img src={item.image} alt={item.name} className="w-28 h-28 object-cover rounded-lg" />
                            {/* Details */}
                            <div className="ml-4 flex-1">
                                <h2 className="text-lg text-white font-semibold">{item.name}</h2>
                                <p className="text-white">KES {item.price}</p>
                                {/* Buttons below */}
                                <div className="flex items-center gap-10 mt-3">
                                    <button
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="bg-[#f1e7dd] text-gray-800 font-semibold px-6 py-2 rounded-lg hover:bg-orange-400"
                                    >
                                        Remove
                                    </button>
                                    <button
                                        onClick={() => moveToCart(item)}
                                        className="bg-[#f1e7dd] text-gray-800 font-semibold px-6 py-2 rounded-lg hover:bg-orange-400"
                                    >
                                        Move to Cart
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



