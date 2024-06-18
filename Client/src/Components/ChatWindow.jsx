import React from 'react';
import { IoMdAttach, IoMdSend, IoMdVideocam, IoMdCall } from 'react-icons/io';
import ScrollToBottom from 'react-scroll-to-bottom';


const ChatWindow = ({ activeChat, messages, newMessage, attachedFile, formatTimestamp, handleMessageChange, handleFileAttach, handleKeyPress, handleSendMessage }) => {
    return (
        <div className="flex-1 relative flex flex-col chats-content">
            {activeChat ? (
                <>
                    <header className="p-4 border-b border-gray-300 flex items-center bg-white">
                        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3">
                            <img src={activeChat.avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
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
                                    <img src={message.avatar || activeChat.avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
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
    );
};

export default ChatWindow;
