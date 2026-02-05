import './Signup.css'

export default function Signup() {
    return (
        <div>

            <div class="nav-bar">

                <ul>
                    <li><a id='sign-in' href='#'>Sign In</a></li>
                    <li><a id='create-mealtrain' href='#'>Create a Mealtrain</a></li>
                </ul>
            </div>

            <form>

                    <h1 id='create-account'>Create An Account</h1>

                    <label id='name' for='name'>Name</label>
                    <input type="name" name="name" class="input" placeholder="Name"></input>

                    <label id='email' for='email'>Email Address</label>
                    <input type="email" name="email" class="input" placeholder="Email Address"></input>

                    <label id='password' for='password'>Password</label>
                    <input type="password" name="password" class="input" placeholder="Password"></input>

                    <label id='confirm-password' for='confirm-password'>Confirm Password</label>
                    <input type="password" name="password" class="input" placeholder="Confirm Password"></input>

                    <button type="submit">Create Account</button>

                    <p>Already Have An Account? <a href='#'>Sign In</a></p>

            </form>

            <div id='rectangle-left'></div>
            <div id='rectangle-right'></div>

        </div>
    )
}