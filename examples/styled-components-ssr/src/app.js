import React from 'react'
import { createApp } from 'tux'
import styled from 'tux-addon-styled-components'
import Home from './components/Home'

// Create a Tux app.
const app = createApp()

// SSR middleware for styled components.
app.use(styled())

// Lastly, serve a component on client and server.
app.use(<Home />)

export default app
