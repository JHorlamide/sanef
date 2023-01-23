import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IGovernment, IUpdateGovernmentRequest } from "types/government";
import {
  getAllGovernments,
  updateGovernmentDetails,
  removeGovernment
} from "api/government";
import toast from "react-hot-toast";
import { uploadImage } from "api/upload";
import { registerGovernment, fetchAllGovernments } from "api/government";
import { IGovernmentRequest } from "types/government";
import { OUR_PARTNERS_LOGOS } from "pages/OurPartners/content";

export const useFetchGovernments = (
  pageNumber: number,
  bankPerPage: number
) => {
  const [governments, setGovernments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalGov, setTotalGov] = useState(0);

  useEffect(() => {
    setLoading(true);

    //This will cancel the request when the component unmount
    const controller = new AbortController();
    const { signal } = controller;

    fetchAllGovernments(pageNumber, bankPerPage, { signal })
      .then((data) => {
        setLoading(false);
        setGovernments(
          pageNumber === 1
            ? [...data.governments, ...OUR_PARTNERS_LOGOS["Government/MDA'S"]]
            : [...data.governments]
        );
        setTotalGov(data.totalGov);
      })
      .catch((error) => {
        setLoading(false);
        if (signal.aborted) return;
        toast.error(error.message);
      });
  }, [pageNumber, bankPerPage]);

  return { governments, loading, totalGov };
};

const useGovernment = (pageNumber: number = 0, govPerPage: number = 20) => {
  const navigate = useNavigate();
  const [governments, setGovernments] = useState<IGovernment[]>([]);
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

    getAllGovernments(pageNumber, govPerPage, { signal })
      .then((data) => {
        setLoading(false);
        setError("");
        setGovernments(data.data.governments);
        setTotalPage(data.data.totalGov);
      })
      .catch((error: any) => {
        setLoading(false);
        if (signal.aborted) return;
        setError(error.message);
        toast.error(error.message);
      });
  }, [pageNumber, govPerPage]);

  const filteredGovernments = governments.filter((government) => {
    if (searchTerm !== "") {
      const regex = new RegExp(`${searchTerm}`, "gi");
      return government.name.match(regex);
    }

    return government;
  });

  const updateDetails = (governmentObj: IUpdateGovernmentRequest) => {
    updateGovernmentDetails(governmentObj)
      .then((response) => {
        if (response.status === "Success") {
          toast.success(response.message);
          navigate("/governments");
          return;
        }

        toast.error(response.message);
      })
      .catch((error) => {
        toast.error("Error updating government: ");
        console.log(error.message);
      });
  };

  const deleteGovernment = (governmentId: string | undefined) => {
    removeGovernment(governmentId)
      .then((response) => {
        if (response.status === "Success") {
          setGovernments(
            governments.filter((government) => government._id !== governmentId)
          );
          toast.success(response.message);
          return;
        }

        toast.error(response.message);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const download = () => {};

  return {
    error,
    loading,
    totalPages,
    filteredGovernments,
    download,
    setSearchTerm,
    deleteGovernment,
    updateDetails
  };
};

export const useGovernmentForm = () => {
  const navigate = useNavigate();
  const [imageUploadId, setImageUploadId] = useState("");
  const [governmentName, setGovernmentName] = useState<string | undefined>("");
  const [governmentLogo, setGovernmentLogo] = useState<string | any>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [previewLogo, setPreviewLogo] = useState<string>("");
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!governmentLogo) {
      setPreviewLogo("");
      return;
    }

    const objectUrl = URL.createObjectURL(governmentLogo);
    setPreviewLogo(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [governmentLogo]);

  const openFileInput = () => {
    hiddenFileInput.current?.click();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setGovernmentName(e.target.value);
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
      setGovernmentLogo(files[0]);

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

    if (!governmentLogo) {
      setErrorMessage("Please choose a file");
      return;
    }

    const fileSizeKiloBytes = Number(governmentLogo.size / 1024);

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

    const governmentObj: IGovernmentRequest = {
      name: governmentName as string,
      logo: imageUploadId
    };

    try {
      const response = await registerGovernment(governmentObj);
      console.log("I was clicked");

      if (response.status === "Success") {
        toast.success(response.message);
        navigate("/governments");
        return;
      }

      toast.error(response.message);
    } catch (error: any) {
      console.log(error.response);
      toast.error(error.response.data.message);
    }
  };

  const handlePress = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (e.key === "enter") {
      handleSubmit(e);
    }
  };

  return {
    governmentName,
    governmentLogo,
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

export default useGovernment;
