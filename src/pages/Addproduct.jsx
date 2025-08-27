import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"

function Addproduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), product);
      alert("Product added!");
      setProduct({ name: "", price: "", description: "", imageUrl: "" });
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1e7dd]">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-96 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Add Product</h2>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price (Ksh)"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#a4826d] text-white p-2 rounded hover:bg-orange-800"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
export default Addproduct;
