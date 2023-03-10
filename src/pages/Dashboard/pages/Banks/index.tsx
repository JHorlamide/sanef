import { useState } from "react";
import DashboardLayout from "../../../../components/DashboardLayout";
import BankListTable from "./components/BankListTable";
import { DashboardMainView } from "components/Layout";
import { ADD_BANK } from "routes/ROUTES_CONSTANTS";
import BankHeader from "./components/BankHeader";
import useBank from "hooks/useBank";
import BankTableHeader from "./components/BankTableHeader";
import Pagination, { TableRecord } from "components/Pagination";

const BankManager = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [bankPerPage, setBankPerPage] = useState(10);
  const {
    loading,
    error,
    filteredBanks,
    totalPages,
    removeBank,
    setSearchTerm
  } = useBank(pageNumber, bankPerPage);

  // const pageCount = Math.ceil(totalPages / bankPerPage);
  return (
    <DashboardLayout>
      <BankHeader />

      <DashboardMainView className="">
        <BankTableHeader
          buttonText={"New Bank"}
          path={ADD_BANK}
          setSearchTerm={setSearchTerm}
          bankList={filteredBanks}
        />

        <BankListTable
          banks={filteredBanks}
          loading={loading}
          error={error}
          removeBank={removeBank}
        />

        <div className="flex justify-between py-5">
          <TableRecord
            totalPage={totalPages}
            recordPerPage={bankPerPage}
            setRecordPerPate={setBankPerPage}
          />

          <Pagination
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
            totalPage={totalPages}
          />
        </div>
      </DashboardMainView>
    </DashboardLayout>
  );
};

export default BankManager;
