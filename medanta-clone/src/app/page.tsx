import React from "react";
import Image from "next/image";
import { Container, Button } from "../components/ui";
import Services from "./components/sections/Services";
import Doctors from "./components/sections/Doctors";
import Contact from "./components/sections/Contact";
import Testimonials from "./components/sections/Testimonials";
import News from "./components/sections/News";
import Statistics from "./components/sections/Statistics";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="/images/hero-bg.jpg"
          alt="Medanta Hospital"
          fill
          className="object-cover"
          priority
        />
        <Container>
          <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to Medanta</h1>
            <p className="text-xl max-w-2xl mb-8">
              India&apos;s leading multi-specialty medical institute providing
              world-class healthcare
            </p>
            <div className="flex gap-4">
              <Button variant="primary" size="lg">
                Book Appointment
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Statistics Section */}
      <Statistics />

      {/* Services Section */}
      <section className="py-16 bg-white">
        <Container>
          <Services />
        </Container>
      </section>

      {/* Doctors Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <Doctors />
        </Container>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0056b3] mb-6">
                About Medanta
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Medanta is one of India&apos;s largest multi-specialty medical
                institutes, established by Dr. Naresh Trehan with the aim of
                providing world-class healthcare services.
              </p>
              <p className="text-lg text-gray-600">
                Our state-of-the-art facilities and expert medical professionals
                ensure the best possible care for our patients.
              </p>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/images/about.jpg"
                alt="About Medanta"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* News Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <News />
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <Container>
          <Testimonials />
        </Container>
      </section>

      {/* Contact Section */}
      <Contact />
    </div>
  );
}
