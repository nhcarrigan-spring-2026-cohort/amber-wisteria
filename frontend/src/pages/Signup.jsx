import './Signup.css'
import { Link } from 'react-router-dom'

export default function Signup() {
    return (
        <div>

            <form className='relative z-3 bg-[#FFECC899] rounded-4xl shadow-xl pt-14 pr-22 pb-14 pl-22 flex flex-col box-border items-center'>

                    <h1 id='create-account' className='font-semibold mb-8 text-[45px]! text-[#212B27] dark:text-[#212B27]'>Create An Account</h1>

                    <label htmlFor='name'className='dark:text-[#212B27]'>Name</label>
                    <input type="name" id="name" name="name" className="bg-white p-2.5 w-12/10 rounded-xl mt-2.5 mb-2.5 h-16 border-none outline-hidden dark:text-[#212B27]" placeholder="Name"></input>

                    <label htmlFor='email' className='dark:text-[#212B27]'>Email Address</label>
                    <input type="email" id="email" name="email" className="bg-white p-2.5 w-12/10 rounded-xl mt-2.5 mb-2.5 h-16 border-none outline-hidden dark:text-[#212B27]" placeholder="Email Address"></input>

                    <label htmlFor='password' className='dark:text-[#212B27]'>Password</label>
                    <input type="password" id="password" name="password" className="bg-white p-2.5 w-12/10 rounded-xl mt-2.5 mb-2.5 h-16 border-none outline-hidden dark:text-[#212B27]" placeholder="Password"></input>

                    <label htmlFor='confirm-password' className='dark:text-[#212B27]'>Confirm Password</label>
                    <input type="password" id="confirm-password" name="password" className="bg-white p-2.5 w-12/10 rounded-xl mt-2.5 mb-2.5 h-16 border-none outline-hidden dark:text-[#212B27]" placeholder="Confirm Password"></input>

                    <button type="submit" className="bg-[#A88DE5]! text-white! w-xs mt-8 mb-2 p-5! text-2xl! font-semibold!">Create Account</button>

                    <p className='dark:text-[#212B27]'>Already Have An Account? <Link to='/login'>Sign In</Link></p>

            </form>

            <div id='rectangle-left' className='absolute w-187.5 h-187.5 -top-68 -left-67.25 bg-[#F68300] -rotate-45 rounded-[160px]'></div>
            <div id='rectangle-right' className='absolute w-187.5 h-187.5 top-105.5 left-337.25 bg-[#FEB058] -rotate-45 rounded-[160px]'></div>

        </div>
    )
}