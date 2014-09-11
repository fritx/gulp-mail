## Information

<table>
  <tr>
    <td>Package</td><td>gulp-mail</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>Send mails with gulp</td>
  </tr>
</table>

Highly learnt from [gulp-mailer](https://github.com/meerkats/gulp-mailer) (not available on npm)

## Usage

### `mail(options)`

- options: [object]

```js
var mail = require('gulp-mail')

gulp.task('mail', function() {
  return gulp.src('./mail.html')
    .pipe(mail({
      to: [
        'example@163.com'
      ],
      from: 'example@163.com',
      subject: 'example',
      html: '<h1>Hello!</h1>'
    }))
})
```
