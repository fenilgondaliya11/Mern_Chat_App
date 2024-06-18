import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import logo from "../../images/logo.png";

const Profile = () => {
    const {
        user,
        profileInfo,
        updateProfileInfo,
        updateUserProfile,
        profileError,
        updateProfileError,
        isUpdateProfileLoading,
    } = useContext(AuthContext);

    useEffect(() => {
        updateProfileInfo({
            ...profileInfo,
            name: user.name,
            email: user.email,
        });
    }, [user, updateProfileError]);

    useEffect(() => {
        if (profileError?.error) {
            toast.error(profileError.message);
            updateProfileError(null);
        }
    }, [profileError]);

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-auto w-32" src={logo} alt="Workflow" />
                    <h2 className="mt-2 text-center text-3xl leading-9 font-extrabold text-gray-900">
                        Profile
                    </h2>
                   
                </div>

                <div className="mt-y sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-1" onSubmit={updateUserProfile}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium leading-6"
                            >
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={profileInfo.name}
                                    required
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    onChange={(e) =>
                                        updateProfileInfo({
                                            ...profileInfo,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={profileInfo.email}
                                    autoComplete="email"
                                    required
                                    readOnly
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    onChange={(e) =>
                                        updateProfileInfo({
                                            ...profileInfo,
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium leading-6"
                                >
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    onChange={(e) =>
                                        updateProfileInfo({
                                            ...profileInfo,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none"
                                disabled={isUpdateProfileLoading}
                            >
                                {isUpdateProfileLoading ? "Updating your profile..." : "Update"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Profile;
