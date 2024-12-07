import React from 'react';

const PledgeWall = ({ src, width = "100%", height = "500px", title = "Iframe", style = {} }: { src: string, width?: string, height?: string, title?: string, style?: React.CSSProperties }) => {
  return (
    <iframe
      src={src}
      title={title}
      width={width}
      height={height}
      style={{
        border: 'none',
        ...style, // Allow custom inline styles to be passed
      }}
    />
  );
};

export default PledgeWall;
