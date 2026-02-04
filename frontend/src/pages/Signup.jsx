import './Signup.css'

export default function Signup() {
    return (
        <div>

            <form>

                    <h1>Create An Account</h1>

                    <input type="name" name="name" class="input" placeholder="Name"></input>

                    <input type="email" name="email" class="input" placeholder="Email Address"></input>

                    <input type="password" name="password" class="input" placeholder="Password"></input>

                    <input type="password" name="password" class="input" placeholder="Confirm password"></input>

                    <button type="submit">Create Account</button>

                    <p>Already Have An Account? <a href='#'>Sign In</a></p>

            </form>

        </div>
    )
}