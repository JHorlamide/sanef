import React, { useState } from "react";
import Pagination, { TableRecord } from "components/Pagination";
import PartnerLogoAndName from "./PartnerLogoAndName";
import { useFetchGovernments } from "hooks/useGovernmnet";

const GovernmentTab = () => {
  // Government Pagination State Management
  const [govPageNumber, setGovPageNumber] = useState(1);
  const [govPerPage, setGovPerPage] = useState(0);
  const {
    governments,
    loading: loadingGov,
    totalGov
  } = useFetchGovernments(govPageNumber, govPerPage);

  return (
    <React.Fragment>
      <div className="grid justify-center space-x-10 grid-custom gap-y-10 gap-x-0">
        {loadingGov && <p>Loading Strategic Partners....</p>}
        {governments.map((government) => (
          <PartnerLogoAndName
            key={government._id}
            logo={government.logo.imageUrl}
            companyName={government.companyName || government.name}
          />
        ))}
      </div>

      <div className="flex items-center justify-center py-10 space-x-10">
        <TableRecord
          className="mt-5"
          totalPage={totalGov}
          recordPerPage={govPerPage}
          setRecordPerPate={setGovPerPage}
        />

        <Pagination
          setPageNumber={setGovPageNumber}
          pageNumber={govPageNumber}
          totalPage={totalGov}
        />
      </div>
    </React.Fragment>
  );
};

export default GovernmentTab;
