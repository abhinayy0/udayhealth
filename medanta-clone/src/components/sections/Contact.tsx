import React from "react";
import { Container, SectionTitle, Card, Input, Button } from "../ui";

const Contact = () => {
  return (
    <section className="py-16 bg-white">
      <Container>
        <SectionTitle>Contact Us</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card variant="border">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#0056b3] mb-4">
                Get in Touch
              </h3>
              <form className="space-y-4">
                <Input
                  label="Name"
                  type="text"
                  placeholder="Your Name"
                  variant="outline"
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="Your Email"
                  variant="outline"
                />
                <Input
                  label="Message"
                  type="textarea"
                  placeholder="Your Message"
                  variant="outline"
                />
                <Button variant="primary" size="lg">
                  Send Message
                </Button>
              </form>
            </div>
          </Card>
          <div className="space-y-6">
            <Card variant="border">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#0056b3] mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <p className="flex items-center text-gray-600">
                    <span className="mr-2">📍</span>
                    Medanta - The Medicity, Sector 38, Gurugram, Haryana 122001
                  </p>
                  <p className="flex items-center text-gray-600">
                    <span className="mr-2">📞</span>
                    +91 124 4141414
                  </p>
                  <p className="flex items-center text-gray-600">
                    <span className="mr-2">✉️</span>
                    info@medanta.org
                  </p>
                </div>
              </div>
            </Card>
            <Card variant="border">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#0056b3] mb-4">
                  Working Hours
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                  <p>Saturday: 8:00 AM - 6:00 PM</p>
                  <p>Sunday: 9:00 AM - 5:00 PM</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
