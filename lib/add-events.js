import touches from 'touches'

export default function(app) {
  const $ = document.querySelector.bind(document)

  const click = (selector, fn) => { 
    touches($(selector)).on('start', (ev) => {
      ev.preventDefault()
      fn()
    })
  }

  click('.icon.left', () => app.next(-1))
  click('.icon.right', () => app.next(+1))
  click('.icon.reload', () => app.reset())
}