import React from "react";

interface FooterCopyrightProps {
  parentStyle?: string;
  contentStyle: string;
  spanStyle?: string;
}

const FooterCopyright = ({
  parentStyle,
  contentStyle,
  spanStyle
}: FooterCopyrightProps) => {
  return (
    <div id="copyright" className={parentStyle}>
      <p className={contentStyle}>
        © 2022.{" "}
        <span className="text-buttonColor">
          Shared Agent Network <br className="md:hidden lg:hidden" /> Expansion
          Facilities.
        </span>{" "}
        All rights reserved
      </p>
    </div>
  );
};

export default FooterCopyright;
