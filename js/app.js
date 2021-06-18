const formSearch = document.querySelector('form')
const gifImage = document.querySelector('.gif')
const gifTitle = document.querySelector('p')

const apiKey = 'yM2LRtlDRz6tp4O6S5evwJZriF1FNRaf'

const getGiphyUrl = (gifName) =>
  `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&q=${gifName}`

const editGifImage = (downsizedGif) => {
  gifImage.setAttribute('src', downsizedGif)

  return gifImage
}

const editGifTitle = (gifData) => {
  const titleGif = gifData.data[0].title
  gifTitle.innerText = `Description: ${titleGif}`

  return gifTitle
}

const fetchGif = async (inputValue) => {
  try {
    const giphyUrl = getGiphyUrl(inputValue)
    const response = await fetch(giphyUrl)

    if (!response.ok) {
      throw new Error('Não foi possível obter os dados da API')
    }

    return response.json()
  } catch ({
    message
  }) {
    alert(`Erro: ${message}`)
    console.log(message)
  }
}

const insertGifIntoDOM = async (inputValue) => {
  const gifData = await fetchGif(inputValue)

  if (gifData) {
    const downsizedGif = gifData.data[0].images.downsized.url
  
    editGifImage(downsizedGif)
    editGifTitle(gifData)
  
    formSearch.reset()
  }
}

formSearch.addEventListener('submit', event => {
  event.preventDefault()

  const inputValue = event.target.search.value

  insertGifIntoDOM(inputValue)
})