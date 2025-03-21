import * as signalR from "@microsoft/signalr";

const API_BASE_URL = "https://localhost:7216"; // Replace with your backend URL

class SignalRService {
  constructor() {
    this.connection = null;
  }

  /** ✅ Initialize SignalR connection */
  async initialize() {
    const token = localStorage.getItem("messengerAuth"); // Ensure token is retrieved properly
    console.log("🔑 Access Token (before connecting):", token);

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_BASE_URL}/chathub`, {
        accessTokenFactory: () => {
          const token = localStorage.getItem("messengerAuth"); // Retrieve token for each connection attempt
          console.log("🔑 Token being sent:", token);
          return token; // Pass token to SignalR server
        },
        transport: signalR.HttpTransportType.WebSockets, // Force WebSockets
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000]) // Retry delays: 0s, 2s, 5s, 10s
      .configureLogging(signalR.LogLevel.Information) // Enable logging for debugging
      .build();

    this.setupConnectionEvents(); // Attach event handlers
  }

  /** ✅ Start the SignalR connection */
  async start() {
    if (!this.connection) await this.initialize(); // Ensure initialization

    if (this.connection.state === signalR.HubConnectionState.Connected) {
      console.log("⚠️ SignalR is already connected.");
      return;
    }

    try {
      await this.connection.start();
      console.log("✅ SignalR Connected");
    } catch (err) {
      console.error("❌ SignalR Connection Error:", err);
      setTimeout(() => this.start(), 5000); // Retry after delay
    }
  }

  /** ✅ Stop the SignalR connection */
  async stop() {
    if (!this.connection) return;
    if (this.connection.state === signalR.HubConnectionState.Disconnected) {
      console.log("⚠️ SignalR is already disconnected.");
      return;
    }

    await this.connection.stop();
    console.log("🛑 SignalR Connection Stopped");
  }

  /** ✅ Reinitialize connection on token update */
  async updateToken() {
    console.log("🔄 Updating SignalR token...");
    if (this.connection) await this.stop();
    await this.start();
  }

  /** ✅ Join a chat group */
  async joinChat(chatId) {
    if (this.connection.state !== signalR.HubConnectionState.Connected) {
      console.warn("⚠️ Cannot join chat. SignalR is not connected.");
      return;
    }

    try {
      await this.connection.invoke("JoinChat", chatId);
      console.log(`📌 Joined chat: ${chatId}`);
    } catch (err) {
      console.error("❌ Error joining chat:", err);
    }
  }

  /** ✅ Leave a chat group */
  async leaveChat(chatId) {
    if (this.connection.state !== signalR.HubConnectionState.Connected) {
      console.warn("⚠️ Cannot leave chat. SignalR is not connected.");
      return;
    }

    try {
      await this.connection.invoke("LeaveChat", chatId);
      console.log(`🚪 Left chat: ${chatId}`);
    } catch (err) {
      console.error("❌ Error leaving chat:", err);
    }
  }

  /** ✅ Send a message */
  async sendMessage(chatId, content, contentType = "Text", fileUrl = "") {
    if (this.connection.state !== signalR.HubConnectionState.Connected) {
      console.warn("⚠️ Cannot send message. SignalR is not connected.");
      return;
    }

    try {
      await this.connection.invoke("SendMessageToChat", chatId, content, contentType, fileUrl);
      console.log(`📨 Message sent to chat: ${chatId}`);
    } catch (err) {
      console.error("❌ Error sending message:", err);
    }
  }

  /** ✅ Mark a chat as read */
async markChatAsRead(chatId) {
  if (this.connection.state !== signalR.HubConnectionState.Connected) {
    console.warn("⚠️ Cannot mark chat as read. SignalR is not connected.");
    return;
  }

  try {
    await this.connection.invoke("MarkChatAsRead", chatId);
    console.log(`✅ Chat marked as read: ${chatId}`);
  } catch (err) {
    console.error("❌ Error marking chat as read:", err);
  }
}


  /** ✅ Listen for incoming messages */
  // onMessageReceived(callback) {
  //   this.connection.on("ReceiveMessage", (message) => {
  //     callback(message);
  //   });
  // }


  /** ✅ Listen for incoming messages */
onMessageReceived(callback) {
  this.connection.on("ReceiveMessage", (message) => {
    console.log("📩 New message received:", message);
    
    // Play notification sound
    // const audio = new Audio("/notification.mp3");
    // audio.play().catch((err) => console.warn("🔇 Notification sound error:", err));

    callback(message);
  });
}

  offMessageReceived(callback) {
    this.connection.off("ReceiveMessage", (message) => {
      callback(message);
    });
  }

  onNotificationReceived(callback) {
    this.connection.on("ReceiveNotification", (notification) => {
      console.log("🔔 Notification Received:", notification); // ✅ Debug here
      callback(notification);
    });
  }

  offNotificationReceived(callback) {
    this.connection.off("ReceiveNotification", callback);
  }

  /** ✅ Setup event handlers */
  setupConnectionEvents() {
    this.connection.onclose(() => {
      console.warn("❌ SignalR Disconnected. Reconnecting...");
      setTimeout(() => this.start(), 5000);
    });

    this.connection.onreconnecting(() => {
      console.warn("🔄 SignalR Reconnecting...");
    });

    this.connection.onreconnected(() => {
      console.log("✅ SignalR Reconnected!");
    });
  }
}

// Export as a singleton instance
export default new SignalRService();


