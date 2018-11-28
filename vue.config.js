const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}
const webpack = require('webpack')
const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv)
//require('minimist')这个是解析当前执行命令的参数。
var env;
if (args._[0] == 'build') {
    if (args && args.language) {
        env = {
            NODE_ENV: '"production"',
            VUE_APP_TITLE: '"My App1"',
            BASE_URL: '"./"',
            DOMAIN:'""'
        }

    } else if (!args.language) {
        env = {
            NODE_ENV: '"production"',
            VUE_APP_TITLE: '"My App"',
            BASE_URL: '"./"',
            DOMAIN:'""'
        }
    }
} else if (args._[0] == "serve") {
    env = {
        NODE_ENV: '"develpment"',
        VUE_APP_TITLE: '"My App3"',
        BASE_URL: '"./"',
        DOMAIN:'"apl"'
    }
}

module.exports = {
    baseUrl: './',
   // outputDir: "dist",//打包后的文件目录
    assetsDir: "statics",//打包后放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    indexPath: "index.html",//指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    filenameHashing:true,//生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
    configureWebpack: {
    },
    chainWebpack: (config) => {

        console.log(config.entry.toString())
        config
            .entry('http')
            .add('./src/utils/http.js')

        //chainWebpack主要是修改webpack里面的参数
        // chainWebpack的地址https://github.com/neutrinojs/webpack-chain
        config
            .resolve.alias   //定义文件的别名的。减少代码量。
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('utils', resolve('utils/css'))
        //这个是修改HtmlWebpackPlugin配置
        config
            .plugin('html')
            .tap(args => {
               //就是 args[0]HtmlWebpackPlugin是配置
                args[0].title = '番小茄' //给你修改标题。
                args[0].favicon = './public/logo.png' //可以给你添加logo
                args[0].minify = {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true
                }
                return args
            })
        //这个是删除webpack.DefinePlugin这个插件
        config.plugins.delete("define")
        //为什么是 define 这个你的看vue-cli3.0的@vue/cli-service/lib/config/下面的文件

        config  //这个添加插件的
            .plugin('define')
            .use(require.resolve('webpack/lib/DefinePlugin'), [{ 'process.env': env }]);
        // config.externals({
        //     'vue': 'Vue',
        //     'axios': 'axios',
        // })

    },

    devServer: {
        open: true,
        host: '192.168.1.244',
        port: 8085,
        https: false,
        hotOnly: false,
        proxy: {//这个是配置代理的配置
            '/apl': {
                target: 'http://test.danajia.com.cn',
                ws: true,
                changeOrigin: true,
                pathRewrite: {//这个一定要加上，要不代理不起作用的
                    '^/apl': 'http://test.danajia.com.cn'//路径重写
                }
            },
        },
    }

}
