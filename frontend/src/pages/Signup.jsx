export default function Signup() {
    return (
        <form>

            <div>

                <h1>Create An Account</h1>

                <input type="name" name="name" placeholder="Name"></input>

                <input type="email" name="email" placeholder="Email Address"></input>

                <input type="password" name="password" placeholder="Password"></input>

                <input type="password" name="password" placeholder="Confirm password"></input>

                <button type="submit">Create Account</button>

            </div>
        </form>
    )
}