//the require library is configuring paths
require.config({
    paths: {
        //tries to load jQuery from Google's CDN first and falls back
        //to load locally
        "jquery": ["http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min",
                    "../libs/jquery/jquery"],

        "darlingjs": "../../libs/darlingjs/darling.min",
        "darlingjs-flatlands": "../../libs/darlingjs-geometry/flatland",

        "fs": "../../libs/fs/dist/fs.min",
        "path": "../../libs/path/path.min"

        },
    shim: {
		"baseUrl": "../../",
        "darlingjs-flatlands": {
            //loads dependencies first
            deps: ["darlingjs"],
            //custom export name, this would be lowercase otherwise
            exports: "darlingjs-flatlands"
        }
    },
    //how long the it tries to load a script before giving up, the default is 7
    waitSeconds: 10
});
//requiring the scripts in the first argument and then passing the library namespaces into a callback
//you should be able to console log all of the callback arguments
require(['jquery', 'darlingjs', 'app'], function(jquery, Darlingjs, App){
    new App;
});