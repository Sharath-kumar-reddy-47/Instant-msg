
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDaya3CCviWxqqfzy1TvfbI_rZbSxws",
    authDomain: "instant-chat-4af7a.firebaseapp.com",
    databaseURL: "https://instant-chat-4af7a-default-rtdb.firebaseio.com/",
    projectId: "instant-chat-4af7a",
    storageBucket: "instant-chat-4af7a.appspot.com",
    messagingSenderId: "387329013608",
    appId: "1:387329013608:web:c3fa1de0b5c72b719488dd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Sign-in form event listener
document.getElementById('signinForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    // Reference to user data
    const userRef = ref(database, 'users/' + phone);

    // Fetch user data
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            
            // Check password
            if (userData.password === password) {
                // Store the user's name in sessionStorage
                sessionStorage.setItem('username', userData.name);
                
                // Redirect to chat page
                window.location.href = 'index_2.html'; 
            } else {
                displayError('Incorrect password.');
            }
        } else {
            displayError('User not found.');
        }
    }).catch((error) => {
        displayError('An error occurred during sign-in.');
        console.error("Sign-in error:", error);
    });
});

// Function to display error messages
function displayError(message) {
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.innerText = message;
}
