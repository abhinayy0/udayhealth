import React from "react";
import {
  UserGroupIcon,
  HeartIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

const statistics = [
  {
    icon: UserGroupIcon,
    value: "2000+",
    label: "Expert Doctors",
  },
  {
    icon: HeartIcon,
    value: "50000+",
    label: "Happy Patients",
  },
  {
    icon: BuildingOfficeIcon,
    value: "45+",
    label: "Specialties",
  },
  {
    icon: AcademicCapIcon,
    value: "100+",
    label: "Research Papers",
  },
];

const Statistics = () => {
  return (
    <section className="py-16 px-4 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <stat.icon className="h-12 w-12" />
              </div>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
