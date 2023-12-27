import { ChangeEvent, FC, useState } from "react"
import { Input } from "./components/input/Input"
import { Slider } from "@mui/material"
import { timeFormat } from "./utils/timeFormat"
import { InputFileMetadata } from "./types/inputFileMetadata"
import { flagArgument } from "./utils/flagArgument"

export const App: FC = () => {

   const [input, setInput] = useState("")
   const [output, setOutput] = useState("")

   const [metadata, setMetadata] = useState<InputFileMetadata>({
      name: "movie.mp4",
      duration: 3600,
   })

   const [trim, setTrim] = useState({ start: 0, end: 3600 })

   const updateCrop = (crop: { start: number, end: number }) => {
      if (crop.start >= crop.end) {
         return
      }
      setTrim(prev => ({ ...prev, ...crop }))
   }

   const handleSliderChange = (_: Event, values: number | number[]) => {
      if (!Array.isArray(values)) {
         return
      }
      updateCrop({ start: values[0], end: values[1] })
   }

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
         setTrim({ start: 0, end: duration })
      }

      video.src = URL.createObjectURL(file)
   }

   const command = [

      `ffmpeg -i ${metadata?.name || input || "movie.mp4"}`,
      flagArgument("-ss", timeFormat(trim.start), trim.start > 0),
      flagArgument("-to", timeFormat(trim.end), trim.end < (metadata?.duration || 0)),
      output || "output.avi",

   ].join(" ").replace(/\s{2,}/g, " ")

   return (
      <div className="h-full flex">
         <div className="m-auto flex flex-col w-full px-10 max-w-[640px]">
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

            <span className="mt-6 ml-0.5 font-mono text-xs">Trim:</span>
            <div className="mt-2 flex justify-between">
               <span className="font-mono text-xs">start: {timeFormat(trim.start)}</span>
               <span className="font-mono text-xs">end: {timeFormat(trim.end)}</span>
            </div>
            <Slider
               step={0.01}
               min={0}
               max={metadata?.duration}
               value={[trim.start, trim.end]}
               onChange={handleSliderChange}
               disableSwap
            />
            <span className="mt-12 text-xs ml-0.5 font-mono">Command:</span>
            <div className="mt-1 border-black border bg-gray-200 px-2 py-1 rounded">
               {command}
            </div>
         </div>
      </div>
   )
}
