import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
function ProductList() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const items = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProducts(items);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };
        fetchProducts();
    }, []);
    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.length === 0 ? (
                <p>No products found</p>
            ) : (
                products.map(product => (
                    <div key={product.id} className="border p-4 rounded shadow">
                        <h2 className="text-lg font-bold">{product.name}</h2>
                        <p>{product.description}</p>
                        <p className="font-semibold">Ksh {product.price}</p>
                        {product.image && (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover mt-2"
                            />
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
export default ProductList;