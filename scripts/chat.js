// Create a class that will store the chatroom data

class Chatroom {
	constructor(username, room) {
		this.username = username;
		this.room = room;
		this.chats = db.collection('chats');
		this.unsub;
	}

	async addChat(message) {
		const now = new Date();
		const data = {
			message,
			username: this.username,
			room: this.room,
			created_at: firebase.firestore.Timestamp.fromDate(now)
		};

		const response = await this.chats.add(data);
		return response;
	}

	// Create a Real-time listener
	getChats(callback) {
		this.unsub = this.chats
			.where('room', '==', this.room)
			.orderBy('created_at')
			.onSnapshot(snapshot => {
				snapshot.docChanges().forEach(change => {
					if (change.type === 'added') {
						callback(change.doc.data());
					}
				});
			});
	}

	// Change username
	updateUsername(username) {
		this.username = username;
		localStorage.setItem('username', username);
	}

	// Update Chatroom
	updateRoom(room) {
		this.room = room;
		if (this.unsub) {
			this.unsub();
		}
	}
}
