import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from "flowbite-react";
import toast from 'react-hot-toast';

export default function Brands() {
  const [brands, setBrands] = useState([]); // Store all brands
  const [selectedBrand, setSelectedBrand] = useState(null); // Track the selected brand
  const [openModal, setOpenModal] = useState(false); // Modal visibility

  // Fetch all brands from the API
  async function getBrands() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(data.data); // Store the fetched brands
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast.error("Failed to load brands. Please try again.");
    }
  }

  useEffect(() => {
    getBrands(); // Fetch brands when the component is mounted
  }, []);

  // Handle brand card click
  function handleBrandClick(brand) {
    setSelectedBrand(brand);
    setOpenModal(true); // Show modal
  }

  return (
    <>
      <h2 className="text-5xl mt-10 text-green-400 text-center">All Brands</h2>

      <div className="grid grid-cols-12 gap-4 mb-5 mx-auto">
        {brands.length > 0 ? (
          brands.map((brand) => (
            <div
              key={brand._id}
              onClick={() => handleBrandClick(brand)}
              className="col-span-12 sm:col-span-6 lg:col-span-3 cursor-pointer hover:shadow-2xl border border-gray-300 p-5 mt-5 rounded-md"
            >
              <img src={brand.image} alt={brand.name} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-lg text-green-500 font-bold text-center mt-2">{brand.name}</h3>
            </div>
          ))
        ) : (
          <div className="col-span-12 text-center text-red-500 font-bold">
            No brands available.
          </div>
        )}
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="bg-green-400">
          {selectedBrand?.name || "Brand Details"}
        </Modal.Header>
        <Modal.Body>
          {selectedBrand ? (
            <div className="flex flex-col items-center">
              <img
                src={selectedBrand.image}
                alt={selectedBrand.name}
                className="w-40 h-40 object-contain rounded-full mb-4"
              />
              <h2 className="text-2xl text-green-600 font-bold">{selectedBrand.name}</h2>
            </div>
          ) : (
            <p className="text-center text-gray-500">No brand details available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-green-400" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
