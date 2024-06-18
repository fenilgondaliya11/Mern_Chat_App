import React from 'react';
import { GoSidebarCollapse } from 'react-icons/go';

const Sidebar = ({ sidebarOpen, toggleSidebar, searchQuery, handleSearchChange, filteredChats, handleChatSelect }) => {
    return (
        <div className={`bg-gray-200 md:w-72 lg:w-80 p-4 flex-shrink-0 sidebar ${sidebarOpen ? '' : 'hidden'}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Messages</h3>
                <GoSidebarCollapse
                    className="text-gray-600 cursor-pointer text-lg"
                    onClick={toggleSidebar}
                    aria-label="Collapse Sidebar"
                />
            </div>
            <input
                type="text"
                placeholder="Search chats..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            

            {/* Chats name show scrollbar */}
            <div className="h-screen overflow-y-auto mt-4">
                {filteredChats.map(chat => (
                    <div key={chat.id} className="bg-white rounded-lg shadow-md p-4 mb-3 cursor-pointer" onClick={() => handleChatSelect(chat)}>
                        <div className="flex items-center mb-2">
                            <img src={chat.avatar} alt="Avatar" className="rounded-full mr-2 w-9" />
                            <h4 className="font-bold">{chat.name}</h4>
                        </div>
                        <p>{chat.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
