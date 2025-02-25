import React from 'react'

export default function Loader({message}) {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#1DB954] border-t-transparent rounded-full animate-spin"></div>
            {message && <p className="mt-4 text-[#1DB954]">{message}</p>}
        </div>
    )
}