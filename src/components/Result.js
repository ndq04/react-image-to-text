function Result({text, setText}) {
  return (
    <div className='w-[95%] h-[95%] m-auto'>
      <textarea
        rows='15'
        value={text}
        onChange={(e) => setText(e.target.value)}
        className='w-full h-full p-5 rounded-xl shadow-2xl 
        shadow-[#f3d9d9] resize-none border-none outline-none'
      ></textarea>
    </div>
  )
}

export default Result
