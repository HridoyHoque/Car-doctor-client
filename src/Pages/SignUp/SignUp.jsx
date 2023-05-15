import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';


const SignUp = () => {
    const {createUser} = useContext(AuthContext)
    const handleSignUp = (event) => {
        event.preventDefault()
        console.log('aitaseeee')
        const form = event.target;
        const name = form.name.value;
        const email  = form.email.value;
        const password = form.password.value;
        console.log(name, email, password)
        createUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
        })
        .catch(error => console.log(error))

        form.reset()

    }
    return (
        <div className="hero min-h-screen bg-base-200 mb-5">
        <div className="hero-content flex-col lg:flex-row">
            <div className="mr-20">

                <img src={img} alt="" />
            </div>
            <div className="card flex-shrink-0 w-1/2 max-w-sm shadow-2xl bg-base-100 ml-12s">
                <form onSubmit={handleSignUp}>
                    <div className="card-body">
                    <h1 className="text-5xl font-bold">Sign Up</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Your Name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="text" name='password' placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">

                            <input className="btn btn-primary" type="submit" value="Sign UP" />
                        </div>
                    </div>
                </form>
                <p className='text-center mb-5'>Already Have an account?<Link to='/login' className='text-orange-500 font-bold'> Log in</Link></p>
            </div>
        </div>
    </div>
    );
};

export default SignUp;