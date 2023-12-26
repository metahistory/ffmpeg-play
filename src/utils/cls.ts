import { clsx, ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cls = (...values: ClassValue[]) => twMerge(clsx(values))
