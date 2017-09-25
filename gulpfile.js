var gulp = require('gulp');
var sass = require('gulp-sass');


// 编译sass
// 利用gulp任务来编译
// 创建gulp任务：gulp.task()
gulp.task('compileSass',function(){

    // 查找sass文件
    // 匹配文件成功后，返回文档流
    gulp.src('./src/sass/*.scss')

        // 编译sass文件 参数：展开
        .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))

        // 输出文件到硬盘
        .pipe(gulp.dest('./src/css/'));

});

// 实现监听
gulp.task('jtSass',function(){
    // 监听第一个参数，如果有修改则启动compileSass任务
    gulp.watch('./src/sass/home.scss',['compileSass']);
});