import React, { useState } from 'react';

function ServiceForm() {
  const [service, setService] = useState({
    title: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setService({ ...service, image: files[0] });
    } else {
      setService({ ...service, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Service submitted:', service);
    // You can send it to backend or state
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Service</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Service Title</label>
          <input
            type="text"
            name="title"
            value={service.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter service title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={service.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter service description"
            required
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
          {service.image && (
            <p className="mt-2 text-gray-600">Selected: {service.image.name}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
        >
          Add Service
        </button>
      </form>
    </div>
  );
}

export default ServiceForm;
