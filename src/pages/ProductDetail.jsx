import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { db } from "../firebase";
import {
    doc,
    getDoc,
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot,
} from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import { FaArrowLeft, FaStar } from "react-icons/fa";

export default function ProductDetails() {
    const { id } = useParams(); // product id from route
    const navigate = useNavigate();
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    // Fetch product
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productRef = doc(db, "products", id);
                const snap = await getDoc(productRef);
                if (snap.exists()) {
                    setProduct({ id: snap.id, ...snap.data() });
                } else {
                    console.error("Product not found");
                }
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        };
        fetchProduct();
    }, [id]);
    // Fetch reviews in realtime
    useEffect(() => {
        const reviewsRef = collection(db, "products", id, "reviews");
        const q = query(reviewsRef, orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetched = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setReviews(fetched);
        });
        return unsubscribe;
    }, [id]);
    // Handle posting review
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Please login to post a review");
            return;
        }
        if (!rating || !comment.trim()) {
            alert("Please provide a rating and comment");
            return;
        }
        try {
            const reviewsRef = collection(db, "products", id, "reviews");
            await addDoc(reviewsRef, {
                userId: user.uid,
                username: user.email || "Anonymous",
                rating,
                comment,
                createdAt: serverTimestamp(),
            });
            setComment("");
            setRating(0);
        } catch (error) {
            console.error("Error posting review:", error);
        }
    };
    if (!product) return <p className="p-4">Loading product...</p>;
    return (
        <div className="p-6 max-w-3xl mx-auto bg-orange-50">
            {/* Back button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2  font-semibold text-orange-400 hover:underline hover:text-orange-800 mb-4"
            >
                <FaArrowLeft /> Back
            </button>
            {/* Product info */}
            <div className="flex flex-col md:flex-row gap-6 mb-10">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-80 h-80 md:w-1/2 rounded-xl shadow-md"
                />
                <div>
                    <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <p className="text-2xl font-semibold mb-6">Price: Ksh {product.price}</p>
                </div>
            </div>
            {/* Reviews */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow">
                <h3 className="text-xl font-semibold mb-4">Reviews</h3>
                {/* Review Form */}
                <form onSubmit={handleReviewSubmit} className="mb-6">
                    <div className="flex gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-400"
                                    }`}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your review..."
                        className="w-full border rounded-lg p-2 mb-2"
                    />
                    <button
                        type="submit"
                        className="bg-[#a4826d] text-white px-4 py-2 rounded-lg hover:bg-orange-800 font-bold"
                    >
                        Post Review
                    </button>
                </form>
                {/* Review List */}
                <div className="space-y-4">
                    {reviews.length === 0 ? (
                        <p className="text-gray-500">No reviews yet. Be the first!</p>
                    ) : (
                        reviews.map((rev) => (
                            <div
                                key={rev.id}
                                className="bg-white shadow p-4 rounded-lg border"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold">{rev.username}</span>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FaStar
                                                key={star}
                                                className={`${star <= rev.rating ? "text-yellow-500" : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-700">{rev.comment}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}



