import React, { useState } from "react";
import Pagination, { TableRecord } from "components/Pagination";
import PartnerLogoAndName from "./PartnerLogoAndName";
import { useFetchSuperAgents } from "hooks/useSuperAgent";

const SuperAgentsTab = () => {
  const [superAgentPageNumber, setSuperAgentPageNumber] = useState(1);
  const [superAgentPerPage, setSuperAgentPerPage] = useState(0);
  const {
    superAgents,
    loading: loadingSuperAgents,
    totalPages: totalSuperAgentPage
  } = useFetchSuperAgents(superAgentPageNumber, superAgentPerPage);

  return (
    <React.Fragment>
      <div className="grid justify-center grid-custom gap-y-10 gap-x-14">
        {loadingSuperAgents && <p>Loading super agents....</p>}
        {superAgents.map((superAgent) => (
          <PartnerLogoAndName
            key={superAgent._id}
            logo={superAgent.logo.imageUrl}
            companyName={superAgent.companyName || superAgent.name}
          />
        ))}
      </div>

      <div className="flex items-center justify-center py-10 space-x-10">
        <TableRecord
          className="mt-5"
          totalPage={totalSuperAgentPage}
          recordPerPage={superAgentPerPage}
          setRecordPerPate={setSuperAgentPerPage}
        />

        <Pagination
          setPageNumber={setSuperAgentPageNumber}
          pageNumber={superAgentPageNumber}
          totalPage={totalSuperAgentPage}
        />
      </div>
    </React.Fragment>
  );
};

export default SuperAgentsTab;
