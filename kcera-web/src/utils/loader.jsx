import React from 'react'

const Loader = () => {
    return (
        <div class="fixed top-0 left-0 w-screen h-screen bg-black/85 flex justify-center items-center">
            <div class="w-10 md:w-20 lg:w-28 h-10 md:h-20 lg:h-28  border-2 text-blue-400  animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">

            </div>
        </div>
    )
}

export default Loader