import { FC } from "react"

type LabelProps = {
   name: string
   hint?: string
}

export const Label: FC<LabelProps> = ({ name, hint }) => {
   return (
      <div className="flex items-center py-1">
         <span className="text-sm font-mono">{name}</span>
         {hint && (<>
            <div className="ml-auto relative group">
               <img src="/icons/info.svg" className="w-4 h-4" />
               <div className="hidden group-hover:block whitespace-nowrap bg-gray-200 border rounded text-xs absolute -right-1 px-1 top-5 border-gray-400">
                  {hint}
               </div>
            </div>
         </>)}
      </div>
   )
}
