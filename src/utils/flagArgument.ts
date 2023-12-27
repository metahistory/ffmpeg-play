/**
 * Returns empty string if value `empty` or condition is `false`
 */
export const flagArgument = (flag: string, value: string | number, condition: boolean) => {
   if (!condition) {
      return ""
   }
   if (!value) {
      return ""
   }
   return `${flag} ${value}`
}
