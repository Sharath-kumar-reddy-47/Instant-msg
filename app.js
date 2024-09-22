// Firebase configuration (use your own Firebase config details here)
const firebaseConfig = {
  apiKey: "AIzaSyDaya3CCviWxqqfzy1TvfbI_rZbSFeSxws",
  authDomain: "instant-chat-4af7a.firebaseapp.com",
  databaseURL: "https://instant-chat-4af7a-default-rtdb.firebaseio.com/",
  projectId: "instant-chat-4af7a",
  storageBucket: "instant-chat-4af7a.appspot.com",
  messagingSenderId: "387329013608",
  appId: "1:387329013608:web:c3fa1de0b5c72b719488dd",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Reference to the 'posts' section in the Firebase Database
const postsRef = database.ref('posts');

// Get DOM elements
const postsDiv = document.getElementById('posts');
const newPostInput = document.getElementById('newPost');
const submitBtn = document.getElementById('submitBtn');

// Fetch and display posts in real-time
postsRef.on('child_added', (snapshot) => {
    const post = snapshot.val();
    const postElement = document.createElement('div');
    postElement.textContent = post.content;
    postsDiv.appendChild(postElement);
});

// Submit a new post
submitBtn.addEventListener('click', () => {
    const postContent = newPostInput.value;
    if (postContent.trim() !== '') {
        postsRef.push({
            content: postContent,
            timestamp: Date.now()
        }).then(() => {
            console.log("Post submitted:", postContent);
        }).catch((error) => {
            console.error("Error submitting post:", error);
        });
        newPostInput.value = ''; // Clear the input field
    }
});

