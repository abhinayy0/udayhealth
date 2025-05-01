import React from "react";
import { Container, SectionTitle, Card } from "../ui";

const Statistics = () => {
  const stats = [
    {
      title: "Patients Treated",
      value: "2.5M+",
      description: "Patients from across the globe",
    },
    {
      title: "Specialties",
      value: "50+",
      description: "World-class medical specialties",
    },
    {
      title: "Doctors",
      value: "1.2K+",
      description: "Expert medical professionals",
    },
    {
      title: "Hospitals",
      value: "5",
      description: "State-of-the-art facilities",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <SectionTitle>Our Achievements</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} variant="hover">
              <div className="p-6 text-center">
                <h3 className="text-4xl font-bold text-[#0056b3] mb-2">
                  {stat.value}
                </h3>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {stat.title}
                </h4>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Statistics;
