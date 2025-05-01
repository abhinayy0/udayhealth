import React from "react";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

const Contact = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <MapPinIcon className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold">Address</h3>
            </div>
            <p className="text-gray-600">
              Medanta - The Medicity
              <br />
              Sector 38, Gurugram
              <br />
              Haryana 122001, India
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <PhoneIcon className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold">Phone</h3>
            </div>
            <p className="text-gray-600">
              Emergency: +91 124 4141414
              <br />
              Appointments: +91 124 4830000
              <br />
              International: +91 124 4830001
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <EnvelopeIcon className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold">Email</h3>
            </div>
            <p className="text-gray-600">
              General Inquiries: info@medanta.org
              <br />
              Appointments: appointments@medanta.org
              <br />
              International: international@medanta.org
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Send us a Message</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
