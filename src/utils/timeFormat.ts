import { prefix0 } from "./prefix0"

/**
 * Format seconds to time.
 * @returns 00:00:00:00 (hh:mm:ss:ms)
 */
export const timeFormat = (inputSeconds: number) => {
   const roundTime = Math.floor(inputSeconds)

   const milliseconds = (inputSeconds - roundTime)
   const seconds = roundTime % 60
   const minutes = Math.floor(roundTime / 60) % 60
   const hours = Math.floor(roundTime / 60 / 60)

   return `${prefix0(hours)}:${prefix0(minutes)}:${prefix0(seconds)}:${prefix0(Math.floor(milliseconds * 100))}`
}
