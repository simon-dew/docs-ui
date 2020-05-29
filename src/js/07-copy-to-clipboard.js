;(function () {
  'use strict'
  document.querySelectorAll('pre > code').forEach(function (codeBlock) {
    var button = document.createElement('a')
    button.className = 'copy-code-button'
    //button.type = 'button'
    button.dataset.title = 'Copy'

    var dataSource = document.createElement('span')
    dataSource.className = 'data-source'
    dataSource.innerHTML += codeBlock.dataset.lang

    var fadeShadow = document.createElement('span')
    fadeShadow.className = 'fade-shadow'

    button.addEventListener('click', function (e) {
      if (e.target && e.target.matches('a.copy-code-button')) {
        navigator.clipboard.writeText(codeBlock.innerText).then(
          function () {
            /* Chrome doesn't seem to blur automatically,
                leaving the button in a focused state. */
            button.blur()

            button.dataset.title = 'Copied ✓'

            setTimeout(function () {
              button.dataset.title = 'Copy'
            }, 2000)
          },
          function () {
            button.dataset.title = 'Error'
          }
        )
      }
    })
    var pre = codeBlock.parentNode
    pre.appendChild(dataSource)
    pre.appendChild(button)
    pre.appendChild(fadeShadow)
  })
})()
