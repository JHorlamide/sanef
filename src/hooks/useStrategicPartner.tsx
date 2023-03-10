import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IUpdateRequest, IStrategicPartner } from "types/strategicPartner";
import {
  getAllPartner,
  updatePartnerDetails,
  removePartner
} from "api/strategicPartner";
import toast from "react-hot-toast";
import { uploadImage } from "api/upload";
import {
  registerNewPartner,
  fetchStrategicPartner
} from "api/strategicPartner";
import { IRequest } from "types/strategicPartner";
import { OUR_PARTNERS_LOGOS } from "pages/OurPartners/content";

export const useFetchStrategicPartners = (
  pageNumber: number,
  partnerPerPage: number
) => {
  const [strategicPartners, setStrategicPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPage] = useState(0);

  useEffect(() => {
    setLoading(true);

    //This will cancel the request when the component unmount
    const controller = new AbortController();
    const { signal } = controller;

    fetchStrategicPartner(pageNumber, partnerPerPage, { signal })
      .then((data) => {
        setLoading(false);
        setStrategicPartners(
          pageNumber === 1
            ? [
                ...data.strategicPartners,
                ...OUR_PARTNERS_LOGOS["Strategic Partners"]
              ]
            : [...data.strategicPartners]
        );
        setTotalPage(data.totalPartner);
      })
      .catch((error: any) => {
        setLoading(false);
        if (signal.aborted) return;
        toast.error(error.message);
      });
  }, [pageNumber, partnerPerPage]);
  return { strategicPartners, loading, totalPages };
};

const useStrategicPartner = (
  pageNumber: number = 0,
  partnerPerPage: number = 10
) => {
  const navigate = useNavigate();
  const [partners, setPartners] = useState<IStrategicPartner[]>([]);
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

    getAllPartner(pageNumber, partnerPerPage, { signal })
      .then((data) => {
        setLoading(false);
        setError("");
        setPartners((prevPartner) => [...data.partner]);
        setTotalPage(data.totalPartner);
      })
      .catch((error: any) => {
        setLoading(false);
        if (signal.aborted) return;
        setError(error.message);
        toast.error(error.message);
      });
  }, [pageNumber, partnerPerPage]);

  const filteredPartner = partners.filter((partner) => {
    if (searchTerm !== "") {
      const regex = new RegExp(`${searchTerm}`, "gi");
      return partner.name.match(regex);
    }

    return partner;
  });

  const updateDetails = (partnerObj: IUpdateRequest) => {
    updatePartnerDetails(partnerObj)
      .then((response) => {
        if (response.status === "Success") {
          toast.success(response.message);
          navigate("/strategic-partners");
          return;
        }

        toast.error(response.message);
      })
      .catch((error) => {
        toast.error("Error updating strategic partner");
        console.log(error.message);
      });
  };

  const deletePartner = (partnerId: string | undefined) => {
    removePartner(partnerId)
      .then((response) => {
        if (response.status === "Success") {
          setPartners(partners.filter((partner) => partner._id !== partnerId));
          toast.success(response.message);
          navigate("/strategic-partners");
          return;
        }

        toast.error(response.message);
      })
      .catch((error) => {
        toast.error("Error deleting strategic partner");
        console.log(error.message);
      });
  };

  const download = () => {};

  return {
    loading,
    error,
    totalPages,
    filteredPartner,
    download,
    setSearchTerm,
    deletePartner,
    updateDetails
  };
};

export const useStrategicPartnerForm = () => {
  const navigate = useNavigate();
  const [imageUploadId, setImageUploadId] = useState("");
  const [partnerName, setPartnerName] = useState<string | undefined>("");
  const [partnerLogo, setPartnerLogo] = useState<string | any>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [previewLogo, setPreviewLogo] = useState<string>("");
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!partnerLogo) {
      setPreviewLogo("");
      return;
    }

    const objectUrl = URL.createObjectURL(partnerLogo);
    setPreviewLogo(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [partnerLogo]);

  const openFileInput = () => {
    hiddenFileInput.current?.click();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setPartnerName(e.target.value);
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
      setPartnerLogo(files[0]);

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

    if (!partnerLogo) {
      setErrorMessage("Please choose a file");
      return;
    }

    const fileSizeKiloBytes = Number(partnerLogo.size / 1024);

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

    const partnerObj: IRequest = {
      name: partnerName as string,
      logo: imageUploadId
    };

    const response = await registerNewPartner(partnerObj);

    if (response.status === "Success") {
      toast.success(response.message);
      navigate("/strategic-partners");
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
    partnerName,
    partnerLogo,
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

export default useStrategicPartner;
