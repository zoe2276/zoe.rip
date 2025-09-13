export const updateShadowPos = (e, scalar = false, color = "#42b983aa") => {
    const mouseX = e.clientX
    const mouseY = e.clientY
    const elemBoundingBox = e.target.getBoundingClientRect()
    const elemX = elemBoundingBox.x + (elemBoundingBox.width / 2) // x coord of center
    const elemY = elemBoundingBox.y + (elemBoundingBox.height / 2) // y coord of center
    const offsetX = mouseX - elemX
    const offsetY = mouseY - elemY
    const blurRadius = scalar ? Math.max(25, Math.abs(Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2)))) * 0.2 : "5.37"
    const dropShadow = `filter: drop-shadow(${offsetX}px ${offsetY}px ${blurRadius}vmin ${color})`
    const newStyleString = `${dropShadow}; will-change: none; transition: none;`
    e.target.setAttribute("style", newStyleString)
    console.log(dropShadow)
}

export const resetElementShadow = e => {
    e.target.removeAttribute("style")
}
