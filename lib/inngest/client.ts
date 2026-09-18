import { EventSchemas, Inngest } from "inngest"

export type InstagramCommentEvent = {
  data: {
    instagramAccountId: string
    mediaId?: string
    commentId?: string
    commentText: string
    senderId: string
    senderUsername?: string
  }
}

export type InstagramDmEvent = {
  data: {
    instagramAccountId: string
    senderId: string
    senderUsername?: string
    messageText: string
  }
}

export type AppEvents = {
  "instagram/comment.received": InstagramCommentEvent
  "instagram/dm.received": InstagramDmEvent
}

// Initialize Inngest Client for background execution
export const inngest = new Inngest({
  id: "instadm-saas",
  name: "InstaDM Automation Engine",
  schemas: new EventSchemas().fromRecord<AppEvents>(),
})
