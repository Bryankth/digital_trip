 // ██████╗ ██████╗ ██╗   ██╗███╗   ██╗████████╗███████╗██╗██╗     ███████╗        ██╗███████╗
// ██╔════╝ ██╔══██╗██║   ██║████╗  ██║╚══██╔══╝██╔════╝██║██║     ██╔════╝        ██║██╔════╝
// ██║  ███╗██████╔╝██║   ██║██╔██╗ ██║   ██║   █████╗  ██║██║     █████╗          ██║███████╗
// ██║   ██║██╔══██╗██║   ██║██║╚██╗██║   ██║   ██╔══╝  ██║██║     ██╔══╝     ██   ██║╚════██║
// ╚██████╔╝██║  ██║╚██████╔╝██║ ╚████║   ██║   ██║     ██║███████╗███████╗██╗╚█████╔╝███████║
 // ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝     ╚═╝╚══════╝╚══════╝╚═╝ ╚════╝ ╚══════╝

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    '../css/game.css': 'scss/game.scss',
                    '../css/mobile.css': 'scss/mobile.scss'
                }
            },
            options: {
                sourcemap: 'true'
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: 'scss/*.scss',
                tasks: ['newer:sass'],
            },
            js: {
                files: ['js/*.js', 'js/*/*.js', '../js/tests/tests.js'],
                tasks: ['process'],
            },
            html: {
                files: '../index.html',
            },
            // config: {
            //     files: ['package.json', 'Gruntfile.js'],
            //     tasks: ['exit']
            // },
        },
        concat_sourcemap: {
            options: {
                sourcesContent: true
            },
            target: {
                files: {
                    '../assets_source/js/DT.js': [
                    // '../js/DT.js': [
                        // QR code
                        'js/vendor/jquery.qrcode.min.js',
                        // Particle system
                        'js/vendor/fireworks-bundle.js',
                        // Detector
                        'js/vendor/Detector.js',
                        // Resize
                        'js/vendor/threex.windowresize.js',
                        // Stats
                        'js/vendor/Stats.js',
                        'js/vendor/threex.rendererstats.js',
                        // Curves
                        'js/vendor/CurveExtras.js',
                        // Sound
                        'js/vendor/BufferLoader.js',
                        // Webcam control
                        'js/vendor/headtrackr.min.js',
                        // External objects
                        'js/vendor/OBJLoader.js',
                        // Full screen
                        'js/vendor/THREEx.FullScreen.js',
                        // Postprocessing
                        'js/vendor/CopyShader.js',
                        'js/vendor/EffectComposer.js',
                        'js/vendor/RenderPass.js',
                        'js/vendor/MaskPass.js',
                        'js/vendor/ShaderPass.js',
                        'js/vendor/BadTVShader.js',
                        // Game init
                        'js/init.js',
                    ]
                }
            }
        },
        uglify: {
            dist: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    sourceMapIn: '../assets_source/js/DT.js.map',
                    banner: '/* Created by deemidroll | deemidroll@gmail.com | 2014 */',
                },
                files: {
                    '../js/DT.min.js': ['../assets_source/js/DT.js'],
                    '../js/myYepnope.min.js': ['js/myYepnope.js'],
                    '../js/mobile.min.js': ['js/mobile.js'],
                }
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concat-sourcemap');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-newer');
    grunt.registerTask('process',
        ['concat_sourcemap',
        'uglify'
        ]);
    grunt.registerTask('default',
        ['sass',
        'concat_sourcemap',
        'uglify',
        'watch']);
}