import React, { useEffect, useState } from 'react';
import Style from './NotFound.module.css';  // Assuming you're adding the CSS in the same file

export default function NotFound() {
  const [Counter, setCounter] = useState(0);

  useEffect(() => {
    console.log('NotFound component did mount');
  }, []);

  return (
    <div className={`${Style.notFoundPage}`}>
      <div className={`${Style.contentWrapper}`}>
        <h2 className={`${Style.heading}`}>Oops! Page Not Found</h2>
        <p className={`${Style.description}`}>
          We couldn't find the page you're looking for. Please check the URL or return to the homepage.
        </p>
        <button className={`${Style.homeButton}`} onClick={() => window.location.href = '/'}>Go to Homepage</button>
      </div>
    </div>
  );
}
