import express from 'express'
import 'dotenv/config'

const nodeEnv = (process.env.NODE_ENV || 'development').trim()
console.log('The Node Environment is set to:', nodeEnv)

if (nodeEnv === 'production') {
    console.log('Production mode enabled 😎')
} else {
    console.log('We are not in production mode 👨‍💻')
}

const app = express()
const PORT = process.env.PORT || 8001

// Core root route
app.get('/', (req, res) => {
    res.send(`<!doctype html><html><body>Hello Express!</body></html>`)
})

// Self-Learning Concept: Cloud-Ready Health Check Probe
app.get('/health', (req, res) => {
    res.json({
        status: 'UP',
        environment: nodeEnv,
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString()
    })
})

const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT} (http://localhost:${PORT})`))

// Self-Learning Concept: Graceful Process Termination (SIGTERM / SIGINT)
const gracefulShutdown = (signal) => {
    console.log(`\n[${signal}] Initiating graceful shutdown...`)
    server.close(() => {
        console.log('HTTP server closed. Exiting process cleanly.')
        process.exit(0)
    })
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))