import React, { Component } from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div`
	position: fixed;
	display: flex;
	align-items: ceneter;
	justify-content: center;
	top: 0;
	width: 100%;
	padding: 1.5em;
	text-align: center;
	background: #f9f9f9;
	border-bottom: 1px solid #ccc;
`

export class Header extends Component {
	render() {
		return <HeaderContainer>Tux</HeaderContainer>
	}
}

export default Header
