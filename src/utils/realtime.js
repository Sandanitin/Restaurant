const CHANNEL = 'rms_realtime_channel'

let bc
try {
  bc = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel(CHANNEL) : null
} catch (_) {
  bc = null
}

export function publishRealtime(eventType, payload) {
  const message = { eventType, payload, ts: Date.now() }
  if (bc) {
    bc.postMessage(message)
  } else if (typeof localStorage !== 'undefined') {
    localStorage.setItem(CHANNEL, JSON.stringify(message))
    localStorage.removeItem(CHANNEL)
  }
}

export function subscribeRealtime(handler) {
  const onMessage = (e) => handler(e.data)
  const onStorage = (e) => {
    if (e.key === CHANNEL && e.newValue) {
      try { handler(JSON.parse(e.newValue)) } catch (_) {}
    }
  }

  if (bc) bc.addEventListener('message', onMessage)
  if (typeof window !== 'undefined') window.addEventListener('storage', onStorage)

  return () => {
    if (bc) bc.removeEventListener('message', onMessage)
    if (typeof window !== 'undefined') window.removeEventListener('storage', onStorage)
  }
}


