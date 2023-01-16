import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  getAllSuperAgents,
  updateSuperAgent,
  getTotalNumberOfCreatedSuperAgents,
  removeSuperAgent
} from "api/superAgents";
import { ISuperAgent, IUpdateSuperAgentRequest } from "types/superAgent";
import { uploadImage } from "api/upload";
import { registerNewSuperAgent } from "api/superAgents";
import { ISuperAgentRequest } from "types/superAgent";

type CompanyLogoType = File | undefined;

export type CompanyDataType = {
  email: string;
  companyName: string;
  companyAddress: string;
  companyContactPerson: string;
  designation: string;
  phoneNumber: string;
};

interface useSuperAgentFormProps {
  company_logo?: CompanyLogoType;
  company_data?: CompanyDataType;
}

const useSuperAgent = (
  pageNumber: number = 0,
  superAgentPerPage: number = 20
) => {
  const navigate = useNavigate();
  const [superAgents, setSuperAgents] = useState<ISuperAgent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalSuperAgents, setTotalSuperAgents] = useState(0);
  const [totalPages, setTotalPage] = useState(0);

  useEffect(() => {
    getTotalNumberOfCreatedSuperAgents()
      .then((response) => {
        setTotalSuperAgents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    setIsError(false);
    setError("");

    //This will cancel the request when the component unmount
    const controller = new AbortController();
    const { signal } = controller;

    getAllSuperAgents(pageNumber, superAgentPerPage, { signal })
      .then((data) => {
        setSuperAgents([...data.superAgents]);
        setTotalPage(data.totalSuperAgents);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError(error.message);
        toast.error(error.message);
      });

    // Anytime the component unmount it will abort the controller;
    return () => controller.abort();
  }, [pageNumber, superAgentPerPage]);

  const updateSuperAgentDetails = (updatedBank: IUpdateSuperAgentRequest) => {
    updateSuperAgent(updatedBank)
      .then((response) => {
        if (response.status === "Success") {
          toast.success(response.message);
          navigate("/super-agents");
          return;
        }

        toast.error(response.message);
      })
      .catch((error) => {
        toast.error(`Update error ${error.message}`);
      });
  };

  const deleteSuperAgent = async (superAgentId: string) => {
    removeSuperAgent(superAgentId)
      .then((response) => {
        if (response.status === "Success") {
          setSuperAgents(
            superAgents.filter((superAgent) => superAgent._id !== superAgentId)
          );
          toast.success(response.message);
          navigate("/super-agents");
          return;
        }

        toast.error(response.message);
      })
      .catch((error) => {
        toast.error("Remove Super Agent Error");
        console.log(error.message);
      });
  };

  const filteredSuperAgents = superAgents.filter((superAgent) => {
    if (searchTerm !== "") {
      const regex = new RegExp(`${searchTerm}`, "gi");
      return (
        superAgent.companyName.match(regex) ||
        superAgent.contactPerson.match(regex) ||
        superAgent.designation.match(regex) ||
        superAgent.email.match(regex)
      );
    }

    return superAgent;
  });

  return {
    loading,
    isError,
    error,
    totalPages,
    totalSuperAgents,
    filteredSuperAgents,
    setSearchTerm,
    setSuperAgents,
    deleteSuperAgent,
    updateSuperAgentDetails
  };
};

export const useSuperAgentForm = ({
  company_logo,
  company_data
}: useSuperAgentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState<CompanyDataType>({
    companyName: "",
    companyAddress: "",
    companyContactPerson: "",
    designation: "",
    email: "",
    phoneNumber: ""
  });
  const [imageUploadId, setImageUploadId] = useState("");
  const [companyLogo, setCompanyLogo] = useState<CompanyLogoType>(company_logo);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [previewLogo, setPreviewLogo] = useState<string>("");
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!companyLogo) {
      setPreviewLogo("");
      return;
    }

    const objectUrl = URL.createObjectURL(companyLogo);
    setPreviewLogo(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [companyLogo]);

  const openFileInput = () => {
    hiddenFileInput.current?.click();
  };

  const handleCompanyDataChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setCompanyData({
      ...companyData,
      [e.target.name]: e.target.value
    });
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
      setCompanyLogo(files[0]);
      const formData = new FormData();
      formData.append("image", files[0] as File);
      const response = await uploadImage(formData);

      if (response.status === "Success") {
        setImageUploadId(response.data._id);
        toast.success("Image Uploaded Successfully");
        return;
      }

      toast.error(response.message);
      setErrorMessage("");
      setErrorMessage("");
      return;
    }

    setErrorMessage("File not accepted");
  };

  const validateSelectedFileSize = () => {
    const MAX_FILE_SIZE = 5120; // 5MB

    if (!companyLogo) {
      setErrorMessage("Please choose a file");
      return;
    }

    const fileSizeKiloBytes = Number(companyLogo.size / 1024);

    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      setErrorMessage("File size is greater than maximum limit");
      return;
    }

    setErrorMessage("");
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    validateSelectedFileSize();

    const superAgentObj: ISuperAgentRequest = {
      logo: imageUploadId,
      email: companyData.email,
      createdDate: new Date(),
      companyName: companyData.companyName,
      contactPerson: companyData.companyContactPerson,
      designation: companyData.designation,
      companyAddress: companyData.companyAddress,
      phoneNumber: `+234${companyData.phoneNumber}`
    };

    registerNewSuperAgent(superAgentObj)
      .then((response) => {
        toast.success(response.message);
        navigate("/super-agents");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handlePress = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (e.key === "enter") {
      onSubmit(e);
    }
  };

  return {
    register,
    errors,
    companyData,
    companyLogo,
    errorMessage,
    previewLogo,
    hiddenFileInput,
    onSubmit,
    handleSubmit,
    handleFileChange,
    handlePress,
    openFileInput,
    handleCompanyDataChange
  };
};

export default useSuperAgent;
