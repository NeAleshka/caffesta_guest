const {injectManifest} =require ('workbox-build')

let workboxConfig={
    globDirectory:'../build',
    globPatterns:[
        'favicon.ico',
        'index.html',
        'static/css/*.*.css',
        'static/js/*.*.js',
        'manifest.json',
        'static/media/*.*.svg',
        'static/media/*.*.woff',
    ],
    swSrc:'sw-workbox.js',
    swDest:'../public/service-worker.js',
}

injectManifest(workboxConfig).then(({count,size})=>{
    console.log(`Generate ${workboxConfig.swDest}, which will precache ${count} files, total ${size} bytes`)
})
