import React, { useState } from "react";
import Pagination, { TableRecord } from "components/Pagination";
import PartnerLogoAndName from "./PartnerLogoAndName";
import { useFetchRegulators } from "hooks/useRegulator";

const RegulatorTab = () => {
  // Regulator Pagination State Management
  const [regulatorPageNumber, setRegulatorPageNumber] = useState(1);
  const [regulatorsPerPage, setRegulatorsPerPage] = useState(0);
  const {
    regulators,
    loading: loadingRegulators,
    totalPages: totalRegulatorsPages
  } = useFetchRegulators(regulatorPageNumber, regulatorsPerPage);

  return (
    <React.Fragment>
      <div className="grid justify-center space-x-10 grid-custom gap-y-10 gap-x-0">
        {loadingRegulators && <p>Loading regulators....</p>}
        {regulators.map((regulator) => (
          <PartnerLogoAndName
            key={regulator._id}
            logo={regulator.logo.imageUrl}
            companyName={regulator.companyName || regulator.name}
          />
        ))}
      </div>

      <div className="flex items-center justify-center py-10 space-x-10">
        <TableRecord
          className="mt-5"
          totalPage={totalRegulatorsPages}
          recordPerPage={regulatorsPerPage}
          setRecordPerPate={setRegulatorsPerPage}
        />

        <Pagination
          setPageNumber={setRegulatorPageNumber}
          pageNumber={regulatorPageNumber}
          totalPage={totalRegulatorsPages}
        />
      </div>
    </React.Fragment>
  );
};

export default RegulatorTab;
