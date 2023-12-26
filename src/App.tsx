import { FC } from "react"

export const App: FC = () => {
   return (
      <div className="h-full">
         {import.meta.env.APP_TITLE}
      </div>
   )
}
