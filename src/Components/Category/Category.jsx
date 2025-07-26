import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [loadingSubCategory, setLoadingSubCategory] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoadingCategory(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
      toast.success("Categories loaded successfully!");
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories.");
    } finally {
      setLoadingCategory(false);
    }
  };

  const fetchSubCategories = async (categoryId) => {
    if (subCategories[categoryId]) return;
    setLoadingSubCategory(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
      );
      setSubCategories((prev) => ({ ...prev, [categoryId]: data.data }));
      setActiveCategory(categoryId);
      toast.success("Subcategories loaded!");
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      toast.error("Failed to load subcategories.");
    } finally {
      setLoadingSubCategory(false);
    }
  };

  return (
    <div className="container mx-auto pt-10">
      <h2 className="text-4xl text-center text-green-600 mb-10">Categories</h2>

      {loadingCategory && (
        <p className="text-center text-lg text-green-500">Loading...</p>
      )}

      <div className="grid grid-cols-12 gap-5 mb-5">
        {categories.map((category) => (
          <div
            key={category._id}
            className="col-span-4 cursor-pointer hover:shadow-lg border rounded-lg overflow-hidden"
            onClick={() => fetchSubCategories(category._id)}
          >
            <img
              className="w-full h-72 object-cover"
              src={category.image}
              alt={category.name}
            />
            <h3 className="text-2xl text-green-500 text-center p-5">
              {category.name}
            </h3>
          </div>
        ))}
      </div>

      {loadingSubCategory && (
        <p className="text-center text-lg text-green-500">Loading Subcategories...</p>
      )}

      {activeCategory && subCategories[activeCategory]?.length > 0 && (
        <div className="mt-10 p-10">
          <h2 className="text-3xl text-green-600 mb-5">Subcategories</h2>
          <div className="grid grid-cols-12 gap-5">
            {subCategories[activeCategory].map((sub) => (
              <div
                key={sub._id}
                className="col-span-4 border border-spacing-2 p-5 rounded-lg shadow-sm"
              >
                <h4 className="text-lg text-green-700 text-center">
                  {sub.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
