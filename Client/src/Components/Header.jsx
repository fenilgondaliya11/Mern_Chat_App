import React from 'react';
import { IoMdSettings, IoMdLogOut } from 'react-icons/io';
import logo from '../images/logo.png';

const Header = ({ settingsOpen, toggleSettings, logoutUser }) => {
    return (
        <header className="bg-gray-700 text-white py-4 px-6 flex justify-between items-center">
            <div className="flex items-center">
                <img src={logo} className="w-10 h-10 mr-2" alt="Logo" />
                <h1 className="text-lg font-bold">ChatVista</h1>
            </div>

            <div className="flex items-center">
                <button
                    onClick={toggleSettings}
                    className="bg-teal-500 text-white px-2 py-2 rounded-md hover:bg-teal-600 focus:outline-none setting"
                    aria-label="Settings"
                >
                    <IoMdSettings className="text-lg" />
                </button>
                <button
                    className="bg-teal-500 text-white px-2 py-2 rounded-md hover:bg-teal-600 focus:outline-none ml-2 logout"
                    aria-label="Logout"
                    onClick={logoutUser}
                >
                    <IoMdLogOut className="text-lg" />
                </button>
            </div>
        </header>
    );
};

export default Header;
