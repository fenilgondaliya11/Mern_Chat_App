import React from 'react';
import { AuthContext } from '../../context/AuthContext';

const SettingsModal = ({ onClose }) => {
    const {
        user,
        isAuthLoading,
    } = React.useContext(AuthContext);
    
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-lg font-semibold mb-4">Profile Setting</h2>
               
                {isAuthLoading && (
                    <div className="mt-4">
                        <div className="lds-dual-ring">Loading..</div>
                    </div>
                )}

                <div className='mt-4    '>
                    <h3 className="text-lg font-semibold mb-4">Name</h3>
                    <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Name"/>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-blue-500 mt-4 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
