const Pagination = ({ page, goNext, goPrev }) => {
  return (
    <div className=' w-full flex items-center justify-center mt-3 '>
      <div className=' flex gap-5 items-center'>
        <button
          className={` p-2 text-white ${
            page === 1 ? "bg-gray-700" : "bg-orange-500"
          }`}
          disabled={page === 1}
          onClick={goPrev}
        >
          Prev
        </button>
        <span className=' text-lg font-semibold font-mono'>{page}</span>
        <button className={`  p-2 text-white bg-orange-500`} onClick={goNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
