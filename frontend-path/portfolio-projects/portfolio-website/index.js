const names = [ 'Seung Kim', '승김']
const typingText = document.getElementById("typing-text")

let namesIndex = 0;
let charIndex = 0; 
let isDeleting = false; 
const typingSpeed = 400; 
const deletingSpeed = 400; 
const pauseTime = 5000;

function type() {
    const currentName = names[namesIndex];
    if(isDeleting) {
        typingText.textContent = currentName.substring(0, charIndex--);
    } else {
        typingText.textContent = currentName.substring(0, charIndex++)
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentName.length) {
        delay - pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        namesIndex = (namesIndex + 1) % names.length;
    }

    setTimeout(type, delay);
}

type();

