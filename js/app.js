const formSearch = document.querySelector('form')
const gifImage = document.querySelector('.gif')
const gifTitle = document.querySelector('p')

formSearch.addEventListener('submit', async event => {
  event.preventDefault()

  const apiKey = 'yM2LRtlDRz6tp4O6S5evwJZriF1FNRaf'
  const inputValue = event.target.search.value
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&q=${inputValue}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Não foi possível obter os dados da API')
    }

    const gifData = await response.json()
    const downsizedGif = gifData.data[0].images.downsized.url
    const titleGif = gifData.data[0].title

    gifImage.setAttribute('src', downsizedGif)
    gifTitle.innerText = `Description: ${titleGif}`

    formSearch.reset()

  } catch ({message}) {
    alert(`Erro: ${message}`)
    console.log(message)
  }
})
