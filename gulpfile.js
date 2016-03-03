var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')(); // .js is optional
var moment = require('moment');
var $ = require('gulp-load-plugins')({lazy: true});
var fs = require('fs');



/********** Traditional gulp tasks **********/
//John Papa reference: TODO: pluralsight href here
// https://app.pluralsight.com/library/courses/javascript-build-automation-gulpjs/table-of-contents

/**
 * gulp - vet
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
	gulp.task('html-inject', function () {
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

gulp.task('build-blog', ['build-post'], function () {
		return gulp
				.src('./src/templates/blog-posts/*.json')
				.pipe($.concat('all-blogs.json'))
				.pipe($.insert.wrap('[', ']'))
				.pipe($.replace('},]', '}]'))
				.pipe(gulp.dest('./dist/blog/'));
});


gulp.task('build-post', function () {
    var fileContent = fs.readFileSync('./src/templates/blog-metadata.txt', 'utf8');
		var date = moment('02-26-2016');
		var today = date.format('YYYY-MM-DD');
		log(date.format('YYYY-MM-DD')); //expressed according to ISO 8601(International Organization For Standardization)

		return gulp
				.src('./src/templates/blog.html')
				.pipe($.rename(today + '.json'))
        .pipe($.cleanhtml())
        .pipe($.replace('"', '\\"'))
	      .pipe($.insert.prepend('"content": "'))
	      .pipe($.insert.append('"'))
	      .pipe($.insert.append('\n')) //at a line break for next prepend task
	      .pipe($.insert.prepend(fileContent))
	      .pipe($.insert.wrap('{\n', '},'))
	      .pipe(gulp.dest('./src/templates/blog-posts'));
});


////////////// A John Papa convention to separate out logs

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
