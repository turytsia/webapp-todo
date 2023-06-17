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