import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

export default function ReviewForm({ productId }) {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return alert("Login to leave a review");
        try {
            await addDoc(collection(db, "products", productId, "reviews"), {
                userId: user.uid,
                userName: user.displayName || user.email,
                rating,
                comment,
                createdAt: serverTimestamp(),
            });
            setRating(0);
            setComment("");
        } catch (err) {
            console.error("Error adding review:", err);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded mt-4">
            <h2 className="text-lg font-bold mb-2">Leave a Review</h2>
            <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border p-2 mb-2 w-full"
            >
                <option value="0">Select Rating</option>
                {[1, 2, 3, 4, 5].map((star) => (
                    <option key={star} value={star}>
                        {star} Star{star > 1 && "s"}
                    </option>
                ))}
            </select>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment..."
                className="border p-2 w-full mb-2"
            />
            <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded w-full"
            >
                Submit Review
            </button>
        </form>
    );
}



