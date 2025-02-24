import { Mail, Phone, Clock, Facebook } from "lucide-react";
import Link from "next/link";

export default function ContactInfo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4 mb-8 mt-8">
      <InfoCard
        icon={<Clock />}
        title="Working Hours"
        description="SAT - FRI : 10 AM - 7 PM"
      />
      <InfoCard icon={<Phone />} title="Call" description="+8801879314050" link="tel:+8801879314050"  />
      <InfoCard
        icon={<Mail />}
        title="Mail"
        description="parceltradeint@gmail.com"
        link="mailto:parceltradeint@gmail.com"
      />      <InfoCard
      icon={<Facebook />}
      title="Facebook"
      description="facebook.com/parceltradeinternational"
      link="https://www.facebook.com/parceltradeinternational"
    />

    </div>
  );
}

function InfoCard({ icon, title, description, link = "/contact-us" }) {
  return (
    <Link href={link} className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border hover:border-primary cursor-pointer border-gray-300">
        <div className="my-2 text-6xl text-primary">{icon}</div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
    </Link>
  );
}
