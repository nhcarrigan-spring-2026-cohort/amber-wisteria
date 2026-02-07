import './Signup.css'

export default function Signup() {
    return (
        <div>

            <form className='relative z-3 bg-[#FFECC899] rounded-4xl shadow-xl pt-14 pr-22 pb-14 pl-22 flex flex-col box-border items-center'>

                    <h1 id='create-account' className='font-semibold mb-8 text-[45px]!'>Create An Account</h1>

                    <label id='name' for='name'>Name</label>
                    <input type="name" name="name" className="bg-white p-2.5 w-12/10 rounded-xl mt-2.5 mb-2.5 h-16 border-none outline-hidden" placeholder="Name"></input>

                    <label id='email' for='email'>Email Address</label>
                    <input type="email" name="email" className="bg-white p-2.5 w-12/10 rounded-xl mt-2.5 mb-2.5 h-16 border-none outline-hidden" placeholder="Email Address"></input>

                    <label id='password' for='password'>Password</label>
                    <input type="password" name="password" className="bg-white p-2.5 w-12/10 rounded-xl mt-2.5 mb-2.5 h-16 border-none outline-hidden" placeholder="Password"></input>

                    <label id='confirm-password' for='confirm-password'>Confirm Password</label>
                    <input type="password" name="password" className="bg-white p-2.5 w-12/10 rounded-xl mt-2.5 mb-2.5 h-16 border-none outline-hidden" placeholder="Confirm Password"></input>

                    <button type="submit" className="bg-[#A88DE5]! text-white! w-xs mt-8 mb-2 p-5! text-2xl! font-semibold!">Create Account</button>

                    <p>Already Have An Account? <a href='#'>Sign In</a></p>

            </form>

            <div id='rectangle-left' className='absolute w-187.5 h-187.5 -top-68 -left-67.25 bg-[#F68300] -rotate-45 rounded-[160px]'></div>
            <div id='rectangle-right' className='absolute w-187.5 h-187.5 top-105.5 left-337.25 bg-[#FEB058] -rotate-45 rounded-[160px]'></div>

        </div>
    )
}