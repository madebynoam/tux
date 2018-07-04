import React, { Component } from 'react'
import styled from 'styled-components'
import tuxLogo from './tux.svg'

const LogoImg = styled.img`
	display: block;
	margin: 0 auto;
	width: 25rem;
`

export class TuxLogo extends Component {
	render() {
		return <LogoImg src={tuxLogo} />
	}
}

export default TuxLogo
