import { ChangeEvent, FC, useState } from "react"
import { Input } from "./components/input/Input"
import { timeFormat } from "./utils/timeFormat"

export const App: FC = () => {

   const [input, setInput] = useState("")
   const [output, setOutput] = useState("")

   const [metadata, setMetadata] = useState<{ name: string, duration: number }>()

   const handleChooseFile = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.item(0)

      if (!file) {
         return
      }

      const video = document.createElement("video")
      video.preload = "metadata"

      video.onloadedmetadata = () => {
         window.URL.revokeObjectURL(video.src);

         const { name } = file
         const { duration } = video

         setMetadata({ name, duration })
      }

      video.src = URL.createObjectURL(file)
   }

   const command = `ffmpeg -i ${metadata?.name || input || "movie.mp4"} ${output || "output.avi"}`

   return (
      <div className="h-full flex">
         <div className="m-auto flex flex-col">
            <h1 className="text-6xl font-mono font-bold">FFmpeg</h1>

            <span className="mt-10 ml-0.5 font-mono text-xs">Input file:</span>
            <Input value={input} onChange={setInput} hint="movie.mp4" className="mt-1" />

            <label htmlFor="file" className="mt-2 border-2 border-t-0 border-dashed py-4 flex justify-center items-center">
               <span className="text-sm text-gray-400 font-mono text-center">
                  {metadata ? (
                     <>{metadata.name} <br /> {timeFormat(metadata.duration)} </>
                  ) : (
                     <>click here to choose <span className="text-orange-300">file</span></>
                  )}
               </span>
            </label>
            <input onChange={handleChooseFile} type="file" id="file" hidden />

            <span className="mt-6 ml-0.5 font-mono text-xs">Output file:</span>
            <Input value={output} onChange={setOutput} className="mt-1" hint="output.avi" />

            <span className="mt-12 text-xs ml-0.5 font-mono">Command:</span>
            <Input value={command} onChange={() => { }} className="w-[520px] mt-1 border-black border bg-gray-300" />
         </div>
      </div>
   )
}
