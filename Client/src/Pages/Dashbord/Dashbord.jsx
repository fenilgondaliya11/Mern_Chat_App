import React, { useState, useContext } from 'react';
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { IoMdSend, IoMdSettings, IoMdLogOut, IoMdAttach, IoMdVideocam, IoMdCall } from "react-icons/io";
import ScrollToBottom from 'react-scroll-to-bottom';
import logo from "../../images/logo.png";
import './Dashbord.css';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { BsFillChatSquareHeartFill } from "react-icons/bs";
import { ChatContext } from '../../context/ChatContext';
import  img  from '../../images/profile.png' 


const Dashbord = () => {

    const { user, logoutUser } = useContext(AuthContext);
    const { userChats,
            isUserChatsLoading,
            userChatsError,
            PotentialChats,
            allUsers,
        } = useContext(ChatContext);
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [activeChat, setActiveChat] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [attachedFile, setAttachedFile] = useState(null);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() || attachedFile) {
            const timestamp = new Date().toISOString();
            const message = { text: newMessage, sender: 'user', chatId: activeChat.id, timestamp };
            if (attachedFile) {
                message.attachment = attachedFile;
                setAttachedFile(null);
            }
            setMessages([...messages, message]);
            setNewMessage('');
        }
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const strMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${strMinutes} ${ampm}`;
    };

    const handleMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleFileAttach = (e) => {
        const file = e.target.files[0];
        setAttachedFile(file);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleChatSelect = (chat) => {
        setActiveChat(chat);
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const profile = () => {
        navigate('/profile');
    }

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <header className="bg-gray-700 text-white py-4 px-6 flex justify-between items-center">
                <div className="flex items-center">
                    <img src={logo} className="w-10 h-10 mr-2" alt="Logo" />
                    <h1 className="text-lg font-bold" style={{ fontsFamily: 'cursive' }}>ChatVista </h1>
                </div>

                <div className="flex items-center">
                    <FaUser className='me-1' />
                    <h2 className='text-white me-4'>{user.name}</h2>

                    <button
                        onClick={profile}
                        className="bg-teal-500 text-white px-2 py-2 rounded-md hover:bg-teal-600 focus:outline-none setting"
                        aria-label="Settings"
                    >
                        <IoMdSettings className="text-lg" />
                    </button>
                    <button className="bg-teal-500 text-white px-2 py-2 rounded-md hover:bg-teal-600 focus:outline-none ml-2 logout" aria-label="Logout"
                        onClick={logoutUser}
                    >
                        <IoMdLogOut className="text-lg" />
                    </button>
                </div>
            </header>

            {/* sidebar */}
            <div className="flex flex-grow overflow-hidden">
                {sidebarOpen && (
                    <div className="bg-gray-200 md:w-72 lg:w-80 p-4 flex-shrink-0 sidebar">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-lg">Messages </h3>
                            <GoSidebarCollapse className="text-gray-600 cursor-pointer text-lg" onClick={toggleSidebar} aria-label="Collapse Sidebar" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search chats..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="flex justify-between mb-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"><BsFillChatSquareHeartFill /></button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"><FaUserPlus /></button>
                        </div>
                        <hr className="border-gray-300 " />

                        {/* Chats name show scrollbar */}
                        <div className="h-screen overflow-y-auto mt-4"> 
                            {allUsers.map(chat => (
                                <div key={chat.id} className="bg-white rounded-lg shadow-md p-4 mb-3 cursor-pointer" onClick={() => handleChatSelect(chat)}>
                                    <div className="flex items-center mb-2">
                                        <img src={img} alt="Avatar" className="rounded-full mr-2 w-9" />
                                        <h4 className="font-bold">{chat.name}</h4>
                                    </div>
                                    <p>{chat.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                )}
                {!sidebarOpen && (
                    <div className="bg-gray-200 w-16 p-4 flex-shrink-0">
                        <GoSidebarExpand className="text-gray-600 cursor-pointer text-lg" onClick={toggleSidebar} aria-label="Expand Sidebar" />
                    </div>
                )}
                <div className={`flex-1 relative flex flex-col chats-content ${sidebarOpen && window.innerWidth < 768 ? 'hidden' : ''}`}>
                    {activeChat ? (
                        <>
                            <header className="p-4 border-b border-gray-300 flex items-center bg-white">
                                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3">
                                    <img src={img} alt="User Avatar" className="w-10 h-10 rounded-full" />
                                </div>
                                <h2 className="text-lg font-semibold">{activeChat.name}</h2>
                                <div className="flex items-center ml-auto">
                                    <button className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 icon-btn" aria-label="Video Call">
                                        <IoMdVideocam className="text-lg" />
                                    </button>
                                    <button className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 icon-btn" aria-label="Audio Call">
                                        <IoMdCall className="text-lg" />
                                    </button>
                                </div>
                            </header>

                            {/* chats */}
                            <ScrollToBottom className="p-4 overflow-y-auto flex-grow mb-5">
                                {messages.filter(msg => msg.chatId === activeChat.id).map((message, index) => (
                                    <div key={index} className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                                        <div className={`w-10 h-10 bg-gray-300 rounded-full mr-3 ${message.sender === 'user' ? 'order-2 ml-3' : 'mr-3'}`}>
                                            <img src={img || activeChat.avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
                                        </div>
                                        <div className={`max-w-xs rounded-lg h-full p-2 ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                            <p>{message.text}</p>
                                            {message.attachment && (
                                                <div>
                                                    Attached File: {message.attachment.name}
                                                </div>
                                            )}
                                            <div className="text-xs text-gray-400 mt-1 text-right">
                                                {formatTimestamp(message.timestamp)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </ScrollToBottom>

                            {/* input box */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-300 bg-white flex">
                                <label htmlFor="file-upload" className="mr-2 cursor-pointer">
                                    <IoMdAttach className="text-3xl mt-1 text-gray-400 hover:text-blue-500" />
                                    <input
                                        id="file-upload"
                                        type="file"
                                        onChange={handleFileAttach}
                                        className="hidden"
                                    />
                                </label>
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={handleMessageChange}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    className="flex-1 border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    aria-label="Send Message"
                                >
                                    <IoMdSend className="text-xl" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <h2 className="text-2xl font-bold">Welcome to ChatVista</h2>
                            <p className="text-gray-600">Select a chat to start messaging</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Dashbord;
