import { ZapIcon } from "lucide-react"

const RateLimitedUi = () => {
  return (
    <div className="max-w-full w-[100%] mx-auto px-4 py-8 z-20">
        <div className="bg-gradient-to-tr from-green-950 to-green-800 border border-primary/30 rounded-lg shadow-md">
            <div className="flex flex-col mf:flex-row items-center p-6">
                <div className="size-10 text-primary">
                    <ZapIcon className="text-red-500"/>
                </div>
                <div className="flex-1 flex flex-col gap-2 items-center text-center md:text-left">
                    <h3 className="text-xl font-bold mb-2 text-white">Too many Attemps!</h3>
                    <p className="text-gray-200 text-sm mb-1">Please wait a moment.</p>
                    <p className="text-sm text-gray-300">Try again in few seconds...</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RateLimitedUi