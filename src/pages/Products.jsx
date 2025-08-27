import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router";

function Products() {
    const [products, setProducts] = useState([]);
    const { user } = useAuth();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const productsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    // Add product to Wishlist
    const addToWishlist = async (product) => {
        if (!user) {
            alert("You must be logged in to add to wishlist!");
            return;
        }
        try {
            await setDoc(doc(db, "wishlists", `${user.uid}_${product.id}`), {
                userId: user.uid,
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.imageUrl,
            });
            alert("Added to wishlist!");
        } catch (error) {
            console.error("Error adding to wishlist:", error);
        }
    };

    // Add product to Cart
    const addToCart = async (product) => {
        if (!user) {
            alert("You must be logged in to add to cart!");
            return;
        }
        try {
            await setDoc(doc(db, "carts", `${user.uid}_${product.id}`), {
                userId: user.uid,
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.imageUrl,
                quantity: 1,
            });
            alert("Added to cart!");
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
                Our Crochet Collection
            </h1>
            {products.length === 0 ? (
                <p className="text-center text-gray-500">No products yet...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-[#C47B59] shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 relative"
                        >
                            {/* Wishlist Icon */}
                            <button
                                onClick={() => addToWishlist(product)}
                                className={`absolute top-3 right-3 p-2 rounded-full ${user
                                    ? "bg-white text-pink-600 hover:bg-pink-100"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                                disabled={!user}
                            >
                                <FaHeart />
                            </button>

                            {/* Product Image */}
                            <Link to={`/product/${product.id}`}>
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="h-100 w-full object-cover"
                                />
                            </Link>

                            {/* Product Details */}
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-white">
                                    {product.name}
                                </h2>
                                <p className="text-white font-semibold text-sm mt-4">{product.description}</p>

                                {/* Price + Add to Cart */}
                                <div className="flex justify-between items-center mt-3">
                                    <p className=" text-xl text-white font-bold">Ksh {product.price}</p>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className={`flex items-center gap-2 py-2 px-4 rounded-lg font-semibold transition ${user
                                            ? "bg-[#F1E7DD] text-gray-800 hover:bg-orange-400"
                                            : "bg-gray-400 text-gray-200 cursor-not-allowed"
                                            }`}
                                        disabled={!user}
                                    >
                                        <FaShoppingCart /> Add to Cart
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
export default Products;



