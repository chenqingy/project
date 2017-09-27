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
    gulp.watch('./src/sass/*.scss',['compileSass']);
});

// 自动刷新服务器
// php服务器（12306）：能解析php文件
// browserSync服务器（666）：能自动刷新
var browserSync = require('browser-sync');
gulp.task('server',function(){
    // 创建服务器
    browserSync({
        // 指定服务器目录
        // server:'./src',

        // 代理
        proxy:'http://localhost:2017',

        // 指定服务器端口（默认：3000）
        port:666,

        // 监听文件修改
        // 当文件有修改时，自动刷新页面
        files:['./src/**/*.html','./src/css/*.css','./src/api/*.php']
    });

    // 监听sass的修改
    gulp.watch('./src/sass/*.scss',['compileSass']);
});