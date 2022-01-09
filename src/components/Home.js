import Loading from './Loading'
function Home({
  image,
  uploadImage,
  handleConvert,
  language,
  handleChangeLanguage,
  languages,
  isLoading,
  progress,
}) {
  return (
    <div className='p-4 bg-white h-[95%] w-[95%] m-auto rounded-xl shadow-2xl shadow-[#f3d9d9]'>
      <div className='h-[10%] flex items-center justify-between'>
        <label className='flex cursor-pointer w-[15%] h-[70%] rounded-md'>
          <input
            type='file'
            onChange={uploadImage}
            accept='image/*'
            multiple
            hidden
          />
          <h3 className='m-auto flex items-center'>
            <span className='text-white font-semibold mr-1'>Upload</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-white'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z'
                clipRule='evenodd'
              />
              <path d='M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z' />
            </svg>
          </h3>
        </label>
        <select
          value={language}
          onChange={handleChangeLanguage}
          className='border-2 border-[#f2709c] rounded-full py-1 px-2 flex-1 mx-3'
        >
          {languages.map((option, i) => (
            <option value={option.value} key={i} className='text-[#f2709c]'>
              {option.label}
            </option>
          ))}
        </select>
        <div
          className='convert flex items-center justify-center cursor-pointer w-[20%] h-[70%] rounded-md'
          onClick={handleConvert}
        >
          <span className='text-white mr-1'>Convert</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 text-white'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z'
              clipRule='evenodd'
            />
          </svg>
        </div>
      </div>
      {image && (
        <div className='h-[80%]'>
          <img
            src={image && URL.createObjectURL(image)}
            alt=''
            className='max-w-full h-full object-cover'
          />
        </div>
      )}
      {isLoading && <Loading progress={progress} />}
    </div>
  )
}

export default Home
