import React from 'react';
import App from './App';
import './styles.css'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} />
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// const names = [ 'Seung Kim', '승김']
// const typingText = document.getElementById("typing-text")

// let namesIndex = 0;
// let charIndex = 0; 
// let isDeleting = false; 
// const typingSpeed = 400; 
// const deletingSpeed = 400; 
// const pauseTime = 5000;

// function type() {
//     const currentName = names[namesIndex];
//     if(isDeleting) {
//         typingText.textContent = currentName.substring(0, charIndex--);
//     } else {
//         typingText.textContent = currentName.substring(0, charIndex++)
//     }

//     let delay = isDeleting ? deletingSpeed : typingSpeed;

//     if (!isDeleting && charIndex === currentName.length) {
//         delay - pauseTime;
//         isDeleting = true;
//     } else if (isDeleting && charIndex === 0) {
//         isDeleting = false;
//         namesIndex = (namesIndex + 1) % names.length;
//     }

//     setTimeout(type, delay);
// }

// type();
