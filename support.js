document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');
    const attachBtn = document.getElementById('attachBtn');
    const fileInput = document.getElementById('fileInput');
    const typingIndicator = document.getElementById('typingIndicator');

    // Function to add a message to the chat
    function addMessage(content, sender, type = 'text') {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `message--${sender}`);
        
        let messageContent = '';
        if (type === 'text') {
            messageContent = `<p>${content}</p>`;
        } else if (type === 'image') {
            messageContent = `<img src="${content}" alt="تصویر پیوست شده" class="attached-image">`;
        } else if (type === 'file') {
            messageContent = `<div class="attached-file"><i class="ph-bold ph-file-archive"></i><span>${content}</span></div>`;
        }

        const time = new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
        const readReceipt = sender === 'user' ? `<i class="ph-bold ph-check-double message-read-receipt"></i>` : '';
        
        messageDiv.innerHTML = `${messageContent}<span class="message-time">${time} ${readReceipt}</span>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to bottom
    }

    // Function to simulate support reply
    function simulateSupportReply() {
        if (typingIndicator) typingIndicator.style.display = 'flex';
        setTimeout(() => {
            if (typingIndicator) typingIndicator.style.display = 'none';
            addMessage('پیام شما دریافت شد. لطفاً منتظر بمانید، اپراتورهای ما به زودی پاسخ خواهند داد.', 'support');
        }, 2500); // 2.5 second delay
    }

    // Handle form submission for text messages
    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const messageText = messageInput.value.trim();
            if (messageText) {
                addMessage(messageText, 'user', 'text');
                messageInput.value = '';
                simulateSupportReply();
            }
        });
    }

    // Trigger file input when attach button is clicked
    if (attachBtn) {
        attachBtn.addEventListener('click', () => {
            if (fileInput) fileInput.click();
        });
    }

    // Handle file selection
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const files = e.target.files;
            if (!files.length) return;

            for (const file of files) {
                if (file.type.startsWith('image/')) {
                    // It's an image, create a preview
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        addMessage(event.target.result, 'user', 'image');
                    }
                    reader.readAsDataURL(file);
                } else {
                    // It's another type of file
                    addMessage(file.name, 'user', 'file');
                }
            }
            simulateSupportReply();
            // Clear the file input for next selection
            e.target.value = null;
        });
    }

});