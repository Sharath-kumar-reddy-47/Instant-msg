
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

const firebaseConfig = {
        apiKey: "AIzaSyDaya3CCviWxqqfzy1TvfbI_rZbSxws",
        authDomain: "instant-chat-4af7a.firebaseapp.com",
        databaseURL: "https://instant-chat-4af7a-default-rtdb.firebaseio.com/",
        projectId: "instant-chat-4af7a",
        storageBucket: "instant-chat-4af7a.appspot.com",
        messagingSenderId: "387329013608",
        appId: "1:387329013608:web:c3fa1de0b5c72b719488dd",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const college = document.getElementById('college').value;
    const department = document.getElementById('department').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    set(ref(database, 'users/' + phone), {
        name: name,
        age: age,
        college_name: college,
        department: department,
        password: password,
        status: "approved"
    }).then(() => {
        alert('Sign-up successful! Redirecting to sign-in...');
        window.location.href = 'index.html'; // Redirect to sign-in page
    }).catch((error) => {
        console.error("Sign-up error:", error);
        alert("An error occurred. Please try again.");
    });
});