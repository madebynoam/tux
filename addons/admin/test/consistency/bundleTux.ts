import { Neutrino, build } from 'neutrino'
import { EnvironmentPlugin } from 'webpack'
import { tmpdir } from 'os'

/**
 * A "simple" neutrino preset, configuring webpack for tux.
 */
function tuxPreset(neutrino, target) {
  const { config } = neutrino
  // prettier-ignore
  config.context(neutrino.options.root)
    .plugin('env')
      .use(EnvironmentPlugin, [
        {
          ADMIN: target === 'admin' ? 'true' : '',
          TUX_BUILD_TARGET: 'server',
        },
      ]).end()
      .resolve.extensions.merge([
        ...(target === 'admin' ? ['.admin.js'] : []),
        '.js',
        '.json',
      ]).end()
    .end()
  .target('node')
  .entry(target)
    .add(neutrino.options.mains.index)
    .end()
  .output.path(neutrino.options.output)
    .libraryTarget('commonjs2')
    .end()
}

export default function bundleTux(target) {
  // Need to build into the temp folder. Otherwise jest's watcher goes
  // into an infinite loop.
  const output = `${tmpdir()}/tux`

  // Depending on the commonjs build, to avoid complicated typescript or babel config.
  const neutrino = Neutrino({
    output,
    source: 'lib',
  })
  neutrino.register('build', build)
  neutrino.use(tuxPreset, target)

  // Build and load!
  return neutrino
    .run('build')
    .promise()
    .then(() => require(`${output}/${target}`))
}
