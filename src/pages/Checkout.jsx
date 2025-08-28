import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

export default function Checkout() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    if (!user) return;
    const fetchCart = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "carts"),
          where("userId", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [user]);
  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * (item.quantity || 1),
    0
  );
  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please login to place an order.");
      return;
    }
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    setPlacingOrder(true);
    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        items: cartItems,
        total: total,
        status: "Pending",
        createdAt: serverTimestamp(),
      });
      setSuccessMessage("Your order has been placed successfully!");
      setCartItems([]);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Please login to continue with checkout.
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading your cart...
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg text-center">
          {successMessage}
        </div>
      )}
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="bg-[#c47b59] shadow-md rounded-lg p-4">
          <ul className="divide-y divide-gray-300/40">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-3"
              >
                <div>
                  <p className="font-medium text-white">{item.name}</p>
                  <p className="text-sm text-white">
                    Quantity: {item.quantity || 1}
                  </p>
                  <p className="text-sm text-white">
                    Unit Price: Ksh {item.price}
                  </p>
                </div>
                <p className="font-semibold text-white">
                  Ksh {parseFloat(item.price) * (item.quantity || 1)}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between text-lg font-semibold border-t border-white/40 pt-4">
            <span className="text-white">Total</span>
            <span className="text-white">Ksh {total}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={placingOrder}
            className="mt-6 w-full bg-[#f1e7dd] text-gray-800 py-3 rounded-xl font-semibold hover:bg-orange-400 disabled:opacity-50 transition"
          >
            {placingOrder ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      )}
    </div>
  );
}



