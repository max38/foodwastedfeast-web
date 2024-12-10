import React from 'react';
import './SpeechBubble.css';

interface SpeechBubbleProps {
    position?: 'left' | 'right';
    children: React.ReactNode;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ position, children }) => {
    if (!position) {
        position = 'left';
    }
    return (
        <div className={"speech-bubble bubble-" + position}>
            {children}
        </div>
    );
};

export default SpeechBubble;
