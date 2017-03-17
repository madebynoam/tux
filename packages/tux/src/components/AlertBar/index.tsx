import React, { Component } from 'react'
import classNames from 'classnames'
import { tuxColors } from '../../styles'

class AlertBar extends Component {
  hideDelay = 1500

  state = {
    isHidden: false,
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({
        isHidden: true
      })
    }, this.hideDelay)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    const { isHidden } = this.state

    return (
      <div className={classNames('AlertBar', isHidden && 'is-hidden' )}>
        <p className="AlertBar-text">You are in edit mode. Any changes you make will be published.</p>
        <style jsx>{`
          .AlertBar {
            background: ${tuxColors.colorPink};
            bottom: 0;
            color: #FFF;
            display: flex;
            justify-content: center;
            padding: 5px;
            position: fixed;
            text-align: center;
            transform: 0;
            transition: transform;
            width: 100%;
            will-change: transform;
            z-index: 50;
          }
          .AlertBar.is-hidden {
            transform: translateY(80%);
            transition-duration: 0.15s;
            transition-timing-function: ease-out;
          }
          .ALertBar.is-hidden:hover {
            transform: translateY(0);
            transition-duration: 0.30s;
          }
          .AlertBar-text {
            cursor: default;
          }
        `}</style>
      </div>
    )
  }

}

export default AlertBar
