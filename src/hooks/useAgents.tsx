import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IAgent, IUpdateAgent, IAgentRequest } from "types/agent";
import {
  getAllAgents,
  updateAgentDetails,
  removeAgent,
  getTotalNumOfCreatedAgents,
  registerNewAgent,
  getNumberOfNewReqByMonth,
  getNumberOfApprovedAgentByMonth,
  getAgentDetails
} from "api/agents";
import toast from "react-hot-toast";
import { monthsList } from "utils/constants";

type MonthType = {
  numberOfDocuments: number;
  month: string;
};

export type AgentType = {
  email: string;
  firstName: string;
  surname: string;
  businessName: string;
  state: string;
  LGA: string;
  gender: string;
  choiceOfSuperAgent: string;
  preferredPhoneNumber: string;
  alternativePhoneNumber: string;
  proposedAgentService: String;
};

const useAgents = (pageNumber: number = 0, agentPerPage: number = 20) => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState<IAgent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPage] = useState(0);
  const [totalAgents, setTotalAgents] = useState(0);
  const [isApproved, setIsApproved] = useState("");

  useEffect(() => {
    getTotalNumOfCreatedAgents()
      .then((response) => {
        setTotalAgents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");
    //This will cancel the request when the component unmount
    const controller = new AbortController();
    const { signal } = controller;

    getAllAgents(pageNumber, agentPerPage, { signal })
      .then((data) => {
        setLoading(false);
        setError("");
        setAgents((preState) => [...data.agents]);
        setTotalPage(data.totalAgents);
      })
      .catch((error: any) => {
        setLoading(false);
        if (signal.aborted) return;
        setError(error.message);
        toast.error(error.message);
      });
  }, [pageNumber, agentPerPage]);

  const filteredAgents = agents.filter((agent) => {
    if (searchTerm !== "") {
      const regex = new RegExp(`${searchTerm}`, "gi");
      return (
        agent.firstName?.match(regex) ||
        agent.surname?.match(regex) ||
        agent.businessName?.match(regex) ||
        agent.state?.match(regex) ||
        agent.email?.match(regex) ||
        agent.choiceOfSuperAgent.match(regex)
      );
    }

    if (isApproved === "approved") {
      return agent.approved === true;
    }

    if (isApproved === "new_request") {
      return agent.approved === false;
    }

    return agent;
  });

  // const filterAgent = agents.filter((agent) => {
  //   if (isApproved === "approved") {
  //     return agent.approved === true;
  //   }

  //   return agent.approved === false;
  // });

  const updateDetails = (agentId: IUpdateAgent) => {
    updateAgentDetails(agentId)
      .then((response) => {
        if (response.status === "Success") {
          toast.success(response.message);
          navigate("/agents");
          return;
        }

        toast.error(response.message);
      })
      .catch((error) => {
        toast.error(`Error updating agent ${error.message}`);
      });
  };

  const deleteAgent = (agentId: string | undefined) => {
    removeAgent(agentId)
      .then((response) => {
        if (response.status === "Success") {
          setAgents(agents.filter((agent) => agent._id !== agentId));
          toast.success(response.message);
          return;
        }

        toast.error(response.message);
      })
      .catch((error) => {
        toast.error(`Error deleting agent: ${error.message}`);
      });
  };

  return {
    loading,
    error,
    totalPages,
    totalAgents,
    setIsApproved,
    filteredAgents,
    setSearchTerm,
    updateDetails,
    deleteAgent
  };
};

export const useAgentAnalytics = () => {
  const [loadingMonths, setLoadingMonth] = useState(false);
  const [newAgentReqMonths, setNewAGentReqMonths] = useState<MonthType[]>([]);
  const [approvedAgentMonths, setApprovedAgentMonths] = useState<MonthType[]>(
    []
  );
  const [selectedNewReqMonth, setSelectedNewReqMonth] = useState(monthsList[0]);
  const [selectedApprAgentMonth, setSelectedApprAgentMonth] = useState(
    monthsList[0]
  );
  const [query, setQuery] = useState("");
  const [reqNewMonth, setReqNewMonth] = useState(0);
  const [reqApprMonth, setReqApprMonth] = useState(0);

  const regex = new RegExp(`${query}`, "gi");

  const filteredMonth =
    query === ""
      ? monthsList
      : monthsList.filter((month) => month.value.match(regex));

  // New Req Month
  useEffect(() => {
    const myMonth = newAgentReqMonths.filter((month) =>
      month.month.match(selectedNewReqMonth.value)
    )[0];

    if (myMonth) {
      setReqNewMonth(myMonth?.numberOfDocuments);
      return;
    }

    setReqNewMonth(0);
  }, [selectedNewReqMonth, newAgentReqMonths]);

  // Approved Agents Month
  useEffect(() => {
    const myMonth = approvedAgentMonths.filter((month) =>
      month.month.match(selectedApprAgentMonth.value)
    )[0];

    if (myMonth) {
      setReqApprMonth(myMonth?.numberOfDocuments);
      return;
    }

    setReqApprMonth(0);
  }, [selectedApprAgentMonth, approvedAgentMonths]);

  useEffect(() => {
    setLoadingMonth(true);

    //This will cancel the request when the component unmount
    const controller = new AbortController();
    const { signal } = controller;
    const dataFetch = async () => {
      const result = (
        await Promise.all([
          getNumberOfNewReqByMonth({ signal }),
          getNumberOfApprovedAgentByMonth({ signal })
        ])
      ).map((response) => response.data);

      const [newReqMonth, ApprovedAgentMonth] = await Promise.all(result);
      setNewAGentReqMonths(newReqMonth);
      setApprovedAgentMonths(ApprovedAgentMonth);
      setLoadingMonth(false);
    };

    dataFetch();
  }, []);

  return {
    query,
    reqNewMonth,
    reqApprMonth,
    selectedNewReqMonth,
    selectedApprAgentMonth,
    filteredMonth,
    loadingMonths,
    setQuery,
    setSelectedNewReqMonth,
    setSelectedApprAgentMonth
  };
};

export const useAgentForm = (state: string, LGA: string | undefined) => {
  const navigate = useNavigate();
  const [agentData, setAgentData] = useState<AgentType>({
    email: "",
    firstName: "",
    surname: "",
    businessName: "",
    state: "",
    LGA: "",
    gender: "",
    choiceOfSuperAgent: "",
    preferredPhoneNumber: "",
    alternativePhoneNumber: "",
    proposedAgentService: ""
  });

  const handleCompanyDataChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setAgentData({
      ...agentData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const agentObj: IAgentRequest = {
      email: agentData.email,
      firstName: agentData.firstName,
      surname: agentData.surname,
      businessName: agentData.businessName,
      state: state,
      LGA: LGA as string,
      approved: true,
      createdDate: new Date(),
      gender: agentData.gender,
      choiceOfSuperAgent: agentData.choiceOfSuperAgent,
      preferredPhoneNumber: `+234${agentData.preferredPhoneNumber}`,
      alternativePhoneNumber: `+234${agentData.alternativePhoneNumber}`,
      proposedAgentService: agentData.proposedAgentService
    };

    console.log(agentObj.createdDate);

    registerNewAgent(agentObj)
      .then((response) => {
        toast.success(response.message);
        navigate("/agents");
        return;
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handlePress = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (e.key === "enter") {
      handleSubmit(e);
    }
  };

  return {
    agentData,
    handleSubmit,
    handlePress,
    handleCompanyDataChange
  };
};

export const useEditAgentForm = (agentId: string | undefined) => {
  const navigate = useNavigate();
  const [agentData, setAgentData] = useState<AgentType>({
    email: "",
    firstName: "",
    surname: "",
    businessName: "",
    state: "",
    LGA: "",
    gender: "",
    choiceOfSuperAgent: "",
    preferredPhoneNumber: "",
    alternativePhoneNumber: "",
    proposedAgentService: ""
  });

  useEffect(() => {
    getAgentDetails(agentId)
      .then((data) => {
        setAgentData({
          ...agentData,
          email: data.email,
          firstName: data.firstName,
          surname: data.surname,
          businessName: data.businessName,
          state: data.state,
          LGA: data.LGA,
          gender: data.gender,
          choiceOfSuperAgent: data.choiceOfSuperAgent,
          preferredPhoneNumber: data.preferredPhoneNumber?.slice(4),
          alternativePhoneNumber: data.alternativePhoneNumber?.slice(4),
          proposedAgentService: data.proposedAgentService
        });
      })
      .catch((error) => {
        toast.error(`Error get agent details ${error.message}`);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentId]);

  const handleAgentDataChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setAgentData({
      ...agentData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const agentObj: IUpdateAgent = {
      id: agentId,
      email: agentData.email,
      firstName: agentData.firstName,
      surname: agentData.surname,
      businessName: agentData.businessName,
      state: agentData.state,
      LGA: agentData.LGA,
      gender: agentData.gender,
      choiceOfSuperAgent: agentData.choiceOfSuperAgent,
      preferredPhoneNumber: `+234${agentData.preferredPhoneNumber}`,
      alternativePhoneNumber: `+234${agentData.alternativePhoneNumber}`,
      proposedAgentService: agentData.proposedAgentService
    };

    const response = await updateAgentDetails(agentObj);

    if (response.status === "Success") {
      toast.success(response.message);
      navigate("/agents");
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
    agentData,
    handleSubmit,
    handlePress,
    handleAgentDataChange
  };
};

export default useAgents;
