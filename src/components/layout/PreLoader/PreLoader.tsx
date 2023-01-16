import { Spinner } from "flowbite-react";

const PreLoader = () => {
  return (
    <div className="container flex items-center justify-center py-16 mx-auto my-48">
      <Spinner
        color="success"
        aria-label="spinner"
        className="text-buttonColor"
        size={"xl"}
      />
    </div>
  );
};

export default PreLoader;
