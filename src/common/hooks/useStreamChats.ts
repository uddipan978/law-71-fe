import { useState } from "react"
declare global {
  interface Window {
    __STREAM_READER__: ReadableStreamDefaultReader | null
  }
}
export const useStreamChats = () => {
  const [messageStream, setMessageStream] = useState<string>("")
  const [isStreaming, setStreaming] = useState<boolean>(false)
  const [isStreamFinished, setStreamFinished] = useState<boolean>(false)
  const [isStreamError, setIsStreamError] = useState<boolean>(false)
  const abortController = new AbortController()
  return {
    messageStream,
    isStreaming,
    isStreamFinished,
    isStreamError,
    handleStartStreaming: async (endpoint: string, body: object, method: string = "POST") => {
      setStreamFinished(false)
      setMessageStream("")
      setStreaming(true)
      setIsStreamError(false)

      const response = await fetch(endpoint, {
        method,
        ...(method === "POST" ? { body: JSON.stringify(body) } : {}),
        headers: { "Content-Type": "application/json" },
        signal: abortController.signal
      })
      const stream = response.body
      if (stream) {
        const reader = stream.getReader()
        window.__STREAM_READER__ = reader
        try {
          const continueLoop = true
          while (continueLoop) {
            const { done, value } = await reader.read()
            if (done) {
              setStreamFinished(true)
              break
            }
            const decodedValue = new TextDecoder().decode(value)
            setMessageStream((prevMessages) => prevMessages + decodedValue)
          }
        } catch (error) {
          setIsStreamError(true)
        } finally {
          reader.releaseLock()
          setStreaming(false)
        }
      }
    },
    handleStopStreaming: async () => {
      if (window.__STREAM_READER__) {
        try {
          await window.__STREAM_READER__.cancel()
          window.__STREAM_READER__ = null
          abortController.abort()
          setIsStreamError(true)
        } catch (err) {
          return err
        }
      }
    }
  }
}
