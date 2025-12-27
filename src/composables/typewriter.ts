export const typeEffect = (selector: string, charsPerSecond: number = 20, delay: number = 6) => {
    const targets = document.querySelectorAll(`${selector}:not(.shown)`)
    Array.from(targets).forEach((el: Element) => {
        const charCount = el.innerHTML.length
        const typeDuration = charCount / charsPerSecond
        const styleString = `animation: type ${typeDuration}s steps(${charCount}, end) ${delay}s, grow 1ms steps(1, end) ${delay}s;`
        el.setAttribute("style", styleString)
        el.addEventListener("animationend", () => el.classList.add("shown"))
        setTimeout(() => el.classList.add("shown"), delay * 1001)
        delay += typeDuration
    })
}

export const backspaceEffect = (selector: string, charsPerSecond: number = 20, delay: number = 6) => {
    const targets = document.querySelectorAll(`${selector}.shown`)
    Array.from(targets).forEach((el: Element) => {
        const charCount = el.innerHTML.length
        const typeDuration = charCount / charsPerSecond
        const styleString = `animation: backspace ${typeDuration}s steps(${charCount}, end) ${delay}s, shrink 1ms steps(1, end) ${delay}s;`
        el.setAttribute("style", styleString)
        setTimeout(() => el.classList.remove("shown"), delay * 1001)
        delay += typeDuration
    })
}