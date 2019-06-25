// DOM queries
const chatList = document.querySelector('.chat-list');
const newChat = document.querySelector('.new-chat');
const newName = document.querySelector('.new-name');
const alert = document.querySelector('.alert');
const rooms = document.querySelector('.chat-rooms');

// Add a new chat
newChat.addEventListener('submit', event => {
	event.preventDefault();
	const message = newChat.message.value.trim();
	chatroom
		.addChat(message)
		.then(() => {
			newChat.reset();
		})
		.catch(err => {
			console.log(err);
		});
});

// Change room
rooms.addEventListener('click', event => {
	console.log(event);
	if ((event.target.tagName = 'BUTTON')) {
		chatUI.clearChat();
		const currentRoom = document.querySelector('.active');
		console.log(currentRoom);
		currentRoom.classList.remove('active');
		chatroom.updateRoom(event.target.getAttribute('id'));
		event.target.classList.add('active');
		chatroom.getChats(chat => {
			chatUI.render(chat);
		});
		console.log('Room is updated');
	}
});

// Update username
newName.addEventListener('submit', event => {
	event.preventDefault();
	const updatedName = newName.name.value.trim();
	chatroom.updateUsername(updatedName);
	newName.reset();

	// Display Alert
	alert.classList.add('alert-success');
	alert.innerText = `Your name was successfully updated to ${updatedName}`;
	setTimeout(() => {
		alert.classList.remove('alert-success');
		alert.innerText = '';
	}, 3000);
});

// Check local storage for a name
const username = localStorage.username ? localStorage.username : 'anon';

// Class Instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom(username, 'general');

// Get chats and render
chatroom.getChats(data => {
	chatUI.render(data);
});
