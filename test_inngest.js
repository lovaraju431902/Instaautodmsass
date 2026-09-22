const { Inngest } = require("inngest")

const inngest = new Inngest({
  id: "instadm-saas",
  eventKey: process.env.INNGEST_EVENT_KEY || "rnW29XFTXWBczs1PSK2kug0hykuKeL8_NI9u9SQWfovVaENLC8jdD4O3Ia1PYiyi12WsqmEt5y7D9tKRQDMpZg",
})

async function main() {
  try {
    console.log("Sending test event to Inngest Cloud...")
    const res = await inngest.send({
      name: "instagram/comment.received",
      data: {
        instagramAccountId: "17841476342292319",
        mediaId: "18198190582379738",
        commentId: "test_comment_123",
        commentText: "link",
        senderId: "test_user_456",
        senderUsername: "telugu.cockroachjanataparty",
      },
    })
    console.log("Inngest send result:", JSON.stringify(res, null, 2))
  } catch (err) {
    console.error("Inngest send failed:", err)
  }
}

main()
