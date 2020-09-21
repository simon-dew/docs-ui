;(function () {
  'use strict'

  var nav = document.querySelector('nav.nav')
  var menuExpandToggle = document.querySelector('.menu-expand-toggle')
  var navMenu = {}
  if (!(navMenu.element = nav && nav.querySelector('.nav-menu'))) return
  var navControl
  // var currentPageItem = navMenu.element.querySelector('.is-current-page')

  // NOTE prevent text from being selected by double click
  navMenu.element.addEventListener('mousedown', function (e) {
    if (e.detail > 1) e.preventDefault()
  })

  find(/*'.nav-toggle',*/ '.in-toggle', navMenu.element).forEach(function (toggleBtn) {
    // console.log(toggleBtn, 17)
    var navItem = findAncestorWithClass('nav-item', toggleBtn, navMenu.element)
    toggleBtn.addEventListener('click', toggleActive.bind(navItem))
    // var dataDepth = toggleBtn.getAttribute('data-depth')
    // if (dataDepth === 1) {
    //   toggleBtn.classList.add("mystyle")
    // }
    // toggleBtn.addEventListener('click', addActive.bind(navItem))

    var navItemSpan = findNextElement(toggleBtn)
    if (navItemSpan.classList.contains('nav-text')) {
      navItemSpan.style.cursor = 'pointer'
      navItemSpan.addEventListener('click', toggleActive.bind(navItem))
      // navItemSpan.addEventListener('click', addActive.bind(navItem))
    }
    var parentHeader = panel.previousElementSibling
    console.log(parentHeader)
    panel.classList.remove('hide')
    parentHeader.querySelector('.material-icons').classList.add('expanded')
    expandParents(parentHeader)
  }

  // persist version selections
  var select = document.querySelectorAll('.select-version')
  var versionVar = 'sdp-docs-versions'
  var versions = getVersions()

  if (!versions) {
    versions = {}
    for (var i = 0; i < select.length; i++) {
      versions[select[i].getAttribute('data-component')] = 0
    }
    setVersions(versions)
  } else {
    Object.entries(versions).forEach(function (component) {
      var componentName = component[0]
      var componentVersionIndex = component[1]
      var componentSelectVersion = document.querySelector('select[data-component="' + componentName + '"]')
      componentSelectVersion.selectedIndex = componentVersionIndex
      var componentVersion = componentSelectVersion.options[componentVersionIndex].value
      setComponentVersion(componentName, componentVersion)
    })
  }

  function setVersions (versions) {
    return window.sessionStorage.setItem(versionVar, JSON.stringify(versions))
  }

  function getVersions () {
    return JSON.parse(window.sessionStorage.getItem(versionVar))
  }

  function setComponentVersion (component, version) {
    var showSelector = '.nav-container div[data-component="' + component + '"][data-version="' + version + '"]'
    var hideSelector = '.nav-container div[data-component="' + component + '"]:not(.hide)'
    var navShow = document.querySelector(showSelector)
    var navHide = document.querySelector(hideSelector)
    navHide.classList.add('hide')
    navShow.classList.remove('hide')
  }

  for (var j = 0; j < select.length; j++) {
    var s = select[j]
    s.addEventListener('change', function (event) {
      var component = this.getAttribute('data-component')
      var versionIndex = this.selectedIndex
      var version = this.options[versionIndex].value
      var versions = getVersions()
      versions[component] = versionIndex
      setVersions(versions)
      setComponentVersion(component, version)
    })

    // Disable select if there is only one version
    if (s.options.length === 1) {
      s.classList.add('single-version')
      s.disabled = true
    }
  }

  /// nav-tree
  var x = document.querySelectorAll('.nav-item:not(.is-link), .nav-item.is-link .material-icons')
  for (var k = 0; k < x.length; k++) {
    // mdc.ripple.MDCRipple.attachTo(x[k])
    x[k].addEventListener('click', function (event) {
      var target = event.target
      var item = target.matches('span') ? target.previousElementSibling : target
      var panel = item.parentElement.nextElementSibling
      if (item.classList.contains('expanded')) {
        item.classList.remove('expanded')
        panel.classList.add('hide')
      } else {
        item.classList.add('expanded')
        panel.classList.remove('hide')
      }
    })
  }
})()
