import React from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Patient",
    image: "/images/testimonials/patient1.jpg",
    content:
      "The care and treatment I received at Medanta was exceptional. The doctors and staff were very professional and caring.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Patient",
    image: "/images/testimonials/patient2.jpg",
    content:
      "I am grateful for the excellent medical care and support I received during my treatment. The facilities are world-class.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    role: "Patient",
    image: "/images/testimonials/patient3.jpg",
    content:
      "The doctors at Medanta are highly skilled and compassionate. They made me feel comfortable throughout my treatment.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Patient Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
