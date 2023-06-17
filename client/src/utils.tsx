import { MouseEventHandler } from "react"

/**
 * 
 * @param fn 
 * @returns 
 */
export const withStopPropagation: (fn: Function) => MouseEventHandler<SVGSVGElement> = (fn) => {
    return (e) => {
        e.stopPropagation()
        fn()
    }
}

export const getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16)