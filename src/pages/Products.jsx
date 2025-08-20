import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
function Products() {
    const [products, setProducts] = useState([]);
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
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
                Our Crochet Collection
            </h1>
            {products.length === 0 ? (
                <p className="text-center text-gray-500">No products yet...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-[#c47b59] shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition duration-300"
                        >
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="h-56 w-full object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-white">
                                    {product.name}
                                </h2>
                                <p className="text-white font-semibold mt-2">Ksh{product.price}</p>
                                <button className="mt-4 w-full bg-[#f1e7dd] text-gray-800 font-semibold py-2 px-4 rounded-xl hover:bg-orange-800 transition duration-300">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default Products;