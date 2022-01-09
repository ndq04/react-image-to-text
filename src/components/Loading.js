function Loading({progress}) {
  return (
    <div className='flex items-end h-[10%]'>
      <div className='progress bg-[#f1f1f1] rounded-3xl relative h-9 w-full m-auto'>
        <div
          className={`progress-done rounded-3xl text-[#f1f1f1] flex items-center 
        justify-center h-full w-0 opacity-0 transition-colors border-[#fff] ${
          progress > 0 ? 'border-2' : 'border-0'
        }`}
          style={{width: `${progress}%`, opacity: 1}}
        >
          {progress > 0 && <span>{progress}%</span>}
        </div>
      </div>
    </div>
  )
}

export default Loading
