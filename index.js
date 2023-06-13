const { WAConnection, MessageType } = require('@adiwajshing/baileys');

// Create a new connection
const conn = new WAConnection();

// Auto-reply message
const greetingMessage = 'Hello! Thank you for reaching out.';
const morningMessage = 'Good morning!';
const nightMessage = 'Good night!';

// Event handler for incoming messages
conn.on('chat-update', async (chat) => {
  if (chat.messages && chat.count) {
    const message = chat.messages.all()[0];
    if (!message.isGroup && !message.key.fromMe) {
      // Check if it's the first message in the chat
      if (message.key.fromMe && message.key.id === 1) {
        // Send greeting message
        await conn.sendMessage(message.key.remoteJID, greetingMessage, MessageType.text);
      } else {
        // Check the current time
        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        // Determine whether it's morning or night
        let autoReplyMessage = '';
        if (currentHour >= 6 && currentHour < 12) {
          autoReplyMessage = morningMessage;
        } else if (currentHour >= 20 || currentHour < 6) {
          autoReplyMessage = nightMessage;
        } else {
          autoReplyMessage = 'Thank you for your message! I am currently unavailable and will get back to you as soon as possible.';
        }

        // Send auto-reply message
        await conn.sendMessage(message.key.remoteJID, autoReplyMessage, MessageType.text);
      }
    }
  }
});

// Rest of the code...
