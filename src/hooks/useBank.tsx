import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom"; //useLocation
import { IBank, IUpdateBankRequest } from "types/bank";
import { getBanks, deleteBank, updateBankDetails } from "api/banks";
import toast from "react-hot-toast";
import { createBank, getCreatedBanks } from "api/banks";
import { uploadImage } from "api/upload";
import { OUR_PARTNERS_LOGOS } from "pages/OurPartners/content";

export const useFetchBanks = (pageNumber: number, bankPerPage: number) => {
  const [banks, setBanks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPage] = useState(0);

  useEffect(() => {
    setLoading(true);

    //This will cancel the request when the component unmount
    const controller = new AbortController();
    const { signal } = controller;

    getCreatedBanks(pageNumber, bankPerPage, { signal })
      .then((data) => {
        setLoading(false);
        setBanks(
          pageNumber === 1
            ? [...data.banks, ...OUR_PARTNERS_LOGOS.Banks]
            : [...data.banks]
        );
        setTotalPage(data.totalBanks);
      })
      .catch((error) => {
        setLoading(false);
        if (signal.aborted) return;
        toast.error(error.message);
      });
  }, [pageNumber, bankPerPage]);

  return { banks, loading, totalPages };
};

const useBank = (pageNumber: number = 1, bankPerPage: number = 1) => {
  const navigate = useNavigate();
  // const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [banks, setBanks] = useState<IBank[]>([]);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    setIsError(false);
    setError("");

    //This will cancel the request when the component unmount
    const controller = new AbortController();
    const { signal } = controller;

    getBanks(pageNumber, bankPerPage, { signal })
      .then((data) => {
        setBanks([...data.banks]);
        setTotalPage(data.totalBanks);
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
  }, [pageNumber, bankPerPage]);

  const removeBank = (bankId: string) => {
    deleteBank(bankId)
      .then((response) => {
        setBanks(banks.filter((bank) => bank._id !== bankId));
        toast.success(response.message);
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  };

  const updateBankDetail = (updatedBank: IUpdateBankRequest) => {
    updateBankDetails(updatedBank)
      .then((response) => {
        if (response.status === "Success") {
          toast.success(response.message);
          navigate("/banks");
          return;
        }

        toast.error(response.message);
      })
      .catch((error) => {
        toast.error(`Update bank error ${error.message}`);
      });
  };

  const filteredBanks = useMemo(
    () =>
      banks.filter((bank) => {
        if (searchTerm !== "") {
          const regex = new RegExp(`${searchTerm}`, "gi");
          return bank.name.match(regex);
        }

        return bank;
      }),
    [banks, searchTerm]
  );

  return {
    banks,
    loading,
    isError,
    error,
    totalPages,
    removeBank,
    setBanks,
    setSearchTerm,
    filteredBanks,
    updateBankDetail
  };
};

export const useBankForm = () => {
  const navigate = useNavigate();
  const [imageUploadId, setImageUploadId] = useState("");
  const [bankName, setBankName] = useState<string | undefined>("");
  const [bankLogo, setBankLogo] = useState<string | any>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [previewLogo, setPreviewLogo] = useState<string>("");
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!bankLogo) {
      setPreviewLogo("");
      return;
    }

    const objectUrl = URL.createObjectURL(bankLogo);
    setPreviewLogo(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [bankLogo]);

  const openFileInput = () => {
    hiddenFileInput.current?.click();
  };

  const handleBankNameChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setBankName(e.target.value);
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
      setBankLogo(files[0]);

      const formData = new FormData();
      formData.append("image", files[0] as File);
      const response = await uploadImage(formData);

      if (response.status === "Success") {
        setImageUploadId(response.data._id);
        toast.success("Image Uploaded Successfully");
        return;
      }

      toast.error(response.data.message);
      setErrorMessage("");
      return;
    }

    setErrorMessage("File not accepted");
  };

  const validateSelectedFileSize = () => {
    const MAX_FILE_SIZE = 5120; // 5MB

    if (!bankLogo) {
      setErrorMessage("Please choose a file");
      return;
    }

    const fileSizeKiloBytes = Number(bankLogo.size / 1024);

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

    const bankObj = {
      name: bankName as string,
      logo: imageUploadId
    };

    createBank(bankObj)
      .then((response) => {
        toast.success(response.message);
        navigate("/banks");
      })
      .catch((error) => {
        if (error.response) {
          return toast.error(error.response.data.message);
        }
      });
  };

  const handlePress = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (e.key === "enter") {
      handleSubmit(e);
    }
  };

  return {
    bankLogo,
    errorMessage,
    previewLogo,
    hiddenFileInput,
    handlePress,
    handleSubmit,
    openFileInput,
    handleFileChange,
    handleBankNameChange
  };
};

export default useBank;
