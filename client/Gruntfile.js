/**
 * Created by 1002625 on 2017-02-23.
 */


module.exports = function(grunt) {
    "use strict";

    require("load-grunt-tasks")(grunt, {pattern: ["grunt-*", "assemble"]});

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshinit: {
            options: {
                jshintrc: true
            },
            gruntfile: {
                src: "Gruntfile.js"
            }
        },
        connect: {
            "server": {
                options: {
                    port: 8000,
                    protocol: "http",
                    base: ".",
                    middleware: function(connect, options) {
                        return [
                            require("grunt-connect-proxy/lib/utils").proxyRequest,
                            connect.static(String(options.base)),
                            connect.directory(options.base)
                        ];
                    }
                },
                proxies: [
                    {
                        context: ["/jqm"],
                        host: "127.0.0.1",
                        port: 8000,
                        https: false,
                        changeOrigin: false,
                        xforward: false,
                        debug: false,
                        headers: {

                        }
                    }
                ]
            }
        },
        watch: {
            options: {
                interrupt: true
            }
        }
    });

    grunt.registerTask("default", ["connect:server", "watch"]);
}