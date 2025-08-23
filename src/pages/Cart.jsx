import { useEffect, useState } from "react";
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

export default function Cart() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "carts"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) =>
      setCartItems(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          price: Number(doc.data().price),
          quantity: doc.data().quantity || 1, // :white_check_mark: always default
        }))
      )
    );
    return unsubscribe;
  }, [user]);
  const removeFromCart = async (id) => {
    await deleteDoc(doc(db, "carts", id));
  };
  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;
    await updateDoc(doc(db, "carts", id), { quantity });
  };
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

return (

  <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-2xl font-bold mb-6">My Cart</h1>
    {cartItems.length === 0 ? (
      <p className="text-gray-500">Your cart is empty.</p>
    ) : (
      <>
        <div className="space-y-6 mb-24">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center border p-4 rounded-lg shadow-sm"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-lg"
              />
              {/* Details */}
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">KES {item.price}</p>
                {/* Quantity & Remove */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="px-3 py-1 bg-gray-200 rounded-l-lg"
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="px-3 py-1 bg-gray-200 rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* checkout */}
        <div className="flex justify-center mt-2">
          <button
            className="w-full bg-green-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-green-700"
          >
            Checkout (Total: Ksh {cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)})
          </button>
        </div>
      </>
    )}
  </div>
);
}





