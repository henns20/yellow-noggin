var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')(); // .js is optional
var $ = require('gulp-load-plugins')({lazy: true});
var fs = require('fs');



////////// Traditional gulp tasks


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



///////////////// My Static Blog Utility:  formation/utility tasks section
/////// Todo: make the file architecture cleaner
// 1 tempaltes dir - rename blogutility
// 2 test-insert-prejson - rename blog parts
// 3 ...

/**
 * task: form-blog
 * Properly Adds Staged blog to the current blogs(json)
 * More detail: takes raw my html blog post & title, excerpt file
 * makes and puts it into the json object(json conventions object)
 * ultimately adding up to previous blogs jason file(prepending into it)
 * Dependent of 2 sub tasks below
 * Steps 1) Write html for the content area and save as blog html in src blog-utility/blog.html
 * Step 2) Add other parts* as blog-utility/blog-parts.html (or other ext - is a json like convention) ** see todos
 * Step 3) terminal: gulp form-blog
 *
 */

gulp.task('form-blog', ['prepend-all-blogs'], function () {
	log('Forming blogs: created in dist/blog-utility/final');
    return gulp
      .src('./dist/templates/staged/blogs-unwrapped.html')
			.pipe($.insert.wrap('[', ']'))
			.pipe($.replace('},]', '}]'))
      .pipe(gulp.dest('./dist/templates/final/'));
});


//////////task: form-blogs dependencies/////////

/**
 * task: blog-to-object (aka: blog parts to object)
 * (1) Cleans Html; (2) Prepends manually prepared title, excerpt(etc)file
 * (3) Wraps data in an object with json convention (to be added to a json file)
 */

gulp.task('blog-to-object', function () {
    var fileContent = fs.readFileSync('./src/templates/test-insert-prejson.txt', 'utf8');
		return gulp
				.src('./src/templates/blog.html')
        .pipe($.cleanhtml())
        .pipe($.replace('"', '\\"'))
	      .pipe($.insert.prepend('"content": "'))
	      .pipe($.insert.append('"'))
	      .pipe($.insert.append('\n')) //at a line break for next prepend task
	      .pipe($.insert.prepend(fileContent))
	      .pipe($.insert.wrap('{\n', '},'))
	      .pipe(gulp.dest('./dist/templates/'));
});

/**
 * task: prepend-all-blogs to staging
 * Add Recent blog object(created from blog-to-object task) to all previous
 * blogs(file with blog objects)
 */

gulp.task('prepend-all-blogs', ['blog-to-object'], function () {
		var fileBeforeFinal = fs.readFileSync('./dist/templates/blog.html', 'utf8');
    return gulp
      .src('./dist/templates/staged/blogs-unwrapped.html')
			.pipe($.insert.prepend(fileBeforeFinal))
      .pipe(gulp.dest('./dist/templates/staged/'));
});

//////////form-blog dependencies End
///////////////// End: My Static Blog Utility

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
