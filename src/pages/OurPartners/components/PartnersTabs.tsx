import React from "react";
import { Tab } from "@headlessui/react";
import { OUR_PARTNERS_LOGOS } from "../content";

import BanksTab from "./BanksTab";
import SuperAgentTab from "./SuperAgentsTab";
import RegulatorTab from "./RegulatorTab";
import StrategicPartnerTab from "./StrategicPartnerTab";
import GovernmentTab from "./GovernmentTab";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const BanksTabMemo = React.memo(BanksTab);
const SuperAgentTabMemo = React.memo(SuperAgentTab);
const RegulatorTabMemo = React.memo(RegulatorTab);
const StrategicPartnerTabMemo = React.memo(StrategicPartnerTab);
const GovernmentTabMemo = React.memo(GovernmentTab);

const PartnersTabs = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const tabIndex = Number(queryParams.get("tabIndex"));

  return (
    <div className="hidden w-full px-5 mt-20 mb-10 md:block md:px-16 lg:px-60 lg:mb-5 lg:container-lg">
      <Tab.Group defaultIndex={tabIndex ? tabIndex : 0}>
        <Tab.List className="flex items-center justify-center space-x-20 ">
          {Object.keys(OUR_PARTNERS_LOGOS).map((category, idx) => (
            <div className="flex space-x-14" key={idx}>
              <Tab
                className={({ selected }) =>
                  classNames(
                    `font-bold hover:text-lightGreen`,
                    "focus:outline-none",
                    selected
                      ? "text-buttonColor border-b-4 border-b-buttonColor"
                      : ""
                  )
                }
              >
                {category}
              </Tab>
            </div>
          ))}
        </Tab.List>

        <Tab.Panels className={"mt-16"}>
          {/* Banks */}
          <Tab.Panel>
            <BanksTabMemo />
          </Tab.Panel>

          {/* Super Agents */}
          <Tab.Panel>
            <SuperAgentTabMemo />
          </Tab.Panel>

          {/* Regulators */}
          <Tab.Panel>
            <RegulatorTabMemo />
          </Tab.Panel>

          {/* Strategic Partners */}
          <Tab.Panel>
            <StrategicPartnerTabMemo />
          </Tab.Panel>

          {/* Government/MDA's */}
          <Tab.Panel>
            <GovernmentTabMemo />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default PartnersTabs;
