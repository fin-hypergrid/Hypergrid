'use strict';

var files = {
    js: [
        'gruntfile.js',
        'src/**/*.js',
        'examples/**/*.js',
        'test/**/*.js'
    ],

    jshint: [
        'gruntfile.js',
        'src/**/*.js',
        'examples/**/*.js',
        'test/**/*.js',
        '!src/scripts/templates.js'
    ],

    scss: [
        'src/**/*.{scss,sass}',
        'examples/**/*.{scss,sass}',
        'test/**/*.{scss,sass}'
    ],

    html: [
        'examples/**/*.html',
    ],

    images: [
        'src/**/*.{png,jpg,jpeg,gif}',
        'examples/**/*.{png,jpg,jpeg,gif}',
        'test/**/*.{png,jpg,jpeg,gif}'
    ],

    templates: [
        'src/templates/**/*.html',
    ]
};

module.exports = function(grunt) {

    //load all npm tasks automagically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        paths: {
            build: 'build'
        },

        watch: {
            js: {
                files: files.js,
                tasks: ['mochaTest', 'jsbeautifier', 'jshint', 'browserify', 'uglify', 'docco'],
                options: {
                    livereload: true
                }
            },
            styles: {
                files: files.scss,
                tasks: ['sass:server', 'autoprefixer', 'cssmin']
            },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: []
            },
            images: {
                files: files.images,
                tasks: ['imagemin']
            },
            html: {
                files: files.html,
                tasks: ['validation', 'newer:prettify']
            },
            templates: {
                files: files.templates,
                tasks: ['templates']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: ['build/**/*.*', 'examples/dev/**/*.*']
            }

        },

        uglify: {
            dist: {
                files: {
                    'build/scripts/hypergrid.min.js': [
                        'build/scripts/hypergrid.min.js'
                    ]
                }
            }
        },

        cssmin: {
            dist: {
                files: {
                    'build/styles/hypergrid.min.css': [
                        'build/styles/hypergrid.css'
                    ]
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= paths.build %>/*',
                        '!<%= paths.build %>/.git*'
                    ]
                }]
            }
        },

        jshint: {
            files: files.jshint,
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
        },

        concurrent: {
            server: [
                'sass'
            ]
        },

        sass: {
            server: {
                files: [{
                    expand: true,
                    cwd: 'src/styles/',
                    src: ['**/*.scss', '**/*.sass'],
                    dest: 'build/styles',
                    ext: '.css'
                }]
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'build/styles/',
                    src: '{,*/}*.css',
                    dest: 'build/styles/'
                }]
            }
        },
        browserify: {
            dev: {
                files: {
                    'build/scripts/hypergrid.dev.js': ['src/scripts/**/*.js']
                },
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                    transform: ['debowerify']
                }
            },
            dist: {
                files: {
                    'build/scripts/hypergrid.min.js': ['src/scripts/**/*.js']
                },
                options: {
                    transform: ['debowerify']
                }
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/img',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: 'build/img'
                }]
            }
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/*.js']
            }
        },

        jsbeautifier: {
            files: files.js,
            options: {
                js: {
                    braceStyle: 'collapse',
                    breakChainedMethods: false,
                    e4x: false,
                    evalCode: false,
                    indentChar: ' ',
                    indentLevel: 0,
                    indentSize: 4,
                    indentWithTabs: false,
                    jslintHappy: false,
                    keepArrayIndentation: false,
                    keepFunctionIndentation: false,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    spaceBeforeConditional: true,
                    spaceInParen: false,
                    unescapeStrings: false,
                    wrapLineLength: 0
                }
            }
        },

        prettify: {
            options: {
                'indent': 4,
                'indent_char': ' ',
                'indent_scripts': 'normal',
                'wrap_line_length': 0,
                'brace_style': 'collapse',
                'preserve_newlines': true,
                'max_preserve_newlines': 1,
                'unformatted': [
                    'a',
                    'code',
                    'pre',
                    'span'
                ]
            },
            rootViews: {
                expand: true,
                cwd: 'examples/dev/',
                ext: '.html',
                src: ['*.html'],
                dest: 'examples/dev/'
            }
        },

        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.',
                        'build',
                        'examples/dev'
                    ]
                }
            }
        },
        validation: {
            options: {
                reset: grunt.option('reset') || false,
                stoponerror: true,
            },
            files: {
                src: files.html
            }
        },
        jst: {
            compile: {
                options: {
                    namespace: 'HYPERGRID',
                    processName: function(filepath) {
                        var fChop = filepath.lastIndexOf('/') + 1;
                        var lChop = filepath.length - 5;
                        var name = filepath.substring(fChop, lChop);
                        return name;
                    }
                },
                files: {
                    'src/scripts/templates.js': ['src/templates/{,*/}*.html']
                }
            }
        },
        replace: {
            jstfix: {
                src: ['src/scripts/templates.js'],
                overwrite: true, // overwrite matched source files
                replacements: [{
                    from: 'this["HYPERGRID"]',
                    to: 'module.exports'
                }]
            }
        },
        docco: {
            debug: {
                src: ['src/scripts/**/*.js'],
                options: {
                    output: 'docs/'
                }
            }
        },
        copy: {
            deploy: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'build/img',
                    dest: 'deploy/img',
                    src: [
                        '*.{ico,png}'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'build/scripts',
                    dest: 'deploy/scripts',
                    src: [
                        '*.js'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'build/styles',
                    dest: 'deploy/styles',
                    src: [
                        '*.css'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'examples/deploy',
                    dest: 'deploy',
                    src: [
                        'index.html'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/shadow-bar',
                    dest: 'deploy/bower_components/shadow-bar',
                    src: [
                        'index.html'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'examples/deploy',
                    dest: 'deploy',
                    src: [
                        'hypergrid.json'
                    ]
                }]
            }
        }
        //----------------------------------
    });

    grunt.registerTask('templates', ['jst', 'replace:jstfix']);
    grunt.registerTask('test', ['jshint', 'mochaTest']);
    grunt.registerTask('default', [
        'jshint',
        'mochaTest',
        'jsbeautifier'
    ]);
    grunt.registerTask('build', [
        'clean',
        'templates',
        'browserify',
        'uglify',
        'imagemin',
        'sass',
        'cssmin',
        'copy:deploy'
    ]);

    grunt.registerTask('serve', function() {
        return grunt.task.run([
            'clean',
            'templates',
            'browserify',
            'uglify',
            'imagemin',
            'sass',
            'cssmin',
            'connect:livereload',
            'mochaTest',
            'watch'
        ]);
    });
};
