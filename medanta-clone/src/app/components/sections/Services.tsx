import React from "react";
import Image from "next/image";

const services = [
  {
    title: "Cardiology",
    description:
      "Comprehensive heart care services including diagnostics, treatment, and rehabilitation.",
    icon: "/images/cardiology.svg",
  },
  {
    title: "Neurology",
    description:
      "Advanced neurological care for brain and nervous system disorders.",
    icon: "/images/neurology.svg",
  },
  {
    title: "Oncology",
    description: "State-of-the-art cancer treatment and care services.",
    icon: "/images/oncology.svg",
  },
  {
    title: "Orthopedics",
    description: "Specialized care for bone and joint related conditions.",
    icon: "/images/orthopedics.svg",
  },
  {
    title: "Pediatrics",
    description: "Comprehensive healthcare services for children.",
    icon: "/images/pediatrics.svg",
  },
  {
    title: "Emergency Care",
    description: "24/7 emergency medical services with advanced facilities.",
    icon: "/images/emergency.svg",
  },
];

const Services = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 relative mr-4">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
              </div>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
