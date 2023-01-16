import React from "react";
import { DOTS } from "assets/icons";
import Navbar from "components/layout/Navbar/Navbar";
import Image from "components/widgets/Image/Image";
import style from "./BecomeAnAgent.module.css";
import AgentTab from "./components/Tab";
import Footer from "components/layout/Footer";
import Layout from "pages/Layout";

const BecomeAnAgent = () => {
  return (
    <Layout>
      <section
        className={`${style.agent_hero} relative bg-agent-hero-mobile md:bg-agent-hero-desktop bg-center bg-cover bg-no-repeat items-center w-full h-96 lg:h-full`}
      >
        <Navbar />

        <div className="lg:py-32">
          <h1 className="max-w-lg mx-auto my-10 text-4xl font-extrabold text-center text-white lg:-mt-5">
            Become an Agent
          </h1>
        </div>
      </section>

      <section className="relative p-10 -mt-28 md:-mt-10">
        <Image
          image={DOTS}
          parentClassName="absolute inset-y-0 -right-1 top-42 md:right-16 md:-top-32 lg:right-20 lg:-top-32"
          imageClassName="w-24 h-24 md:w-fit md:h-fit lg:h-fit"
        />
      </section>

      <section>
        <AgentTab />
      </section>

      <section>
        <Footer />
      </section>
    </Layout>
  );
};

export default BecomeAnAgent;
