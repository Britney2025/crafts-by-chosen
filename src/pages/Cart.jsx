import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
    collection,
    query,
    where,
    onSnapshot,
    doc,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

function Cart() {
    const { user } = useAuth();
    const [cart, setCart] = useState([]);
    useEffect(() => {
        if (!user) return;
        const q = query(collection(db, "cart"), where("userId", "==", user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map((doc) => ({
                id: doc.id,
                quantity: doc.data().quantity || 1,
                ...doc.data(),
            }));
            setCart(items);
        });
        return () => unsubscribe();
    }, [user]);
    
    const handleRemove = async (id) => {
        await deleteDoc(doc(db, "cart", id));
    };
    const handleIncrease = async (item) => {
        const itemRef = doc(db, "cart", item.id);
        await updateDoc(itemRef, {
            quantity: (item.quantity || 1) + 1,
        });
    };
    const handleDecrease = async (item) => {
        if ((item.quantity || 1) > 1) {
            const itemRef = doc(db, "cart", item.id);
            await updateDoc(itemRef, {
                quantity: (item.quantity || 1) - 1,
            });
        }
    };
    const total = cart.reduce((sum, item) => {
        const priceNum = parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
        return sum + priceNum * (item.quantity || 1);
    }, 0);
    const handleCheckout = () => {
        alert(`Proceeding to checkout. Total: Ksh ${total.toFixed(2)}`);
    };
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Cart</h1>
            {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
            ) : (
                <>
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="bg-[#C47B59] text-white rounded-xl shadow-lg p-4 flex items-center gap-6"
                            >
                                {/* Image */}
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-28 h-28 object-cover rounded-lg"
                                />
                                {/* Details */}
                                <div className="flex flex-col flex-1">
                                    <h2 className="text-lg font-semibold">{item.name}</h2>
                                    <p className="text-sm opacity-90">{item.description}</p>
                                    <p className="mt-1 font-bold">Ksh {item.price}</p>
                                    <p className="text-xs">*In stock</p>
                                    {/* Actions */}
                                    <div className="flex items-center gap-4 mt-3">
                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="px-4 py-1 bg-white text-[#C47B59] font-medium rounded-full hover:bg-gray-200"
                                        >
                                            Remove
                                        </button>
                                        <div className="flex items-center gap-2 bg-white text-[#C47B59] px-2 py-1 rounded-full">
                                            <button
                                                onClick={() => handleDecrease(item)}
                                                className="px-2 font-bold"
                                            >
                                                -
                                            </button>
                                            <span className="px-2">{item.quantity || 1}</span>
                                            <button
                                                onClick={() => handleIncrease(item)}
                                                className="px-2 font-bold"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Checkout Bar */}
                    <div className="mt-8">
                        <button
                            onClick={handleCheckout}
                            className="w-full py-4 bg-[#C47B59] text-white text-lg font-bold rounded-full hover:bg-[#a35f42] transition"
                        >
                            Checkout (Ksh {total.toFixed(2)})
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
export default Cart;






