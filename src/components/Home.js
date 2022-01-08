function Home({
  image,
  uploadImage,
  handleConvert,
  language,
  handleChangeLanguage,
  languages,
}) {
  return (
    <div>
      <h1 className='text-blue-500'>Covert image to text</h1>
      <label>
        <input
          type='file'
          onChange={uploadImage}
          accept='image/*'
          multiple
          hidden
        />
        <h3>Upload</h3>
      </label>
      <select value={language} onChange={handleChangeLanguage}>
        {languages.map((option, i) => (
          <option value={option.value} key={i}>
            {option.label}
          </option>
        ))}
      </select>
      <input type='button' value='Convert' onClick={handleConvert} />
      {image && <img src={image && URL.createObjectURL(image)} alt='' />}
    </div>
  )
}

export default Home
