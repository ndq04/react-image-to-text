import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import Tesseract from 'tesseract.js'
import Alert from './components/Alert'
import Home from './components/Home'
import Result from './components/Result'
import {ACTION_TYPES} from './redux/actions/actionTypes'
import checkimage from './utils/checkImage'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const [progress, setProgress] = useState(0)
  const [language, setLanguage] = useState('eng')
  const languages = [
    {value: 'afr', label: 'Afrikaans'},
    {value: 'amh', label: 'Amharic'},
    {value: 'ara', label: 'Arabic'},
    {value: 'asm', label: 'Assamese'},
    {value: 'aze', label: 'Azerbaijani'},
    {value: 'aze_cyrl', label: 'Azerbaijani - Cyrillic'},
    {value: 'bel', label: 'Belarusian'},
    {value: 'ben', label: 'Bengali'},
    {value: 'bod', label: 'Tibetan'},
    {value: 'bos', label: 'Bosnian'},
    {value: 'bul', label: 'Bulgarian'},
    {value: 'cat', label: 'Catalan'},
    {value: 'ceb', label: 'Cebuano'},
    {value: 'ces', label: '	Czech'},
    {value: 'chi_sim', label: 'Chinese - Simplified'},
    {value: 'chi_tra', label: 'Chinese - Traditional'},
    {value: 'chr', label: 'Cherokee'},
    {value: 'cym', label: 'Welsh'},
    {value: 'dan', label: 'Danish'},
    {value: 'deu', label: 'German'},
    {value: 'dzo', label: 'Dzongkha'},
    {value: 'ell', label: 'Greek'},
    {value: 'eng', label: 'English'},
    {value: 'epo', label: 'Esperanto'},
    {value: 'est', label: 'Estonian'},
    {value: 'eus', label: 'Basque'},
    {value: 'fas', label: 'Persian'},
    {value: 'fin', label: 'Finnish'},
    {value: 'fra', label: 'French'},
    {value: 'frk', label: 'German Fraktur'},
    {value: 'frm', label: 'French'},
    {value: 'gle', label: 'Irish'},
    {value: 'glg', label: 'Galician'},
    {value: 'grc', label: 'Greek'},
    {value: 'guj', label: 'Gujarati'},
    {value: 'hat', label: 'Haitian'},
    {value: 'heb', label: 'Hebrew'},
    {value: 'hin', label: 'Hindi'},
    {value: 'hrv', label: 'Croatian'},
    {value: 'hun', label: 'Hungarian'},
    {value: 'iku', label: 'Inuktitut'},
    {value: 'ind', label: 'Indonesian'},
    {value: 'isl', label: 'Icelandic'},
    {value: 'ita', label: 'Italian'},
    {value: 'ita_old', label: 'Italian - Old'},
    {value: 'jav', label: 'Javanese'},
    {value: 'jpn', label: 'Japanese'},
    {value: 'kan', label: 'Kannada'},
    {value: 'kat', label: 'Georgian'},
    {value: 'kat_old', label: 'Georgian - Old'},
    {value: 'kaz', label: '	Kazakh'},
    {value: 'khm', label: 'Central'},
    {value: 'kir', label: 'Kirghiz'},
    {value: 'kor', label: 'Korean'},
    {value: 'kur', label: 'Kurdish'},
    {value: 'lao', label: 'Lao'},
    {value: 'lat', label: 'Latin'},
    {value: 'lav', label: 'Latvian'},
    {value: 'lit', label: 'Lithuanian'},
    {value: 'mal', label: 'Malayalam'},
    {value: 'mar', label: 'Marathi'},
    {value: 'mkd', label: 'Macedonian'},
    {value: 'mlt', label: 'Maltese'},
    {value: 'msa', label: 'Malay'},
    {value: 'mya', label: 'Burmese'},
    {value: 'nep', label: 'Nepali'},
    {value: 'nld', label: 'Dutch; Flemish'},
    {value: 'nor', label: 'Norwegian'},
    {value: 'ori', label: 'Oriya'},
    {value: 'pan', label: 'Panjabi; Punjabi'},
    {value: 'pol', label: 'Polish'},
    {value: 'por', label: 'Portuguese'},
    {value: 'pus', label: 'Pushto; Pashto'},
    {value: 'ron', label: 'Romanian; Moldavian; Moldovan'},
    {value: 'rus', label: 'Russian'},
    {value: 'san', label: 'Sanskrit'},
    {value: 'sin	', label: 'Sinhala; Sinhalese'},
    {value: 'slk', label: 'Slovak'},
    {value: 'slv', label: 'Slovenian'},
    {value: 'spa', label: 'Spanish; Castilian'},
    {value: 'spa_old', label: 'Spanish; Castilian - Old'},
    {value: 'sqi', label: 'Albanian'},
    {value: 'srp', label: 'Serbian'},
    {value: 'srp_latn', label: 'Serbian - Latin'},
    {value: 'swa', label: 'Swahili'},
    {value: 'swe', label: 'Swedish'},
    {value: 'syr', label: 'Syriac'},
    {value: 'tam', label: 'Tamil'},
    {value: 'tel', label: 'Telugu'},
    {value: 'tgk', label: 'Tajik'},
    {value: 'tgl', label: 'Tagalog'},
    {value: 'tha', label: 'Thai'},
    {value: 'tir', label: 'Tigrinya'},
    {value: 'tur', label: 'Turkish'},
    {value: 'uig', label: 'Uighur; Uyghur'},
    {value: 'ukr', label: 'Ukrainian'},
    {value: 'urd', label: 'Urdu'},
    {value: 'uzb', label: 'Uzbek'},
    {value: 'uzb_cyrl', label: 'Uzbek - Cyrillic'},
    {value: 'vie', label: 'Vietnamese'},
    {value: 'yid', label: 'Yiddish'},
  ]

  const handleChangeLanguage = (e) => setLanguage(e.target.value)

  const dispatch = useDispatch()
  useEffect(() => {
    setText('')
  }, [image])

  const handleConvert = () => {
    if (image) {
      setIsLoading(true)
      Tesseract.recognize(image, language, {
        logger: (m) => {
          // console.log(m)
          if (m.status === 'recognizing text') {
            setProgress(parseInt(m.progress * 100))
          }
        },
      }).then(({data: {text}}) => {
        setText(text)
        setIsLoading(false)
        setProgress(0)
      })
    } else {
      return dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          error: 'Không có file nào được chọn',
        },
      })
    }
  }

  const uploadImage = (e) => {
    const file = e.target.files[0]
    const error = checkimage(file)
    if (error) {
      return dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {error},
      })
    }
    setImage(file)
  }

  return (
    <div className='app min-h-screen grid grid-cols-2'>
      <Alert />
      <Home
        image={image}
        uploadImage={uploadImage}
        handleConvert={handleConvert}
        languages={languages}
        language={language}
        handleChangeLanguage={handleChangeLanguage}
        progress={progress}
        isLoading={isLoading}
      />
      {!text && (
        <div className='flex'>
          <div className='text-[#fff] font-bold text-9xl m-auto'>
            <p>Covert</p>
            <p>Image</p>
            <p>To Text</p>
          </div>
        </div>
      )}
      {!isLoading && text && <Result text={text} setText={setText} />}
    </div>
  )
}

export default App
