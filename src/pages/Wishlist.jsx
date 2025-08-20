import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth"

function Wishlist() {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState([]);
    useEffect(() => {
        if (!user) return;
        const unsubscribe = onSnapshot(
            collection(db, "users", user.uid, "wishlist"),
            (snapshot) => {
                setWishlist(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            }
        );
        return () => unsubscribe();
    }, [user]);
    if (!user) {
        return <p className="text-center mt-10">Please login to view your wishlist.</p>;
    }
    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {wishlist.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 shadow-md">
                    <img src={item.image} alt={item.name} className="h-40 w-full object-cover rounded-lg" />
                    <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
                    <p className="text-gray-600">Ksh {item.price}</p>
                </div>
            ))}
        </div>
    );
}
export default Wishlist;