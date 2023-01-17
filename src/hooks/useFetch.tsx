import { useState, useEffect } from "react";
import { client } from "lib/client";
import { getAllSuperAgentNames } from "api/superAgents";
import { toast } from "react-hot-toast";

interface ISuperAgent {
  companyName: string;
}

export const useCMSDataFetch = <T extends unknown>(fetchQuery: string) => {
  const [state, setState] = useState<T>();

  useEffect(() => {
    const dataFetch = async () => {
      const data = await client.fetch(fetchQuery);
      setState(data);
    };

    dataFetch();
  }, [fetchQuery]);

  return { data: state };
};

export const useFetchSuperAgents = () => {
  const [superAgents, setSuperAgents] = useState<ISuperAgent[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    getAllSuperAgentNames({ signal })
      .then((response) => {
        setSuperAgents(response);
      })
      .catch((error) => {
        if (error.response) {
          return toast.error(error.response.data.message);
        }

        toast.error(error.message);
      });
  }, []);

  return {
    superAgents
  };
};
