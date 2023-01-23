import React, { useState } from "react";
import Pagination, { TableRecord } from "components/Pagination";
import { useFetchBanks } from "hooks/useBank";
import PartnerLogoAndName from "./PartnerLogoAndName";

interface IBank {
  _id: number | string;
  logo: { imageUrl: string };
  name: string;
}

const BanksTab = () => {
  // Banks Pagination State Management
  const [bankPageNumber, setBankPageNumber] = useState(1);
  const [bankPerPage, setBankPerPage] = useState(10);
  const { banks, loading, totalPages } = useFetchBanks(
    bankPageNumber,
    bankPerPage
  );

  return (
    <React.Fragment>
      <div className="grid justify-center grid-custom gap-y-10 gap-x-14">
        {loading && <p>Loading banks....</p>}
        {banks.map((bank: IBank) => (
          <PartnerLogoAndName
            key={bank._id}
            logo={bank.logo.imageUrl}
            name={bank.name}
          />
        ))}
      </div>

      <div className="flex items-center justify-center py-10 space-x-10">
        <TableRecord
          className="mt-5"
          totalPage={totalPages}
          recordPerPage={bankPerPage}
          setRecordPerPate={setBankPerPage}
        />

        <Pagination
          setPageNumber={setBankPageNumber}
          pageNumber={bankPageNumber}
          totalPage={totalPages}
        />
      </div>
    </React.Fragment>
  );
};

export default BanksTab;
