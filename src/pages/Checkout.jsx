import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

function Checkout() {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!user) {
            setCartItems([]);
            setLoading(false);
            return;
        }
        const fetchCart = async () => {
            try {
                const cartRef = collection(db, "carts");
                const q = query(cartRef, where("userId", "==", user.uid));
                const snapshot = await getDocs(q);
                const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setCartItems(items);
            } catch (err) {
                console.error("Error fetching cart:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, [user]);
    if (loading) return <p>Loading...</p>
    if (cartItems.length === 0) return <p className="text-xl text-center">Your cart is empty.</p>;
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Checkout</h2>
            {cartItems.map((item) => (
                <div key={item.id} className="border p-2 mb-2">
                    <p>{item.name}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Ksh{item.price}</p>
                </div>
            ))}
            <button className="w-full bg-green-500 text-white p-2 mt-4 rounded-lg">
                Place Order
            </button>
        </div>
    );
}
export default Checkout;



