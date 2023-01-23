import React, { useState } from "react";
import Pagination, { TableRecord } from "components/Pagination";
import { useFetchStrategicPartners } from "hooks/useStrategicPartner";
import PartnerLogoAndName from "./PartnerLogoAndName";

const StrategicPartnerTab = () => {
  const [partnerPageNumber, setPartnerPageNumber] = useState(1);
  const [partnerPerPage, setPartnerPerPage] = useState(0);
  const {
    strategicPartners,
    loading: loadingPartner,
    totalPages: totalPartnerPage
  } = useFetchStrategicPartners(partnerPageNumber, partnerPerPage);

  return (
    <React.Fragment>
      <div className="grid justify-center grid-custom gap-y-10 gap-x-14">
        {loadingPartner && <p>Loading Strategic Partners....</p>}
        {strategicPartners.map((partner) => (
          <PartnerLogoAndName
            key={partner._id}
            logo={partner.logo.imageUrl}
            companyName={partner.companyName || partner.name}
          />
        ))}
      </div>

      <div className="flex items-center justify-center py-10 space-x-10">
        <TableRecord
          className="mt-5"
          totalPage={totalPartnerPage}
          recordPerPage={partnerPerPage}
          setRecordPerPate={setPartnerPerPage}
        />

        <Pagination
          setPageNumber={setPartnerPageNumber}
          pageNumber={partnerPageNumber}
          totalPage={totalPartnerPage}
        />
      </div>
    </React.Fragment>
  );
};

export default StrategicPartnerTab;
