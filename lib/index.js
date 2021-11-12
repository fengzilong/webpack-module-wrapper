const { ConcatSource } = require( 'webpack-sources' )

const ID = `WebpackModuleCustomWrapper`

module.exports = class ModuleWrapper {
  constructor( options = {} ) {
    this.options = options
  }

  apply( compiler ) {
    const { wrap } = this.options

    if ( typeof wrap !== 'function' ) {
      return
    }

    compiler.hooks.compilation.tap( ID, compilation => {
      compilation.moduleTemplates.javascript
        .hooks.render.tap( ID, ( moduleSource, module ) => {
          const sources = wrap( moduleSource, module )

          if ( Array.isArray( sources ) ) {
            const source = new ConcatSource()

            sources.forEach( src => {
              source.add( src )
            } )

            return source
          }

          return moduleSource
        } )
    } )
  }
}
