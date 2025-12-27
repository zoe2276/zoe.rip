export const updateShadowPos = (e, scalar = false, color = "#42b983aa") => {
    const mouseX = e.clientX
    const mouseY = e.clientY
    const elem = document.getElementById("cursorGlow")
    const elemBoundingBox = elem.getBoundingClientRect()
    // const elemX = elemBoundingBox.x + (elemBoundingBox.width / 2) // x coord of center
    // const elemY = elemBoundingBox.y + (elemBoundingBox.height / 2) // y coord of center
    // const offsetX = mouseX - elemX
    // const offsetY = mouseY - elemY
    // const blurRadius = scalar ? Math.max(25, Math.abs(Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2)))) * 0.2 : "10"
    // const dropShadow = `box-shadow: ${offsetX}px ${offsetY}px ${blurRadius}vmin ${color}`
    const newPosition = `left: ${mouseX - (elemBoundingBox.width / 2)}px; top: ${mouseY - (elemBoundingBox.height)}px;`
    // const dropShadow = `filter: drop-shadow(${offsetX}px ${offsetY}px ${blurRadius}vmin ${color})`
    const newStyleString = `${newPosition};`
    elem.setAttribute("style", newStyleString)
}

export const resetElementShadow = e => {
    const elem = document.getElementById("cursorGlow")
    elem.removeAttribute("style")
}
