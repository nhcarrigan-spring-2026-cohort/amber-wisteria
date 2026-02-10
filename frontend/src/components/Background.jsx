import './Background.css'

export default function Background({ children }) {
    return (
        
        <div className="">
            <div id='rectangle-left' className='absolute w-187.5 h-187.5 z-1 -top-60 -left-77.25 bg-[#F68300] -rotate-45 rounded-[160px]'></div>
            <div id='rectangle-right' className='absolute w-187.5 h-187.5 z-1 -bottom-77.5 -right-77.25 bg-[#FEB058] -rotate-45 rounded-[160px]'></div>
            { children }
        </div>
    )
}