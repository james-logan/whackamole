module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var randomPort = getRandomInt(3000, 65536);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'gh-pages': {
        options: {
          base: 'public'
        },
        src: '**/*'
    },
    autoprefixer: {
      main: {
        options: ['>1% in US'],
        src: 'public/css/main.css'
      }
    },
    babel: {
      dev: {
        options: {
          sourceMap: 'inline'
        },
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.js'],
            dest: 'public/'
          }
        ]
      },
      prod: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.js'],
            dest: 'public/'
          }
        ]
      }
    },
    bower_concat: {
      main: {
        dest: 'public/lib/build.js',
        cssDest: 'public/lib/build.css',
        mainFiles: {
          bootstrap: 'dist/css/bootstrap.min.css'
        }
      }
    },
    clean: ['public'],
    connect: {
      main: {
        options: {
          port: randomPort,
          base: 'public/',
          open: true,
          livereload: true
        }
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: [
              '**',
              '**/*.html',
              '**/*.css',
              '**/*.js',
              '**/*.otf'
            ],
            dest: 'public/',
            filter: 'isFile'
          }
        ]
      }
    },
    cssmin: {
      main: {
        files: {
          'public/lib/build.css': 'public/lib/build.css'
        }
      }
    },
    uglify: {
      bower: {
        files: {
          'public/lib/build.js': 'public/lib/build.js'
        }
      },
      main: {
        files: [
          {
            expand: true,
            cwd: 'public/',
            src: ['**/*.js'],
            dest: 'public/'
          }
        ]
      }
    },
    watch: {
      livereload: {
        options: {
          livereload: true
        },

        files: [
          'public/css/main.css',
          'public/js/**/*.js',
          'public/**/*.html'
        ]
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['babel:dev']
      }

    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('build', [
    'clean',
    'copy',
    'babel:prod',
    'bower_concat',
    'autoprefixer',
    'uglify'
  ]);
  grunt.registerTask('build-dev', [
    'clean',
    'copy',
    'babel:dev',
    'bower_concat',
    'autoprefixer'
  ]);

  grunt.registerTask('serve', [
    'build-dev',
    'connect',
    'watch'
  ]);

};
