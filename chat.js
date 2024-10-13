import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, ref, set, onChildAdded } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

const loc=document.getElementById("location");
const button=document.getElementById("button");
const time=document.getElementById("time");
document.addEventListener('DOMContentLoaded', () => {
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
    const postsRef = ref(database, 'posts');
    const postsDiv = document.getElementById('posts');
    const newPostInput = document.getElementById('newPost');
    const submitBtn = document.getElementById('submitBtn');

    // Function to auto-detect URLs and make them clickable
    function autoDetectUrls(text) {
        const urlPattern = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlPattern, '<a href="$1" target="_blank">$1</a>');
    }

    // Function to detect and style text with double and single quotes
    function styleQuotes(text) {
        const doubleQuotePattern = /"(.*?)"/g;
        const singleQuotePattern = /'(.*?)'/g;

        // Make double-quoted text bold
        text = text.replace(doubleQuotePattern, '<b>"$1"</b>');

        // Make single-quoted text light gray
        text = text.replace(singleQuotePattern, '<span class="light-text">\'$1\'</span>');

        return text;
    }

    // Function to process text (URLs and quotes)
    function processText(text) {
        text = autoDetectUrls(text);
        return styleQuotes(text);
    }

    // Function to display each post with content and timestamp
    function displayPost(postData) {
        const postElement = document.createElement('div');
        const content = processText(postData.content);
        const timestamp = new Date(postData.timestamp).toLocaleString(); // Format timestamp
        const username = postData.username || 'Anonymous'; // Retrieve username or fallback to 'Anonymous' if not available

        // Display username, content, and timestamp
        postElement.innerHTML = `<p>${username}:</p> <p>${content}</p><small>${timestamp}</small><br><br>`;
        
        postsDiv.appendChild(postElement);
    }


    // Fetch and display posts in real-time
    onChildAdded(postsRef, (snapshot) => {
        const post = snapshot.val();
        displayPost(post);  // Call displayPost function to add post to the page
    });

    // Submit a new post
    submitBtn.addEventListener('click', () => {
        const postContent = newPostInput.value;
        const username = sessionStorage.getItem('username');  // Get the stored username

        if (postContent.trim() !== '' && username) {
            const postId = 'postId_' + Date.now();  // Generate a unique ID for each post
            set(ref(database, 'posts/' + postId), {
                content: postContent,
                username: username,   // Include the username in the post data
                timestamp: Date.now()  // Store the current timestamp
            }).then(() => {
                console.log("Post submitted:", postContent);
            }).catch((error) => {
                console.error("Error submitting post:", error);
            });
            newPostInput.value = '';  // Clear the input field after submitting
        } else {
            console.warn("Input is empty or username is missing, not submitting.");
        }
    });

});

async function getloc(position) {
    const lat=position.coords.latitude;
    const lng=position.coords.longitude;
    const floc=await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
    const afterjson=await floc.json();
    const place=afterjson.display_name;
    loc.innerText=place;
}

function failloc(){
    loc.innerText='Please allow location permission to see your location';
}
button.addEventListener('click',()=>{
    navigator.geolocation.getCurrentPosition(getloc,failloc);
});

function getTime(){
    const date_time=new Date();
    const cur=`${date_time.getHours()}:${date_time.getMinutes()}:${date_time.getSeconds()}`
    time.innerText=cur;
}
setInterval(getTime,1000);