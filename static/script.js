document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const micButton = document.getElementById('micButton');
    const chatMessages = document.getElementById('chatMessages');
    const languageSelect = document.getElementById('languageSelect');
    const voiceToggle = document.getElementById('voiceToggle');
    const newChatBtn = document.getElementById('newChatBtn');
    const todayChats = document.getElementById('todayChats');
    const yesterdayChats = document.getElementById('yesterdayChats');
    const weekChats = document.getElementById('weekChats');
    const imageUpload = document.getElementById('imageUpload');
    const imagePreviewModal = document.getElementById('imagePreviewModal');
    const imagePreview = document.getElementById('imagePreview');
    const imageOverlay = document.getElementById('imageOverlay');
    const closePreviewBtn = document.getElementById('closePreviewBtn');
    const cancelImageBtn = document.getElementById('cancelImageBtn');
    const sendImageBtn = document.getElementById('sendImageBtn');
    const settingsModal = document.getElementById('settingsModal');

    // Current chat tracking
    let currentChat = null;

    // Speech Recognition Setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    // Text-to-Speech Setup
    const speechSynthesis = window.speechSynthesis;
    let isRecording = false;

    // Chat History
    let chatHistory = {
        today: [],
        yesterday: [],
        week: []
    };

    // Add debounce function to prevent multiple rapid submissions
    let isProcessing = false;

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Load chat history from localStorage
    function loadChatHistory() {
        const savedHistory = localStorage.getItem('chatHistory');
        if (savedHistory) {
            chatHistory = JSON.parse(savedHistory);
            updateAllHistorySections();
        }
    }

    // Save chat history to localStorage
    function saveChatHistory() {
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }

    // Create a new chat history item
    function createHistoryItem(chat) {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <i class="fas fa-message"></i>
            <div class="chat-title">${chat.title.substring(0, 30)}${chat.title.length > 30 ? '...' : ''}</div>
        `;
        historyItem.addEventListener('click', () => {
            loadConversation(chat);
        });
        return historyItem;
    }

    // Load a conversation from history
    function loadConversation(chat) {
        chatMessages.innerHTML = '';
        chat.messages.forEach(msg => {
            addMessage(msg.text, msg.sender, false);
        });
        messageInput.value = '';
    }

    // Update all history sections
    function updateAllHistorySections() {
        todayChats.innerHTML = '';
        yesterdayChats.innerHTML = '';
        weekChats.innerHTML = '';

        chatHistory.today.forEach(chat => {
            todayChats.appendChild(createHistoryItem(chat));
        });

        chatHistory.yesterday.forEach(chat => {
            yesterdayChats.appendChild(createHistoryItem(chat));
        });

        chatHistory.week.forEach(chat => {
            weekChats.appendChild(createHistoryItem(chat));
        });
    }

    // Add chat to history
    function addToHistory(message, isNewChat = false) {
        const now = new Date();
        
        // If it's a new chat or there's no current chat, create a new chat entry
        if (isNewChat || !currentChat) {
            currentChat = {
                title: message,
                timestamp: now.toISOString(),
                date: now.toLocaleDateString(),
                messages: []
            };
        }

        // Add the message to the current chat
        currentChat.messages.push({
            text: message,
            sender: 'user',
            timestamp: now.toISOString()
        });

        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);

        // Update the appropriate history section
        if (isNewChat || !chatHistory.today.includes(currentChat)) {
            if (now.toLocaleDateString() === today.toLocaleDateString()) {
                chatHistory.today.unshift(currentChat);
            } else if (now.toLocaleDateString() === yesterday.toLocaleDateString()) {
                chatHistory.yesterday.unshift(currentChat);
            } else if (now > lastWeek) {
                chatHistory.week.unshift(currentChat);
            }
        }

        // Limit the number of chats in each section
        const MAX_CHATS_PER_SECTION = 10;
        chatHistory.today = chatHistory.today.slice(0, MAX_CHATS_PER_SECTION);
        chatHistory.yesterday = chatHistory.yesterday.slice(0, MAX_CHATS_PER_SECTION);
        chatHistory.week = chatHistory.week.slice(0, MAX_CHATS_PER_SECTION);

        saveChatHistory();
        updateAllHistorySections();
    }

    // Handle new chat button
    newChatBtn.addEventListener('click', () => {
        chatMessages.innerHTML = '';
        messageInput.value = '';
        currentChat = null;
        addMessage("Welcome! I'm your E-Waste Management Assistant. How can I help you today?", 'bot');
    });

    // Load supported languages
    fetch('/api/languages')
        .then(response => response.json())
        .then(data => {
            Object.entries(data.languages).forEach(([code, name]) => {
                const option = document.createElement('option');
                option.value = code;
                option.textContent = name;
                if (code === data.current_language) {
                    option.selected = true;
                }
                languageSelect.appendChild(option);
            });
        });

    // Add welcome message
    addMessage("Welcome! I'm your E-Waste Management Assistant. How can I help you today?", 'bot');

    // Handle language change
    languageSelect.addEventListener('change', (e) => {
        const message = `set language ${e.target.value}`;
        sendMessage(message);
        recognition.lang = e.target.value;
    });

    // Handle microphone button click
    micButton.addEventListener('click', toggleRecording);

    // Handle send button click with debounce
    sendButton.addEventListener('click', () => {
        sendUserMessage();
    });

    // Handle enter key press with debounce
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendUserMessage();
        }
    });

    // Speech Recognition Event Handlers
    recognition.onstart = () => {
        isRecording = true;
        micButton.classList.add('recording');
    };

    recognition.onend = () => {
        isRecording = false;
        micButton.classList.remove('recording');
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        messageInput.value = transcript;
        sendUserMessage();
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        isRecording = false;
        micButton.classList.remove('recording');
    };

    function toggleRecording() {
        if (!isRecording) {
            recognition.start();
        } else {
            recognition.stop();
        }
    }

    function sendUserMessage() {
        const message = messageInput.value.trim();
        if (message && !isProcessing) {
            isProcessing = true;
            addMessage(message, 'user');
            messageInput.value = ''; // Clear input immediately
            messageInput.focus(); // Keep focus on input for next message
            sendMessage(message);
        }
    }

    // Enhanced message animation
    function addMessage(text, sender, shouldSave = true) {
        console.log('Adding message:', { text, sender, shouldSave });
        
        if (!text && !sender) {
            console.log('Invalid message data, not adding');
            return;
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.style.opacity = '0';
        
        // Handle image response type
        if (typeof text === 'object' && text.type === 'image_response') {
            const imagesHtml = text.images.map(img => `
                <div class="mb-4">
                    <img src="${img.data}" class="max-h-48 rounded shadow-sm" alt="${img.caption}">
                    <p class="mt-2 text-sm text-gray-600">${img.caption}</p>
                </div>
            `).join('');
            
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="grid grid-cols-1 gap-4">
                        ${imagesHtml}
                    </div>
                </div>
            `;
        } else {
            // Regular text message
            const sanitizedText = String(text).replace(/</g, '&lt;').replace(/>/g, '&gt;');
            const formattedText = sanitizedText.replace(/\n/g, '<br>');
            
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-text">${formattedText}</div>
                </div>
            `;
        }
        
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.appendChild(messageDiv);
            // Trigger reflow
            messageDiv.offsetHeight;
            // Add animation
            messageDiv.style.transition = 'opacity 0.3s ease-out';
            messageDiv.style.opacity = '1';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } else {
            console.error('Chat messages container not found');
        }

        if (shouldSave && currentChat) {
            currentChat.messages.push({
                text: text,
                sender: sender,
                timestamp: new Date().toISOString()
            });
            saveChatHistory();
        }

        if (sender === 'bot' && voiceToggle.checked && typeof text === 'string') {
            speakText(text);
        }
    }

    function speakText(text) {
        // Cancel any ongoing speech
        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = languageSelect.value;
        speechSynthesis.speak(utterance);
    }

    // Enhanced typing indicator
    function addTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator bot-message';
        indicator.style.opacity = '0';
        indicator.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatMessages.appendChild(indicator);
        // Trigger reflow
        indicator.offsetHeight;
        // Add animation
        indicator.style.transition = 'opacity 0.3s ease-out';
        indicator.style.opacity = '1';
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return indicator;
    }

    function removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator.bot-message');
        if (typingIndicator) {
            typingIndicator.style.opacity = '0';
            setTimeout(() => {
                typingIndicator.remove();
            }, 300);
        }
    }

    // Smooth scroll to bottom
    function smoothScrollToBottom() {
        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: 'smooth'
        });
    }

    // Enhanced settings modal
    function showSettingsModal() {
        settingsModal.classList.remove('hidden');
        settingsModal.classList.add('flex');
        settingsModal.style.opacity = '0';
        // Trigger reflow
        settingsModal.offsetHeight;
        settingsModal.style.transition = 'opacity 0.3s ease-out';
        settingsModal.style.opacity = '1';
    }

    function hideSettingsModal() {
        settingsModal.style.opacity = '0';
        setTimeout(() => {
            settingsModal.classList.add('hidden');
            settingsModal.classList.remove('flex');
        }, 300);
    }

    // Loading skeleton
    function showSkeletonLoading() {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton rounded-lg h-12 w-3/4 mb-4';
        chatMessages.appendChild(skeleton);
        return skeleton;
    }

    // Enhanced send message function
    async function sendMessage(message) {
        if (!message || !message.trim()) {
            console.log('Empty message, not sending');
            isProcessing = false;
            return;
        }
        
        console.log('Sending message:', message);
        
        // Show typing indicator
        const typingIndicator = addTypingIndicator();
        
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    message: message,
                    chat_id: currentChat ? currentChat.id : null
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Received response:', data);
            
            // Remove typing indicator
            removeTypingIndicator();
            
            // Add bot response
            if (data.error) {
                addMessage(`Error: ${data.error}`, 'bot');
            } else if (data.response) {
                addMessage(data.response, 'bot');
            } else {
                addMessage('Sorry, I did not understand that. Please try again.', 'bot');
            }
            
            // Save to chat history
            if (!currentChat) {
                currentChat = {
                    id: Date.now().toString(),
                    title: message.substring(0, 30) + (message.length > 30 ? '...' : ''),
                    messages: []
                };
                addToHistory(message, true);
            }
            
        } catch (error) {
            console.error('Error:', error);
            removeTypingIndicator();
            addMessage('Sorry, there was an error processing your request. Please try again.', 'bot');
        } finally {
            isProcessing = false;
        }
    }

    // Image Upload Handling
    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file');
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreviewModal.classList.remove('hidden');
                imagePreviewModal.classList.add('flex');
            };
            reader.readAsDataURL(file);
        }
    });

    // Close image preview modal
    function closeImagePreview() {
        imagePreviewModal.classList.remove('flex');
        imagePreviewModal.classList.add('hidden');
        imageUpload.value = '';
    }

    closePreviewBtn.addEventListener('click', closeImagePreview);
    cancelImageBtn.addEventListener('click', closeImagePreview);

    // Handle image analysis
    sendImageBtn.addEventListener('click', async () => {
        const file = imageUpload.files[0];
        if (!file) return;

        // Show loading overlay
        imageOverlay.classList.remove('hidden');

        // Create FormData and append file
        const formData = new FormData();
        formData.append('image', file);

        try {
            // Send image for analysis
            const response = await fetch('/api/analyze-image', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            // Create a blob URL for the image
            const imageUrl = URL.createObjectURL(file);

            // Add the image and result to chat
            if (result.success) {
                // Add user's image message
                const imageMessage = document.createElement('div');
                imageMessage.className = 'message user-message';
                imageMessage.innerHTML = `
                    <div class="message-content">
                        <div class="mb-2">
                            <img src="${imageUrl}" class="max-h-48 rounded shadow-sm" alt="Uploaded e-waste">
                        </div>
                    </div>
                `;
                chatMessages.appendChild(imageMessage);

                // Add bot's response with the analysis
                const botMessage = document.createElement('div');
                botMessage.className = 'message bot-message';
                botMessage.innerHTML = `
                    <div class="message-content">
                        <div class="message-text">
                            <p class="mb-2"><strong>Analysis Result:</strong></p>
                            <p class="mb-2">This appears to be <strong>${result.class}</strong> e-waste.</p>
                            <p class="mb-2"><strong>Disposal Guidelines:</strong></p>
                            <p>${result.guidelines}</p>
                        </div>
                    </div>
                `;
                chatMessages.appendChild(botMessage);

                // Save to chat history
                if (currentChat) {
                    currentChat.messages.push(
                        {
                            text: 'Uploaded an image for analysis',
                            sender: 'user',
                            timestamp: new Date().toISOString(),
                            imageUrl: imageUrl
                        },
                        {
                            text: `Analysis Result:\nThis appears to be ${result.class} e-waste.\n\nDisposal Guidelines:\n${result.guidelines}`,
                            sender: 'bot',
                            timestamp: new Date().toISOString()
                        }
                    );
                    saveChatHistory();
                }
            } else {
                addMessage("I'm sorry, I couldn't analyze that image. Please try again with a clearer image of e-waste.", 'bot');
            }
        } catch (error) {
            console.error('Error analyzing image:', error);
            addMessage("Sorry, there was an error analyzing the image. Please try again.", 'bot');
        } finally {
            // Hide loading overlay and close modal
            imageOverlay.classList.add('hidden');
            closeImagePreview();
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Clean up the blob URL after a delay to ensure the image has loaded
            setTimeout(() => URL.revokeObjectURL(imageUrl), 5000);
        }
    });

    // Initialize
    loadChatHistory();
    messageInput.focus();
}); 