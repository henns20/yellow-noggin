var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')(); // .js is optional
var moment = require('moment');
var $ = require('gulp-load-plugins')({lazy: true});
var fs = require('fs');
var del = require('del');


/********** Traditional gulp tasks **********/
//Inspired, learned, uses ideas lessons from John Papa`s plural site course
// https://app.pluralsight.com/library/courses/javascript-build-automation-gulpjs/table-of-contents
gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe($.ghPages());
});

/**
 * gulp - default
 * detail: sets the default gulp (e.g. gulp used alone)
 * command  the task listing
 */

gulp.task('default', ['help']);

/**
 * gulp - help
 * detail: lists all the tasks
 */
gulp.task('help', $.taskListing);


gulp.task('clean-code', function () {
	var deleteConfig = [].concat(
			config.tmp + '**/*.js',
			config.build + 'css/*.css',
			config.build + 'js/*.js' );
	log('Cleaning: ' + $.util.colors.blue(deleteConfig));
	return del(deleteConfig);
});

gulp.task('templatecache', ['clean-code'], function () {
		log('Creating AngularJs $templateCache');

		return gulp
			.src(config.htmltemplates)
			.pipe($.minifyHtml({empty: true}))
			.pipe($.angularTemplatecache(
					config.templateCache.file,
					config.templateCache.options
			))
			.pipe(gulp.dest(config.tmp));


});


gulp.task('clean-styles', function (done) {
	var files = config.build + 'css/*.css';
	clean(files, done);
});

gulp.task('optimize', ['html-inject'], function () {
	log('Optimizing the javascript, css, html');
	var templateCache = config.tmp  + config.templateCache.file;
	log(templateCache);
	return gulp
		.src(config.index)
		.pipe($.inject(gulp.src(templateCache, {read: false}), {
				starttag: '<!-- inject:templates:js -->'
		}))
		.pipe($.useref({searchPath: './'})) //TODO: optional 4 maximum DRY replace object var
		.pipe(gulp.dest(config.build));
});


/**
 * gulp - vet
 *
 * linter - jshint (jshintrc)
 * More: uses reporeter jshint stylish provides clean and more information*.
 */

gulp.task('vet', function() {
	log('Analyzing source with JSHint and JSCS');

	return gulp
				.src(config.alljs)
				.pipe($.if(args.verbose, $.print()))
				.pipe($.jshint())
				.pipe($.jshint.reporter('jshint-stylish', {verbose: true}));
});


/**
 *  gulp html-inject - injects front end app/vendor files to index.html
 *  in proper dependency order and in isolated sections by file ext.
 *
 * @return {file object}
 */
gulp.task('html-inject', ['templatecache'], function () {
		log('Injecting js, css files into index.html');

		return gulp
			.src(config.index)
			.pipe($.inject(gulp.src(config.js)))
			.pipe($.inject(gulp.src(config.css)))
			.pipe(gulp.dest('./'));
});


/********** End: Traditional gulp tasks **********/


//////////New Blog Utility
//  with unique files(uses gulp rename 2 name file by
// date(uses moment module/package) & separates blog posts into individual files)

// gulp.task('build-blog', ['build-post'], function () {
// 		return gulp
// 				.src('./src/blog-content/blog-posts/*.json')
// 				.pipe($.concat('all-blogs.json'))
// 				.pipe($.insert.wrap('[', ']'))
// 				// .pipe($.replace('},]', '}]'))
// 				.pipe($.replace(/},(|\n)]/, '}]'))
// 				.pipe(gulp.dest('./build/blog/'));
// });
//
//
// gulp.task('build-post', function () {
//     var fileContent = fs.readFileSync('./src/blog-content/current-post/blog-metadata.txt', 'utf8');
// 		var date = moment();
// 		var today = date.format('YYYY-MM-DD');
// 		log(date.format('YYYY-MM-DD')); //expressed according to ISO 8601(International Organization For Standardization)
//
// 		return gulp
// 				.src('./src/blog-content/current-post/blog.html')
// 				.pipe($.rename(today + '.json'))
//         .pipe($.cleanhtml())
//         .pipe($.replace('"', '\\"'))
// 	      .pipe($.insert.prepend('"content": "'))
// 	      .pipe($.insert.append('"'))
// 	      .pipe($.insert.append('\n')) //at a line break for next prepend task
// 	      .pipe($.insert.prepend(fileContent))
// 	      .pipe($.insert.wrap('{\n', '},'))
// 	      .pipe(gulp.dest('./src/blog-content/blog-posts'));
// });


////////////// A John Papa convention to separate out logs & other utilities

/**
 * Logs things to gulp processing
 */

function log(msg) {
	if(typeof(msg) === 'object') {
		for(var item in msg) {
			if(msg.hasOwnProperty(item)) {
				$.util.log($.util.colors.blue(msg[item]));
			}
		}
	} else {
		$.util.log($.util.colors.blue(msg));
	}
}


function clean(path, done) {
	log('Cleaning: ' + $.util.colors.blue(path));
	del(path, done);
}
