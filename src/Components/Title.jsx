import React from "react";

const Title = ({ secTitle }) => {
  return (
    <h2 className="text-4xl sm:text-3xl md:text-5xl font-bold text-white mb-4">
      {secTitle}
    </h2>
  );
};

export default Title;
