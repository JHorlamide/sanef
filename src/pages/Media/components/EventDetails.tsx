import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "pages/Layout";
import Navbar from "components/layout/Navbar/Navbar";
import Footer from "components/layout/Footer";
import GalleryModal from "./GalleryModal";
import { useCMSDataFetch } from "hooks/useFetch";
import { EventsType } from "types/news";
import { Spinner } from "flowbite-react";
import moment from "moment";
import { urlFor } from "lib/client";

const EventDetails = () => {
  const { id } = useParams();
  const queries = `*[_type == 'events' && _id == '${id}'][0]`;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data } = useCMSDataFetch<EventsType>(queries);

  const handleModalOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  if (!data) {
    return (
      <div className="container mx-auto text-[28px] text-center font-bold mt-10">
        <Spinner
          color="success"
          aria-label="spinner"
          className="text-buttonColor"
          size={"xl"}
        />
      </div>
    );
  }

  return (
    <Layout>
      <GalleryModal images={data.image} isOpen={isOpen} setIsOpen={setIsOpen} />

      <header className="pb-2 align-top bg-gradient-to-r from-lightBlue to-darkBlue">
        <Navbar />
      </header>

      <section className="container px-8 pt-3 mx-auto md:px-0">
        <div className="flex flex-col w-full space-y-4">
          <div className="flex flex-col items-start justify-start">
            <p className="text-[12px]">{moment(data.date).format("LL")}</p>
            <h1 className="text-buttonColor text-[26px] leading-[39px] font-bold">
              {data.eventName}
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-5 pb-10 md:grid-cols-2 lg:grid-cols-3">
            {data.image.map((imgSrc, index) => (
              <div
                key={index}
                className="md:block relative bg w-full h-[353px] md:w-full md:h-[340px] rounded-xl
                container mx-auto cursor-pointer"
                onClick={handleModalOpen}
              >
                <img
                  src={urlFor(imgSrc).toString()}
                  alt="..."
                  className="absolute object-cover w-full h-full mix-blend-overlay rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <Footer />
      </section>
    </Layout>
  );
};

export default EventDetails;
