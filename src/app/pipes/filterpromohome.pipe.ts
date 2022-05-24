import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpromohome'
})
export class FilterpromohomePipe implements PipeTransform {

  transform(value: any, arg: any): any {

    const resultpost = []
    for (const post of value){
      if(arg === '' || arg.length < 3) return value
if (post.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 ){
resultpost.push(post);
}
    }

    return resultpost
  }

}
