'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt)
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            files:['static/less/main.less'],
            tasks:['default']
        },
        uglify: {
            build: {
                expand: true,
                cwd: 'static/js/',
                src: 'main.js',
                dest: 'static/js/',
                ext: '.min.js',
                extDot: 'last'
            }
        },
        less: {
            options: {
                compress:true
            },
            build: {
                expand: true,
                cwd: 'static/less/',
                src: ['*.less','!global.less','!mixins.less','!variables.less'],
                dest: 'static/css/',
                ext: '.min.css',
                extDot: 'last'
            }
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,  
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'index.html': 'dist/index.html',     // 'destination': 'source'
                    'works.html': 'dist/works.html',
                    'info.html': 'dist/info.html',
                    'blogs.html': 'dist/blogs.html',
                    'blog1.html': 'dist/blog1.html',
                    'blog2.html': 'dist/blog2.html'
                }
            }
        }
    });

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['uglify','less','htmlmin']);

};