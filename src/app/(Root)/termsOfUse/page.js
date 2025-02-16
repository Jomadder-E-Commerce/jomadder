
import React from 'react';

const page = () => {
    
   
    return (
        <div className="bg-gray-50 min-h-screen py-10">
        <div className=" mx-auto px-6 lg:px-10 py-8 bg-white shadow-md rounded-md">
          <h1 className="md:text-4xl sm:text-3xl text-2xl lg:text-5xl font-bold text-center text-primary mb-4">
            Terms and Conditions
          </h1>
          <p className="text-sm lg:text-md text-gray-600 text-center mb-8">
            Last updated: January 22, 2025
          </p>
  
          <div className="divide-y divide-gray-200">
            {/* Section 1 */}
            <section className="py-6">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-3">
                1. Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Jomadder International. These Terms and Conditions govern your use
                of our website and services. By accessing or using our services, you agree to comply
                with and be bound by these terms.
              </p>
            </section>
  
            {/* Section 2 */}
            <section className="py-6">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-3">
                2. Use of Our Services
              </h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to use our services only for lawful purposes and in a way that does not
                infringe the rights of others or restrict their use and enjoyment of the services.
                Prohibited activities include, but are not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4 pl-4">
                <li>Engaging in fraudulent activities.</li>
                <li>Transmitting harmful or malicious content.</li>
                <li>Violating any applicable laws or regulations.</li>
              </ul>
            </section>
  
            {/* Section 3 */}
            <section className="py-6">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-3">
                3. Account Registration
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To access certain features, you may need to create an account. You agree to provide
                accurate and complete information during registration and to keep your account
                information updated. You are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your account.
              </p>
            </section>
  
            {/* Contact Us Section */}
            <section className="py-6">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-3">
                11. Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <address className="mt-4 text-gray-700 leading-relaxed">
                H-2553, Sayednagar, Vatara, Gulshan-2<br />
                Dhaka, Bangladesh<br />
                Phone: <a href="tel:+8801879314050" className="text-blue-600 underline">+8801767559231</a><br />
                Email: <a href="mailto:parceltrade@gmail.com" className="text-blue-600 underline">info@parceltrade.com</a>
              </address>
            </section>
          </div>
        </div>
      </div>
    );
};

export default page;