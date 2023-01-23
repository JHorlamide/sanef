import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IRegulator, IUpdateRegulatorRequest } from "types/regulator";
import {
  getAllRegulators,
  updateRegulator,
  removeRegulator
} from "api/regulator";
import toast from "react-hot-toast";
import { uploadImage } from "api/upload";
import { registerNewRegulator, fetchRegulators } from "api/regulator";
import { IRegulatorRequest } from "types/regulator";
import { OUR_PARTNERS_LOGOS } from "pages/OurPartners/content";

export const useFetchRegulators = (
  pageNumber: number,
  regulatorsPerPage: number
) => {
  const [regulators, setRegulators] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPage] = useState(0);

  useEffect(() => {
    setLoading(true);

    //This will cancel the request when the component unmount
    const controller = new AbortController();
    const { signal } = controller;

    fetchRegulators(pageNumber, regulatorsPerPage, { signal })
      .then((data) => {
        setLoading(false);
        setRegulators(
          pageNumber === 1
            ? [...data.regulators, ...OUR_PARTNERS_LOGOS.Regulators]
            : [...data.regulators]
        );
        setTotalPage(data.totalRegulators);
      })
      .catch((error: any) => {
        setLoading(false);
        if (signal.aborted) return;
        toast.error(error.message);
      });
  }, [pageNumber, regulatorsPerPage]);
  return { regulators, loading, totalPages };
};

const useRegulator = (
  pageNumber: number = 0,
  regulatorsPerPage: number = 10
) => {
  const navigate = useNavigate();
  const [regulators, setRegulators] = useState<IRegulator[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError("");
    //This will cancel the request when the component unmount
    const controller = new AbortController();
    const { signal } = controller;

    getAllRegulators(pageNumber, regulatorsPerPage, { signal })
      .then((data) => {
        setLoading(false);
        setError("");
        setRegulators((prevRegulator) => [...data.regulators]);
        setTotalPage(data.totalRegulators);
      })
      .catch((error: any) => {
        setLoading(false);
        if (signal.aborted) return;
        setError(error.message);
        toast.error(error.message);
      });
  }, [pageNumber, regulatorsPerPage]);

  const filteredRegulators = regulators.filter((regulator) => {
    if (searchTerm !== "") {
      const regex = new RegExp(`${searchTerm}`, "gi");
      return regulator.name.match(regex);
    }

    return regulator;
  });

  const updateRegulatorDetails = (regulatorObj: IUpdateRegulatorRequest) => {
    updateRegulator(regulatorObj)
      .then((response) => {
        if (response.status === "Success") {
          toast.success(response.message);
          navigate("/regulators");
          return;
        }

        toast.error(response.message);
      })
      .catch((error) => {
        toast.error("Error updating regulator");
        console.log(error.message);
      });
  };

  const deleteRegulator = (regulatorId: string) => {
    removeRegulator(regulatorId)
      .then((response) => {
        if (response.status === "Success") {
          setRegulators(
            regulators.filter((regulator) => regulator._id !== regulatorId)
          );
          toast.success(response.message);
          navigate("/regulators");
          return;
        }

        toast.error(response.message);
      })
      .catch((error) => {
        toast.error("Error deleting regulators");
        console.log(error.message);
      });
  };

  const download = () => {};

  return {
    error,
    loading,
    totalPages,
    filteredRegulators,
    download,
    setSearchTerm,
    deleteRegulator,
    updateRegulatorDetails
  };
};

export const useRegulatorForm = () => {
  const navigate = useNavigate();
  const [imageUploadId, setImageUploadId] = useState("");
  const [regulatorName, setRegulatorName] = useState<string | undefined>("");
  const [regulatorLogo, setRegulatorLogo] = useState<string | any>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [previewLogo, setPreviewLogo] = useState<string>("");
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!regulatorLogo) {
      setPreviewLogo("");
      return;
    }

    const objectUrl = URL.createObjectURL(regulatorLogo);
    setPreviewLogo(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [regulatorLogo]);

  const openFileInput = () => {
    hiddenFileInput.current?.click();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setRegulatorName(e.target.value);
  };

  const isValidFileUploaded = (file: File) => {
    const validExtensions = ["png", "jpeg", "jpg"];
    const fileExtension = file.type.split("/")[1];
    return validExtensions.includes(fileExtension);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLFormElement>) => {
    const { files } = e.currentTarget;

    if (!files || !files[0]) {
      setErrorMessage("No file selected");
      return;
    }

    if (isValidFileUploaded(files[0])) {
      setRegulatorLogo(files[0]);

      const formData = new FormData();
      formData.append("image", files[0] as File);
      const response = await uploadImage(formData);

      if (response.status === "Success") {
        setImageUploadId(response.data._id);
        toast.success("Image Uploaded Successfully");
        return;
      }

      toast.error("Error uploading image, please try again.");
      setErrorMessage("");
      return;
    }

    setErrorMessage("File not accepted");
  };

  const validateSelectedFileSize = () => {
    const MAX_FILE_SIZE = 5120; // 5MB

    if (!regulatorLogo) {
      setErrorMessage("Please choose a file");
      return;
    }

    const fileSizeKiloBytes = Number(regulatorLogo.size / 1024);

    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      setErrorMessage("File size is greater than maximum limit");
      return;
    }

    setErrorMessage("");
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    validateSelectedFileSize();

    const regulatorObj: IRegulatorRequest = {
      name: regulatorName as string,
      logo: imageUploadId
    };

    const response = await registerNewRegulator(regulatorObj);

    if (response.status === "Success") {
      toast.success(response.message);
      navigate("/regulators");
      return;
    }

    toast.error(response.message);
  };

  const handlePress = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (e.key === "enter") {
      handleSubmit(e);
    }
  };

  return {
    regulatorName,
    regulatorLogo,
    errorMessage,
    previewLogo,
    hiddenFileInput,
    openFileInput,
    handleNameChange,
    handleFileChange,
    handleSubmit,
    handlePress
  };
};
export default useRegulator;
