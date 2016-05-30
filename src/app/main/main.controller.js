export class MainController {
  constructor (toastr) {
    'ngInject';

    this.awesomeThings = [];
    this.classAnimation = '';
    this.creationDate = 1464639997554;
    this.toastr = toastr;
  }

  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }
}
