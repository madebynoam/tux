import { Neutrino } from 'neutrino'
import { EnvironmentPlugin } from 'webpack'
import { tmpdir } from 'os'

/**
 * A "simple" neutrino preset, configuring webpack for tux.
 */
function tuxPreset(neutrino, target) {
  const { config } = neutrino
  config
    .context(neutrino.options.root)
    .plugin('env')
      .use(EnvironmentPlugin, [{
        ADMIN: target === 'admin' ? 'true' : '',
        SERVER: 'true'
      }])
      .end()
    .resolve
      .extensions
        .merge([
          ...(target === 'admin' ? ['.admin.js'] : []),
          '.js',
          '.json'
        ])
        .end()
      .end()
    .target('node')
    .entry(target)
      .add(neutrino.options.entry)
      .end()
    .output
      .path(neutrino.options.output)
      .libraryTarget('commonjs2')
      .end()
}

export default function bundleTux(target) {
  // Need to build into the temp folder. Otherwise jest's watcher goes
  // into an infinite loop.
  const output = `${tmpdir()}/tux`

  // Depending on the commonjs build, to avoid complicated typescript or babel config.
  const neutrino = new Neutrino({
    output,
    source: 'lib',
  })
  neutrino.use(tuxPreset, target)

  // Build and load!
  return neutrino
    .build()
    .then(() => require(`${output}/${target}`))
}
