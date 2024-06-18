    import React, { useState } from 'react';
// import ScrollToBottom from 'react-scroll-to-bottom';
// import { IoMdSend, IoMdSettings, IoMdLogOut, IoMdAttach, IoMdVideocam, IoMdCall } from "react-icons/io";
// import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
// import logo from "../../images/logo.png";
import './Dashbord.css';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import ChatWindow from '../../Components/ChatWindow';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Dashbord = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [activeChat, setActiveChat] = useState(null);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [attachedFile, setAttachedFile] = useState(null);

    const chatData = [
        { id: 1, name: 'Fenil Gondaliya', avatar: 'https://avatar.iran.liara.run/public/33', message: 'Hii' },
        { id: 2, name: 'Navaz Sherasiya', avatar: 'https://avatar.iran.liara.run/public/33', message: 'Hii' },
        { id: 3, name: 'Ronak Patel', avatar: 'https://avatar.iran.liara.run/public/33', message: 'Hii' },
        { id: 4, name: 'Prerit Patel', avatar: 'https://avatar.iran.liara.run/public/33', message: 'Hii' },
        { id: 5, name: 'Meet Tala', avatar: 'https://avatar.iran.liara.run/public/33', message: 'Hii' },
        { id: 6, name: 'Jigar Viranii', avatar: 'https://avatar.iran.liara.run/public/33', message: 'Hii' },
        { id: 7, name: 'Abhishak Sharma', avatar: 'https://avatar.iran.liara.run/public/33', message: 'Hii' },
        { id: 8, name: 'Vivek PAtel', avatar: 'https://avatar.iran.liara.run/public/33', message: 'Hii' },
        { id: 9, name: 'Virat Kohli', avatar: 'https://avatar.iran.liara.run/public/33', message: 'Hii' },
        { id: 10, name: 'Subhman Gil', avatar: 'https://avatar.iran.liara.run/public/33', message: 'Hii' },
    ];

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

    const filteredChats = chatData.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col h-screen">
            <Header settingsOpen={settingsOpen} toggleSettings={() => setSettingsOpen(!settingsOpen)} logoutUser={logoutUser} />

            <div className="flex flex-grow overflow-hidden">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    toggleSidebar={toggleSidebar}
                    searchQuery={searchQuery}
                    handleSearchChange={handleSearchChange}
                    filteredChats={filteredChats}
                    handleChatSelect={handleChatSelect}
                />

                {!sidebarOpen && (
                    <div className="bg-gray-200 w-16 p-4 flex-shrink-0">
                        <GoSidebarExpand className="text-gray-600 cursor-pointer text-lg" onClick={toggleSidebar} aria-label="Expand Sidebar" />
                    </div>
                )}

                <ChatWindow
                    activeChat={activeChat}
                    messages={messages}
                    newMessage={newMessage}
                    attachedFile={attachedFile}
                    formatTimestamp={formatTimestamp}
                    handleMessageChange={handleMessageChange}
                    handleFileAttach={handleFileAttach}
                    handleKeyPress={handleKeyPress}
                    handleSendMessage={handleSendMessage}
                />
            </div>
        </div>
    );
};

export default Dashbord;
