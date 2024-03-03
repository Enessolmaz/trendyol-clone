import React, { useState } from "react";

const Loading = () => {
  const skeletonCount = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  return (
    <div className=" w-full h-full overflow-hidden ">
      <div className="flex gap-6 ">
        {skeletonCount.map((item) => (
          <div
            key={item.id}
            className="w-72 h-full flex flex-col  bg-[#121212] border   border-[#414141] p-6 rounded-lg cursor-pointer gap-2 overflow-hidden"
          >
            <div className="flex flex-col gap-4 items-center ">
              <div className="skeleton w-full h-56 rounded"></div>
              <div className="flex flex-col gap-4 px-6">
                <div className="skeleton h-4 w-48 " />
                <div className="skeleton h-4 w-48 " />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
