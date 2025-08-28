import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

export default function OrdersPage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if (!user) return;
        const q = query(
            collection(db, "orders"),
            where("userId", "==", user.uid)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
        return unsubscribe;
    }, [user]);

    if (!user) {
        return <p className="text-center mt-6">Please log in to view your orders.</p>;
    }
    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4  text-orange-900">My Orders</h2>
            {orders.length === 0 ? (
                <p className="text-gray-500">No orders yet.</p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4 shadow-lg bg-orange-200">
                            <h3 className="font-semibold">Order ID: {order.id}</h3>
                            <p className="font-bold">Total: <span className="font-semibold">Ksh {order.total}</span></p>
                            <ul className="list-disc ml-5 text-sm mt-2">
                                {order.items.map((item, idx) => (
                                    <li key={idx}>
                                        {item.name} × {item.quantity} (Ksh {item.price})
                                    </li>
                                ))}
                            </ul>
                            <p className="text-orange-900 font-bold text-xs mt-2">Date: {new Date(order.timestamp ?.second * 1000).toLocaleString() }</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}



