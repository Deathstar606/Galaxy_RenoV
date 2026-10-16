import React from "react";
import { render } from "@react-email/render";

const Email = ({ name, message, imageUrl }) => {
  return (
    <div style={{ backgroundColor: "rgb(255, 193, 0)", padding: '20px', borderRadius: '5px' }}>
      <h1 style={{ textAlign: 'center', padding: '10px' }}>Hello, {name}</h1>
      <h3 style={{ textAlign: 'center', padding: '10px' }}>{message}</h3>
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt="Uploaded Preview" 
          style={{ display: 'block', margin: '20px auto', maxWidth: '100%', maxHeight: "400px" }} 
        />
      )}
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <a 
          href="https://youtu.be/dQw4w9WgXcQ?si=zfjDpzT7HAfDG8Ev" 
          style={{ 
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: 'black',
            color: 'yellow',
            textDecoration: 'none',
            borderRadius: '0px',
            cursor: 'pointer'
          }}
        >
          Press At Own Risk
        </a>
      </div>
    </div>
  );
};

export const generateEmailHtml = (name, message, imageUrl) => {
  return render(<Email name={name} message={message} imageUrl={imageUrl} />);
};

export default Email;
