import React from "react";
import Image from "next/image";

const doctors = [
  {
    name: "Dr. Naresh Trehan",
    specialization: "Cardiac Surgery",
    image: "/images/doctors/dr-trehan.jpg",
    experience: "40+ years",
  },
  {
    name: "Dr. A.S. Soin",
    specialization: "Liver Transplant",
    image: "/images/doctors/dr-soin.jpg",
    experience: "30+ years",
  },
  {
    name: "Dr. Ashok Seth",
    specialization: "Interventional Cardiology",
    image: "/images/doctors/dr-seth.jpg",
    experience: "35+ years",
  },
  {
    name: "Dr. Randeep Guleria",
    specialization: "Pulmonology",
    image: "/images/doctors/dr-guleria.jpg",
    experience: "30+ years",
  },
];

const Doctors = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Expert Doctors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                <p className="text-gray-600 mb-2">{doctor.specialization}</p>
                <p className="text-sm text-gray-500">
                  Experience: {doctor.experience}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
