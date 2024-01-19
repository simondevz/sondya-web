const TermsAndServicesBody = () => {
  return (
    <section>
      <div className="flex flex-col gap-3 p-7 md:p-16">
        <div className="indent-8">
          <h2 className="font-semibold text-[1.25rem] px-0 -ml-8 mt-6">
            Acceptance of Terms
          </h2>
          By accessing, registering, or using the Sondya platform, including
          both the mobile application and website, you agree to be bound by
          these Terms of Service. If you do not agree with any of these terms,
          please refrain from using our platform.
        </div>

        <div className="indent-8">
          <h2 className="font-semibold text-[1.25rem] px-0 -ml-8 mt-6">
            License
          </h2>
          Sondya grants you a limited, non-exclusive, non-transferable, and
          revocable license to access and use our platform for both personal and
          commercial purposes, in accordance with these Terms. This license
          includes both the mobile application and website.
        </div>

        <div className="indent-8">
          <h2 className="font-semibold text-[1.25rem] px-0 -ml-8 mt-6">
            Privacy Policy
          </h2>
          Your privacy is important to us. Please refer to our{" "}
          <a href="/#">Privacy Policy</a> for information on how we collect,
          use, and protect your personal data.
        </div>

        <div className="indent-8">
          <h2 className="font-semibold text-[1.25rem] px-0 -ml-8 mt-6">
            Intellectual Property
          </h2>
          The Sondya platform, along with its original content, features, and
          functionality, is owned by Sondya and is protected by international
          copyright, trademark, patent, trade secret, and other intellectual
          property laws. You agree not to reproduce, distribute, modify, or
          create derivative works based on our platform.
        </div>

        <div className="indent-8">
          <h2 className="font-semibold text-[1.25rem] px-0 -ml-8 mt-6">
            Transactions and Payments
          </h2>
          When engaging in transactions on Sondya, users agree to abide by our
          payment policies. Any payment information provided must be accurate
          and complete.
        </div>

        <div className="indent-8">
          <h2 className="font-semibold text-[1.25rem] px-0 -ml-8 mt-6">
            Limitation of Liability
          </h2>
          While we strive to provide a secure and reliable service, Sondya shall
          not be liable for any direct, indirect, incidental, special, or
          consequential damages arising out of or in any way connected with the
          use of our platform. We cannot guarantee the absolute absence of
          errors or interruptions. We encourage you to use Sondya responsibly
          and report any issues or concerns you may encounter during your usage.
        </div>

        <div className="indent-8">
          <h2 className="font-semibold text-[1.25rem] px-0 -ml-8 mt-6">
            Termination and Suspension
          </h2>
          We reserve the right to terminate or suspend your access to the
          platform at any time, without prior notice or liability, for reasons
          including, but not limited to, a breach of these Terms.
        </div>

        <div className="indent-8">
          <h2 className="font-semibold text-[1.25rem] px-0 -ml-8 mt-6">
            Governing Laws
          </h2>
          Sondya operates under the copyright laws of Nigeria, international
          treaties, and conventions. We retain all rights, title, and interest
          in and to the platform, including associated intellectual properties.
        </div>

        <div className="indent-8">
          <h2 className="font-semibold text-[1.25rem] px-0 -ml-8 mt-6">
            Changes to Terms
          </h2>
          Sondya reserves the right to modify or replace these Terms of Service
          at any time. It is your responsibility to review this document
          periodically for changes. Continued use of our platform after changes
          constitute acceptance of the modified terms.
        </div>
      </div>
      <div className="p-5 border-t border-[#5F6C7280] flex flex-row justify-between">
        <div className="flex flex-row gap-4 text-[#434343]">
          <input type="checkbox" name="" id="" />
          <div className="">I agree to the Terms and Privacy Policy</div>
        </div>
        <button className="px-5 py-2 rounded-md text-white bg-[#EDB842]">
          Agree
        </button>
      </div>
    </section>
  );
};

export default TermsAndServicesBody;
