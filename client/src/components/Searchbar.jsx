const Searchbar = ({ keyword, setKeyword, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className=' flex items-center flex-col gap-1 md:flex-row'>
          <input
            type='text'
            placeholder='Serarch for a product'
            className=' p-1 w-[200px] md:w-[500px] placeholder:font-mono border-2 border-black'
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
          />
          <input
            type='submit'
            value={"Search"}
            className=' p-1 bg-orange-500 text-white w-[100px] border-2 cursor-pointer hover:bg-blue-500 transition-all font-semibold'
          />
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
