import { ContactUsForm, ContactUsLastPart } from "../components/contactus";
import { Footer, Nav } from "../components/layout";

const ContactUs = () => {
  return (
    <div className="">
      <Nav isHome />
      <ContactUsForm />
      <ContactUsLastPart />
      <Footer />
    </div>
  );
};

export default ContactUs;
