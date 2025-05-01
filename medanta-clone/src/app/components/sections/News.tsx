import React from "react";
import Image from "next/image";
import Link from "next/link";

const news = [
  {
    title: "Medanta Launches New Cardiac Care Unit",
    date: "March 15, 2024",
    image: "/images/news/cardiac-unit.jpg",
    excerpt:
      "Medanta has launched a state-of-the-art cardiac care unit with advanced facilities for comprehensive heart care.",
    category: "Facilities",
  },
  {
    title: "Dr. Naresh Trehan Receives Lifetime Achievement Award",
    date: "March 10, 2024",
    image: "/images/news/award.jpg",
    excerpt:
      "Dr. Naresh Trehan, Chairman of Medanta, has been honored with a lifetime achievement award for his contributions to healthcare.",
    category: "Awards",
  },
  {
    title: "New Research Breakthrough in Cancer Treatment",
    date: "March 5, 2024",
    image: "/images/news/research.jpg",
    excerpt:
      "Medanta researchers have made a significant breakthrough in cancer treatment, offering new hope for patients.",
    category: "Research",
  },
];

const News = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Latest News & Updates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-600">{item.category}</span>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <Link
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
