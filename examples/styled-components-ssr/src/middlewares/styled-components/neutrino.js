const { merge } = require('@neutrinojs/compile-loader')

const styledMiddleware = (neutrino, opts = {}) => {
  const options = Object.assign(
    {
      ssr: true,
      displayName: process.env.NODE_ENV !== 'production',
    },
    opts
  )

  // prettier-ignore
  neutrino.config.module
    .rule('compile')
      .use('babel')
        .tap(babelOptions => 
          merge(babelOptions, {
            plugins: [
              [require.resolve('babel-plugin-styled-components'), options],
            ],
          })
        )
}

module.exports = styledMiddleware
