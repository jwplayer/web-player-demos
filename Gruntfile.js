module.exports = function (grunt) {

  'use strict';

  // initial grunt configuration
  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'config': grunt.file.readJSON('config.json'),
    'clean': {
      build: ['build/*']
    },
    'connect': {
      serve: {
        options: {
          hostname: '127.0.0.1',
          port: 8000,
          base: 'build/demos',
          useAvailablePort: true,
          open: true,
          keepalive: true
        }
      }
    }
  });

  // load grunt plugins
  require('load-grunt-tasks')(grunt);

  // grunt default task
  grunt.registerTask('default', function() {

    // config vars
    var categories = grunt.config('config.categories'),
      demos = {
        'all': []
      },
      copy = [],
      concat = {},
      mustacheRender = [],
      env = {
        dev: true,
        staging: false,
        prod: false
      },
      path = {
        host: 'developer.jwplayer.com',
        asset: '//developer.jwplayer.com/',
        href: '/'
      };

    // if a `local-config.json` file exists, override configurable data
    if (grunt.file.exists('local-config.json')) {
      var local = grunt.file.readJSON('local-config.json');
      path.asset = local.path.asset ? local.path.asset : path.asset;
      path.href = local.path.href ? local.path.href : path.href;
    }

    // if a `--deploy-*` option was passed to specify build type
    if (grunt.option('deploy-production') || grunt.option('deploy-staging')) {
      path.asset = '/';
      path.href = '/jw-player/demos/';
      if (grunt.option('deploy-production')) {
        env.dev = false;
        env.prod = true;
        path.host = 'developer.jwplayer.com';
      } else {
        env.dev = false;
        env.staging = true;
        path.host = 'staging.jwplayer.com';
      }
    }

    // sort array/object alphabetically on the `directory` property
    function sortABC(a, b) {
      var prop = 'directory';
      var sortStatus = 0;
      if (a[prop] < b[prop]) {
        sortStatus = -1;
      } else if (a[prop] > b[prop]) {
        sortStatus = 1;
      }
      return sortStatus;
    }

    // loop categories and compile index and single pages for each child demo
    for (var i = 0; i < categories.length; i++) {

      // store category data in namespace
      var cat = categories[i];

      // namespace for category demo list
      demos[cat.directory] = [];

      // if directory does not exist even despite being in category list
      if (!grunt.file.isDir('demos/' + cat.directory)) continue;

      // scan category sub-directories to locate valid demos
      grunt.file.recurse('demos/' + cat.directory,
          function callback(absPath, rootDir, subDir, filename) {

        // we are looking for a config file, which is require per demo
        // when we find the config file, we process that directory as a demo
        if (filename == 'config.json') {

          // define demo-specific directory shortcuts
          var srcDir = 'demos/' + cat.directory + '/' + subDir + '/';
          var buildDir = 'build/' + srcDir;

          // get demo config json
          var demo = grunt.file.readJSON(srcDir + filename);

          // append demo obj with demo category and directory
          demo['category'] = cat;
          demo['directory'] = subDir;

          // push demo data to both category and master demo list
          demos[cat.directory].push(demo);
          demos['all'].push(demo);

          // concat config for demo js
          grunt.file.write(buildDir + 'js/build.js', '');
          concat[buildDir + 'js/build.js'] = srcDir + 'js/*.js'

          // concat config for demo css
          grunt.file.write(buildDir + 'css/build.css', '');
          concat[buildDir + 'css/build.css'] = srcDir + 'css/*.css';

          // copy any additional directories developer has included in demo
          copy.push({
            expand: true,
            cwd: srcDir,
            src: ['**/*', '!js/**/*', '!css/**/*', '!config.json', '!index.html'],
            dest: buildDir
          });

          // mustache config for demo detail page
          mustacheRender.push({
            data: {
              env: env,
              path: path,
              html: '<%= grunt.file.read("' + srcDir + 'index.html") %>',
              js: '\r\r<%= grunt.file.read("' + buildDir + 'js/build.js") %>\r',
              css: buildDir + 'css/build.css',
              category: demo.category,
              directory: demo.directory,
              title: demo.title,
              description: demo.description,
              license: demo.license,
              author: function() {
                if (!demo.author || !demo.author.name) return null;
                return {
                  name: demo.author.name,
                  githubUsername: demo.author.githubUsername || null
                };
              },
              showCode: function() {
                return typeof demo.showCode !== 'undefined' ? demo.showCode : true;
              },
              layout: function() {
                if (!this.showCode()) return 'vertical';
                return demo.layout || 'horizontal';
              }
            },
            template: '_templates/single.mustache',
            dest: buildDir + 'index.html'
          });

        }

      });

      // sort demos within this category
      demos[cat.directory].sort(sortABC);

      // mustache config for category demo index
      mustacheRender.push({
        data: {
          env: env,
          title: 'JW Player Demos &amp; Code Examples',
          description: 'Explore demos and code examples extending JW Player feature functionality.',
          path: path,
          directory: cat.directory,
          categories: function() {
            var cats = [];
            for (var i = 0; i < categories.length; i++) {
              cats.push(categories[i]);
              if (categories[i].directory == this.directory) {
                cats[i]['current'] = true;
              } else {
                cats[i]['current'] = null;
              }
            }
            cats.unshift({
              name: 'All Demos',
              directory: '',
              current: false
            });
            return cats;
          },
          demos: function() {
            var catDemos = demos[this.directory];
            for (var i = 0; i < catDemos.length; i++) {
              var descLength = catDemos[i].description.length;
              if (descLength > 70) {
                catDemos[i].description = catDemos[i].description.substring(0, 65);
                catDemos[i].description = catDemos[i].description.trim();
                catDemos[i].description = catDemos[i].description.slice(-1) == '.' ?
                  catDemos[i].description + '..' : catDemos[i].description + '...';
              }
            }
            return catDemos;
          }
        },
        template: '_templates/index.mustache',
        dest: 'build/demos/' + cat.directory + '/index.html'
      });

    }

    // sort complete list of demos
    demos.all.sort(sortABC);

    // mustache config for complete demo index
    mustacheRender.push({
      data: {
        env: env,
        title: 'JW Player Demos &amp; Code Examples',
        description: 'Explore demos and code examples extending JW Player feature functionality.',
        path: path,
        categories: function() {
          var cats = [];
          for (var i = 0; i < categories.length; i++) {
            cats.push(categories[i]);
            cats[i]['current'] = null;
          }
          cats.unshift({
            name: 'All Demos',
            directory: '',
            current: true
          });
          return cats;
        },
        demos: function() {
          var allDemos = demos['all'];
          for (var i = 0; i < allDemos.length; i++) {
            var descLength = allDemos[i].description.length;
            if (descLength > 70) {
              allDemos[i].description = allDemos[i].description.substring(0, 65);
              allDemos[i].description = allDemos[i].description.trim();
              allDemos[i].description = allDemos[i].description.slice(-1) == '.' ?
                allDemos[i].description + '..' : allDemos[i].description + '...';
            }
          }
          return allDemos;
        }
      },
      template: '_templates/index.mustache',
      dest: 'build/demos/index.html'
    });

    // set copy config
    grunt.config('copy', {
      build: {
        files: copy
      }
    });

    // set concat config
    grunt.config('concat', {
      build: {
        files: concat
      }
    });

    // set mustache config
    grunt.config('mustache_render', {
      options: {
        directory: '_templates'
      },
      build: {
        files: mustacheRender
      }
    });

    // run the task list
    grunt.task.run([
      'clean',
      'copy',
      'concat',
      'mustache_render'
    ]);

  });

  // build and serve locally
  grunt.registerTask('serve', [
    'default',
    'connect'
  ]);

};
