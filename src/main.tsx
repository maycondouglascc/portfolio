import React from "react"
import ReactDOM from "react-dom/client"
import Clarity from "@microsoft/clarity"
import App from "./App"
import "./index.css"

const projectId = import.meta.env.VITE_CLARITY_PROJECT_ID
if (import.meta.env.PROD && projectId) {
  Clarity.init(projectId)
}

const rootElement = document.getElementById("root")

if (!rootElement) {
  throw new Error("Root element not found")
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
