import { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export default function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !price || !description || !image) {
            alert("Please fill all fields!");
            return;
        }
        try {
            // Upload image to Firebase Storage
            const imageRef = ref(storage, `products/${image.name}`);
            await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(imageRef);
            // Save product to Firestore
            await addDoc(collection(db, "products"), {
                name,
                price: Number(price),
                description,
                imageUrl,
            });
            alert(":white_check_mark: Product added successfully!");
            // Reset form
            setName("");
            setPrice("");
            setDescription("");
            setImage(null);
        } catch (error) {
            console.error("Error adding product: ", error);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">Add New Product</h2>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 w-full rounded"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border p-2 w-full rounded"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 w-full rounded"
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="border p-2 w-full rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
}
