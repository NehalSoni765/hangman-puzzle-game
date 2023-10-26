const path = require('path');

module.exports={
    entry: ['babel-polyfill','./src/index.js'],//start process
    output:{
        filename:'bundle.js',
        path: path.resolve(__dirname,'public/scripts')
    },
    module:{
        rules:[{
            test:/\.js$/, //before .js and afterfor $
            exclude:/node_modules/,
            use:{
                loader:"babel-loader",
                options:{
                    presets:['@babel/preset-env']
                }
            }
        }]
    },
    devServer:{
        contentBase: path.resolve(__dirname,"public"),
        publicPath: '/scripts/'
    },
    devtool:'source-map' // it converts babel code to our code in browser devtool
}