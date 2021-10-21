/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

  // Validate that variables exit
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show-menu')
    })
  }
}
showMenu('nav-toggle', 'nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
  const navMenu = document.getElementById('nav-menu')
  navMenu.classList.remove('show-menu')
}
navLink.forEach((n) => n.addEventListener('click', linkAction))

/*==================== REDUCE THE SIZE AND PRINT ON AN A4 SHEET  ====================*/
function scaleCv() {
  document.body.classList.add('scale-cv')
}

/*==================== REMOVE THE SIZE WHEN THE CV IS DOWNLOADING ====================*/
function removeScale() {
  document.body.classList.remove('scale-cv')
}

/*==================== GENERATE PDF ====================*/
// PDF generated area
let areaCv = document.getElementById('area-cv')
let resumeButton = document.getElementById('resume-button')

// html2pdf options
let opt = {
  margin: 1,
  filename: 'HaQuyenResume.pdf',
  image: { type: 'jpeg', quality: 1 },
  html2canvas: { scale: 4 },
  jsPDF: { format: 'a4', orientation: 'portrait' },
}

html2pdf().set({
  pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
})
// function to call areaCv and html2pdf
function generateResume() {
  html2pdf(areaCv, opt)
}

resumeButton.addEventListener('click', () => {
  scaleCv()
  generateResume()
  // setTimeout(removeScale, 5000)
})

/*==================== PORTFOLIO SWIPER  ====================*/

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
  const scrollY = window.pageYOffset

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 50
    sectionId = current.getAttribute('id')

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector('.nav__menu a[href*=' + sectionId + ']')
        .classList.add('active-link')
    } else {
      document
        .querySelector('.nav__menu a[href*=' + sectionId + ']')
        .classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/

/*==================== SHOW SCROLL UP ====================*/
function scrollTop() {
  const scrollTop = document.getElementById('scroll-top')
  if (this.scrollY >= 200) scrollTop.classList.add('show-scroll')
  else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== DARK LIGHT THEME ====================*/
localStorage.setItem('selected-theme', 'light')
localStorage.setItem('selected-icon', 'moon')

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// previously selected topic
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
    darkTheme
  )
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](
    iconTheme
  )

  // active/ deactive the theme manually with the button
  themeButton.addEventListener('click', () => {
    // add or remove the dark/ icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // save the theme and current icon
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
  })
}
