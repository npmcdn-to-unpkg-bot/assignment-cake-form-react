// Ref:
// https://github.com/webpack/webpack-with-common-libs/blob/master/gulpfile.js

import gulp from 'gulp';
import babel from 'gulp-babel';
import casperjs from 'gulp-casperjs';
import eslint from 'gulp-eslint';
import stylus from 'gulp-stylus';
import gutil from 'gulp-util';
import webserver from 'gulp-webserver';
import runSequence from 'run-sequence';
import del from 'del';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';

// We're using the Gulp CasperJS plugin, which internally makes use of CasperJS.
// However we actually want to use the Mocha CasperJS library which allows us to
// to use Mocha with Casper, so we just need to provide the plugin with the path
// to the Mocha CasperJS executable.
const MOCHA_CASPERJS_PATH = './node_modules/mocha-casperjs/bin/mocha-casperjs';

gulp.task('lint', () =>
	gulp
		.src(['./src/**/*.js', './test/**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
);

gulp.task('clean-test', () =>
  del(['./build-test/*'])
);

gulp.task('test-casper', ['clean-test'], () => {
  gulp
    .src('./test/**/*.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('./build-test'))
    .pipe(casperjs({ binPath: MOCHA_CASPERJS_PATH }));
});

gulp.task('clean', () =>
  del(['./build/*'])
);

gulp.task('styles', () =>
  gulp.src('./src/assets/styles/**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./build/assets/styles'))
);

gulp.task('static', () =>
  gulp
		.src('./src/**/*.html')
    .pipe(gulp.dest('./build'))
);

gulp.task('webpack:build-dev', (callback) => {
  const devConfig = Object.create(webpackConfig);
  devConfig.devtool = 'sourcemap';
  devConfig.debug = true;
  const devCompiler = webpack(devConfig);
  devCompiler.run((err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack:build-dev', err);
    }
    gutil.log('[webpack:build-dev]', stats.toString({ colors: true }));
    callback();
  });
});

gulp.task('build-dev', (callback) =>
  runSequence(
    'clean',
    ['static', 'styles', 'webpack:build-dev'],
    callback
  )
);

gulp.task('serve-dev', ['build-dev'], () => {
  gulp.watch(['./src/**/*'], ['build-dev']);
  gulp
    .src('./build')
    .pipe(webserver());
});
