class ChatUI {
	constructor(list) {
		this.list = list;
	}

	clearChat() {
		this.list.innerHTML = '';
	}

	render(data) {
		// Convert date
		const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), { addSuffix: true });
		const html = `
            <li class='list-group-item'>
                <span class='username text-primary'>${data.username}</span>
                <span class='message'>${data.message}</span>
                <p class='text-muted time'>${when}</p>
            </li>
            `;

		this.list.innerHTML += html;
	}
}
