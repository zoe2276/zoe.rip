export const updateShadowPos = (e, parentId, scalar = false, color = "#42b983aa") => {
    const mouseX = e.clientX
    const mouseY = e.clientY
    const elem = document.getElementById("cursorGlow")
    const elemBoundingBox = elem.getBoundingClientRect()
    const parent = document.getElementById(parentId)
    const parentBoundingBox = parent.getBoundingClientRect()
    const newPosition = `left: ${mouseX - parentBoundingBox.x - (elemBoundingBox.width / 2)}px; top: ${mouseY - parentBoundingBox.y - (elemBoundingBox.height / 2)}px; visibility: visible;`
    const newStyleString = `${newPosition};`
    elem.setAttribute("style", newStyleString)
}

export const resetElementShadow = e => {
    const elem = document.getElementById("cursorGlow")
    elem.removeAttribute("style")
}
