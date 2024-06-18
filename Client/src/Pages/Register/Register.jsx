import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo from '../../images/logo.png';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
    const {
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        updateRegisterError,
        isRegisterLoading,
    } = useContext(AuthContext);

    useEffect(() => {
        if (registerError?.error) {
            toast.error(registerError.message);
            updateRegisterError(null);

        }
    }, [registerError, updateRegisterError]);



    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div>
                        <img src={logo} className="w-32 mx-auto" alt="" />
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">ChatVista</h1>
                        <form className="w-full mt-8" onSubmit={registerUser}>
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="Name"
                                onChange={(e) =>
                                    updateRegisterInfo({
                                        ...registerInfo,
                                        name: e.target.value,
                                    })
                                }
                            />
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="Email"
                                onChange={(e) =>
                                    updateRegisterInfo({
                                        ...registerInfo,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                placeholder="Password"
                                onChange={(e) =>
                                    updateRegisterInfo({
                                        ...registerInfo,
                                        password: e.target.value,
                                    })
                                }
                            />
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                placeholder="Confirm Password"
                                onChange={(e) =>
                                    updateRegisterInfo({
                                        ...registerInfo,
                                        confirmPassword: e.target.value,
                                    })
                                }
                            />
                            <button
                                type="submit"
                                className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none"
                                disabled={isRegisterLoading}
                            >
                                {isRegisterLoading ? 'Creating your account...' : 'Register'}

                            </button>

                        </form>
                        <p className="mt-6 text-xs text-gray-600 text-center">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-700">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')`,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Register;
