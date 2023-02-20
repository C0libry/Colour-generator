const columns = document.querySelectorAll('.column')

document.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (event.code.toLowerCase() == 'space')
  {
    setRandomColor()
  }
})

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type

  if (type == 'lock')
  {
    const node = event.target.tagName.toLowerCase() == 'i'
    ? event.target
    : event.target.children[0]
    node.classList.toggle('fa-lock-open')
    node.classList.toggle('fa-lock')
  } else if (type == 'copy')
  {
    copyColorCode(event.target.textContent)
  }
})

function setRandomColor()
{
  columns.forEach((column) => {
    const isLocked = column.querySelector('i').classList.contains('fa-lock')
    if (isLocked)
    {
      return
    }
    const text = column.querySelector('h2')
    const button = column.querySelector('button')
    const color = chroma.random()

    text.textContent = color
    column.style.background = color
    setTextColor(text, color)
    setTextColor(button, color)
  });
}

function setTextColor(text, color)
{
  const luminance = chroma(color).luminance()
  text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function copyColorCode(text)
{
  return navigator.clipboard.writeText(text)
}

setRandomColor()