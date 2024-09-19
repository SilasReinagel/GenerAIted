import posthog from 'posthog-js'

const POSTHOG_API_KEY = process.env.VITE_POSTHOG_API_KEY

if (POSTHOG_API_KEY) {
  posthog.init(POSTHOG_API_KEY, { api_host: 'https://app.posthog.com' })
} else {
  console.warn('ATTN: PostHog API key is missing. Analytics will not be tracked.')
}

export function trackEvent(eventName, properties = {}) {
  if (POSTHOG_API_KEY) {
    posthog.capture(eventName, properties)
  } else {
    console.log('Event not tracked (missing API key):', eventName, properties)
  }
}
