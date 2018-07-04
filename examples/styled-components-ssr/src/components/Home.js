import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import Header from './Header'
import TuxLogo from './TuxLogo/'
import Description from './Description'

injectGlobal`
	html {
		font-family: sans-serif;
		font-size: 16px;
		line-height: 1.5;
	}
	body {
		margin: 0rem;
		background: #fff;
	}
`

const HomeContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
	margin-top: 5rem;
`

const Home = () => {
	return (
		<HomeContainer>
			<Header />
			<TuxLogo />
			<Description>Edit app.js to get started</Description>
		</HomeContainer>
	)
}

export default Home
