const { version: appVersion } = require('./package.json')

module.exports = {
  options: {
    serverEntry: 'server',
  },
  use: [
    'tux/neutrino',
    // Styled components
    'src/middlewares/styled-components/neutrino',
  ],
}
