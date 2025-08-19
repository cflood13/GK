class Chatbot {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.isTyping = false;
        
        this.initializeElements();
        this.bindEvents();
        this.showInitialNotification();
    }
    
    initializeElements() {
        this.container = document.getElementById('chatbot-container');
        this.toggle = document.getElementById('chatbot-toggle');
        this.widget = document.getElementById('chatbot-widget');
        this.closeBtn = document.getElementById('chatbot-close');
        this.messages = document.getElementById('chatbot-messages');
        this.input = document.getElementById('chatbot-input');
        this.sendBtn = document.getElementById('chatbot-send');
        this.notification = this.toggle.querySelector('.chatbot-notification');
    }
    
    bindEvents() {
        this.toggle.addEventListener('click', () => this.toggleWidget());
        this.closeBtn.addEventListener('click', () => this.closeWidget());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        // Auto-resize input
        this.input.addEventListener('input', () => {
            this.input.style.height = 'auto';
            this.input.style.height = this.input.scrollHeight + 'px';
        });
    }
    
    showInitialNotification() {
        setTimeout(() => {
            this.notification.style.display = 'block';
            this.notification.classList.add('pulse');
        }, 3000);
    }
    
    toggleWidget() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.openWidget();
        } else {
            this.closeWidget();
        }
    }
    
    openWidget() {
        this.isOpen = true;
        this.widget.classList.add('open');
        this.toggle.classList.add('active');
        this.notification.style.display = 'none';
        this.input.focus();
    }
    
    closeWidget() {
        this.isOpen = false;
        this.widget.classList.remove('open');
        this.toggle.classList.remove('active');
    }
    
    async sendMessage() {
        const message = this.input.value.trim();
        if (!message || this.isTyping) return;
        
        // Add user message
        this.addMessage(message, 'user');
        this.input.value = '';
        this.input.style.height = 'auto';
        
        // Show typing indicator
        this.showTyping();
        
        try {
            const response = await fetch('/api/chatbot/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    conversationHistory: this.conversationHistory
                })
            });
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }
            
            // Update conversation history
            this.conversationHistory = data.conversationHistory;
            
            // Remove typing indicator and add bot response
            this.hideTyping();
            this.addMessage(data.response, 'bot', data.recommendations);
            
        } catch (error) {
            console.error('Chatbot error:', error);
            this.hideTyping();
            this.addMessage('Sorry, I\'m having trouble right now. Please call us at (512) 564-3679 for immediate assistance.', 'bot');
        }
    }
    
    addMessage(content, sender, recommendations = []) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        // Convert markdown-style links to HTML
        const htmlContent = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="chatbot-link">$1</a>');
        messageContent.innerHTML = htmlContent;
        
        messageDiv.appendChild(messageContent);
        
        // Add recommendations as buttons if present
        if (recommendations && recommendations.length > 0) {
            const recommendationsDiv = document.createElement('div');
            recommendationsDiv.className = 'message-recommendations';
            
            recommendations.forEach(rec => {
                const button = document.createElement('button');
                button.className = 'recommendation-btn';
                button.textContent = rec.text;
                button.addEventListener('click', () => {
                    window.location.href = rec.url;
                });
                recommendationsDiv.appendChild(button);
            });
            
            messageDiv.appendChild(recommendationsDiv);
        }
        
        this.messages.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Animate in
        setTimeout(() => messageDiv.classList.add('animate-in'), 50);
    }
    
    showTyping() {
        this.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-message';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        this.messages.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTyping() {
        this.isTyping = false;
        const typingMessage = this.messages.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }
    
    scrollToBottom() {
        this.messages.scrollTop = this.messages.scrollHeight;
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
}); 