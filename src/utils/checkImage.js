const checkimage = (file) => {
  let err = ''
  if (!file) err = 'Không tìm thấy tệp'
  // if (file.size > 1024 * 1024 * 6) err = 'Dung lượng ảnh vượt quá 6 MB'
  if (
    file.type !== 'image/jpeg' &&
    file.type !== 'image/png' &&
    file.type !== 'image/gif'
  ) {
    err = 'Định dạng không hỗ trợ'
  }
  return err
}

export default checkimage
