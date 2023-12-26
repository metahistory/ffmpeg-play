import { FC, useState } from "react"
import { Input } from "./components/input/Input"

export const App: FC = () => {

   const [input, setInput] = useState("")
   const [output, setOutput] = useState("")

   const command = `ffmpeg -i ${input || "movie.mp4"} ${output || "output.avi"}`

   return (
      <div className="h-full flex">
         <div className="m-auto flex flex-col">
            <h1 className="text-6xl font-mono font-bold">FFmpeg</h1>

            <span className="mt-10 ml-0.5 font-mono text-xs">Input file:</span>
            <Input value={input} onChange={setInput} hint="movie.mp4" className="mt-1" />

            <span className="mt-6 ml-0.5 font-mono text-xs">Output file:</span>
            <Input value={output} onChange={setOutput} className="mt-1" hint="output.avi" />

            <span className="mt-12 text-xs ml-0.5 font-mono">Command:</span>
            <Input value={command} onChange={() => { }} className="w-[520px] mt-1 border-black border bg-gray-300" />
         </div>
      </div>
   )
}
