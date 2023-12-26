import { FC } from "react"
import { cls } from "../../utils/cls"

type InputProps = {
   value: string
   onChange?(value: string): void
   hint?: string
   className?: string
}

export const Input: FC<InputProps> = ({ value, onChange, hint, className }) => {

   const styles = {
      defaults: "border rounded py-1 px-2 font-mono outline-none text-sm",
   }

   return (
      <input
         type="text"
         placeholder={hint}
         className={cls(styles.defaults, className)}
         value={value}
         onChange={e => onChange?.call(null, e.target.value)}
      />
   )
}
