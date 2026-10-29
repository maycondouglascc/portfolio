import posthog from "posthog-js"

const posthogKey = import.meta.env.VITE_POSTHOG_KEY
const posthogHost = import.meta.env.VITE_POSTHOG_HOST
const isPostHogConfigured = Boolean(posthogKey && posthogHost)

if (!posthogKey || !posthogHost) {
  if (import.meta.env.DEV) {
    console.warn(
      `[PostHog] Telemetry disabled in development: ${
        !posthogKey ? "VITE_POSTHOG_KEY" : "VITE_POSTHOG_HOST"
      } is missing. Events will be safely ignored without breaking the application.`
    )
  }
} else {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    defaults: "2026-05-30",
    logs: {
      serviceName: "portfolio-web",
      environment: import.meta.env.MODE,
    },
    capture_exceptions: {
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
      capture_console_errors: false,
    },
  })
}

export const portfolioLogger = {
  info: (...args: Parameters<typeof posthog.logger.info>) => {
    if (isPostHogConfigured) posthog.logger.info(...args)
  },
}

const analytics = {
  capture: (...args: Parameters<typeof posthog.capture>) => {
    if (isPostHogConfigured) posthog.capture(...args)
  },
}

export default analytics
