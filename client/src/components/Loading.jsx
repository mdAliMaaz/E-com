import React from "react";

const Loading = () => {
  return (
    <div className=' h-screen w-screen flex items-center justify-center'>
      <div className=' w-[10vmax] h-[10vmax]   border-4 animate-spin border-b-red-500 rounded-[50%]'></div>
    </div>
  );
};

export default Loading;
