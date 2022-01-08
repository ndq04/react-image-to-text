function Result({image, text, setText}) {
  return (
    <div>
      {image && (
        <img src={image && URL.createObjectURL(image)} alt='' className='' />
      )}
      <textarea
        rows='15'
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
    </div>
  )
}

export default Result
