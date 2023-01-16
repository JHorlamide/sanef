import React from "react";
import Navbar from "components/layout/Navbar/Navbar";
import style from "./Contact.module.css";
import Footer from "components/layout/Footer";
import { MobileForm, DesktopForm } from "./components/Form";
import Image from "components/widgets/Image/Image";
import { DOTS } from "assets/icons";
import Layout from "pages/Layout";

const ContactUs = () => {
  return (
    <Layout>
      <section
        className={`${style.contact_hero} bg-contact-hero-mobile md:bg-contact-hero-desktop bg-center bg-cover bg-no-repeat items-center w-full h-96 lg:h-[400px]`}
      >
        <Navbar />

        <div className="">
          <h1 className="text-white text-4xl text-center max-w-lg mx-auto my-10 font-extrabold lg:mt-10">
            Contact Us
          </h1>
        </div>
      </section>

      <section className="relative md:hidden p-10 -mt-28 md:-mt-10">
        <Image
          image={DOTS}
          parentClassName="absolute inset-y-0 -right-1 top-42 md:right-16 md:-top-32 lg:right-20 lg:-top-40"
          imageClassName="w-24 h-24 md:h-fit lg:h-fit"
        />
      </section>

      <section className="bg-white flex md:hidden">
        <MobileForm />
      </section>

      <section className="hidden md:flex">
        <DesktopForm />
      </section>

      <section>
        <Footer />
      </section>
    </Layout>
  );
};

export default ContactUs;
