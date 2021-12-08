import { setMouseParallax, setScrollParallax, getElementCoords, isElementVisible} from '../../functions'
import gsap from 'gsap'

const platformMenuContainer = document.querySelector('.platform-menu')
const elementBackroundLayers = document.querySelectorAll('.platform-menu__background .layer')

let timelines = []
Array.from(elementBackroundLayers).forEach(() => {
    timelines.push(gsap.timeline())
})

export function platformMenu(mouse, scroll, swipeDuration) {
    Array.from(elementBackroundLayers).forEach((layer, idx) => {
        if (!scroll.scrolling) setMouseParallax(layer, mouse, (1 + idx / 4))
        setScrollParallax(layer, scroll, timelines[idx], idx * 10, swipeDuration)
    })

    if (!isElementVisible(platformMenuContainer)) return

    const platformMenuContainerCoords = getElementCoords(platformMenuContainer)
    const translate = window.pageYOffset - platformMenuContainerCoords.top
    const translateMax = platformMenuContainerCoords.height // if u make container bigger u get slower animation


    if (translate < 0) return

    if (translate <= translateMax / 3) {
        platformMenuContainer.style.opacity = 0
        return
    }

    const opacityParameter = 1
    // appear of platform-menu
    if (translate < translateMax / 2) {
        const opacity = translate / (translateMax / 2) * opacityParameter
    
        // console.log(opacity)
        platformMenuContainer.style.opacity = 0 + opacity
        if (platformMenuContainer.classList.contains('visible')) platformMenuContainer.classList.remove('visible')
        return
    }

    if (!platformMenuContainer.classList.contains('visible')) platformMenuContainer.classList.add('visible')
    platformMenuContainer.style.opacity = 1
    
}