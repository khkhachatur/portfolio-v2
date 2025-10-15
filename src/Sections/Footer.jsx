import React from "react";

const Futter = () => {
  console.log("footer is here");

  return (
    <section>
      <div className="flex justify-between items-center text-[rgb(255,252,238,0.6)] px-5 py-5">
        <div className="flex gap-2 ">
          <p>Terms and Conditions</p>
          <p>|</p>
          <p>Privacy Policy</p>
        </div>
        <p className="text-white-500">
          © 2025 K.Khachatur. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Futter;
