import React, { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

export const PledgeWall = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  interface CustomSocket extends Socket {
    auth: {
      serverOffset: number;
    };
  }
  
  const socket = useRef<CustomSocket | null>(null);
  const counter = useRef(0);

  useEffect(() => {
    // Initialize the socket connection
    socket.current = io('http://lab-1.aigts.co:32044', {
      auth: {
      serverOffset: 0,
      },
      ackTimeout: 10000,
      retries: 3,
    }) as CustomSocket;

    // Listen for incoming messages
    socket.current?.on('chat message', (msg, serverOffset) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      if (socket.current) {
        socket.current.auth.serverOffset = serverOffset;
      }
    });

    return () => {
      // Cleanup the socket connection on component unmount
      socket.current?.disconnect();
    };
  }, []);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (inputValue) {
      if (socket.current) {
        const clientOffset = `${socket.current.id}-${counter.current++}`;
        socket.current.emit('chat message', inputValue, clientOffset);
      }
      setInputValue('');
    }
  };

  return (
    <div style={{ margin: 0, paddingBottom: '3rem', fontSize: '20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
        {messages.map((msg, index) => (
          <li
            key={index}
            style={{
              padding: '0.5rem 1rem',
              background: index % 2 === 0 ? '#DEEFC8' : '#FBFFF5',
            }}
          >
            {msg}
          </li>
        ))}
      </ul>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#DEEFC8',
          padding: '0.25rem',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          height: '4rem',
          boxSizing: 'border-box',
          backdropFilter: 'blur(10px)',
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            border: 'none',
            padding: '0 1rem',
            fontSize: '20px',
            flexGrow: 1,
            borderRadius: '1rem',
            margin: '0.25rem',
          }}
          autoComplete="off"
        />
        <button
          type="submit"
          style={{
            background: '#385a42',
            fontSize: '20px',
            border: 'none',
            padding: '0 1rem',
            margin: '0.25rem',
            borderRadius: '1rem',
            outline: 'none',
            color: '#fff',
          }}
        >
          ปฏิญาณ
        </button>
      </form>
    </div>
  );
};

