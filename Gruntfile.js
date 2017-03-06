'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        info: {
            banner: {
                short: '/* <%= pkg.name %> v<%= pkg.version %>, (c) 2016-<%= grunt.template.today("yyyy") %> Joel Mukuthu, MIT License, built: <%= grunt.template.date("dd-mm-yyyy HH:MM:ss Z") %> */\n',
                long: '/**\n * <%= pkg.name %>\n * Version: <%= pkg.version %>\n * (c) 2016-<%= grunt.template.today("yyyy") %> Joel Mukuthu\n * MIT License\n * Built on: <%= grunt.template.date("dd-mm-yyyy HH:MM:ss Z") %>\n **/\n\n'
            }
        },

        clean: ['dist'],

        concat: {
            options: {
                separator: '\n',
                banner: '<%= info.banner.long %>'
            },
            dist: {
                src: ['src/*.js', 'src/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= info.banner.short %>'
            },
            dist: {
                src: ['<%= concat.dist.dest %>'],
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },

        'release-it': {
            options: {
                pkgFiles: ['package.json', 'bower.json'],
                commitMessage: 'Release %s',
                tagName: 'v%s',
                tagAnnotation: 'Release %s',
                buildCommand: 'npm run build'
            }
        }
    });

    grunt.registerTask('build', [
        'clean',
        'concat',
        'uglify'
    ]);
};
