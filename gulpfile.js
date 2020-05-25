const gulp = require('gulp'),
    browserSync = require('browser-sync');

const startServer = (done) => {
    browserSync.init({
        server: {
            baseDir: './'
        },
        port: 3000
    });

    done();
};

const reloadPage = (done) => {
    browserSync.reload();

    done();
};

const watchFiles = () => {
    gulp.watch('./**/*.html', reloadPage);
    gulp.watch('./css/**/*.css', reloadPage);
    gulp.watch('./js/**/*.js', reloadPage);
};

gulp.task('default', gulp.parallel(startServer, watchFiles));