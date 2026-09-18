import { serve } from "inngest/next"
import { inngest } from "@/lib/inngest/client"
import { inngestFunctions } from "@/lib/inngest/functions"

// Export Next.js API handlers for Inngest dev server & cloud
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: inngestFunctions,
})
