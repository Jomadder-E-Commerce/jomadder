import React from 'react';

const page = () => {
    return (
        <div className="bg-gray-50   py-10 container">
        <div className=" mx-auto px-6 lg:px-10 py-8 bg-white shadow-md rounded-md">
          <h1 className="md:text-4xl sm:text-3xl text-2xl lg:text-5xl font-bold text-center text-primary mb-4">
            Privacy Policy
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
                Welcome to Jomadder International. Your privacy is important to us, and we are
                committed to protecting your personal information. This Privacy Policy explains how
                we collect, use, and share your information when you use our website and services.
              </p>
            </section>
  
            {/* Section 2 */}
            <section className="py-6">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-3">
                2. Information We Collect
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may collect the following types of information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4 pl-4">
                <li>
                  <strong>Personal Information:</strong> Name, email address, phone number, and
                  shipping address.
                </li>
                <li>
                  <strong>Usage Information:</strong> Information about how you interact with our
                  website, including IP address, browser type, and pages visited.
                </li>
                <li>
                  <strong>Payment Information:</strong> Credit card details and billing information
                  collected during transactions.
                </li>
              </ul>
            </section>
  
            {/* Section 3 */}
            <section className="py-6">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-3">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed">
                The information we collect is used to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4 pl-4">
                <li>Provide and improve our services.</li>
                <li>Process transactions and deliver products.</li>
                <li>Communicate with you regarding orders or inquiries.</li>
                <li>Ensure security and prevent fraudulent activities.</li>
              </ul>
            </section>
  
            {/* Section 4 */}
            <section className="py-6">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-3">
                4. Sharing Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We do not sell your personal information. However, we may share your information
                with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4 pl-4">
                <li>
                  <strong>Service Providers:</strong> Third-party vendors who help us operate our
                  business (e.g., payment processors, shipping companies).
                </li>
                <li>
                  <strong>Legal Requirements:</strong> Authorities when required to comply with the
                  law or protect our rights.
                </li>
              </ul>
            </section>
  
            {/* Section 5 */}
            <section className="py-6">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-3">
                5. Your Rights
              </h2>
              <p className="text-gray-700 leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4 pl-4">
                <li>Access, update, or delete your personal information.</li>
                <li>Opt out of marketing communications.</li>
                <li>Request details about how your data is used.</li>
              </ul>
            </section>
  
            {/* Section 6 */}
            <section className="py-6">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-3">
                6. Security
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We implement industry-standard security measures to protect your personal
                information. However, no system is completely secure, and we cannot guarantee
                absolute security.
              </p>
            </section>
  
            {/* Section 7 */}
            <section className="py-6">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-3">
                7. Changes to This Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on
                this page with an updated effective date. We encourage you to review this policy
                periodically.
              </p>
            </section>
  
            {/* Section 8 */}
            <section className="py-6">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-3">
                8. Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <address className="mt-4 text-gray-700 leading-relaxed">
                H-2553, Sayednagar, Vatara, Gulshan-2<br />
                Dhaka, Bangladesh<br />
                Phone: <a href="tel:+8801767559231" className="text-blue-600 underline">+8801767559231</a><br />
                Email: <a href="mailto:parceltrade@gmail.com" className="text-blue-600 underline">info@parceltrade.com</a>
              </address>
            </section>
          </div>
        </div>
      </div>
  
    );
};

export default page;