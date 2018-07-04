import { ServerStyleSheet } from 'styled-components'

const styled = () => session => {
  if (!process.env.BROWSER && session.req) {
    const sheet = new ServerStyleSheet()
    session.on('server', next => {
      next()
      const styles = sheet.getStyleElement()
      session.document.head.push(...styles)
    })

    return async next => sheet.collectStyles(await next())
  }
  return undefined
}

export default styled
