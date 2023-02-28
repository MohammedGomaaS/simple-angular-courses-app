# Learning curve Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.15

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

- Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


- Use Angular CLI to generate your files.


## Notes

- I used `MockDataInterceptor` to handle the HTTP requests and simulate the BE,  you will find it inside this path `src\app\core\interceptors` 

## To make code readable, maintainable and scalable

- I tried to apply  [Angular coding style guide](https://angular.io/guide/styleguide) .


- All Variables  have a [type](https://www.typescriptlang.org/docs/handbook/basic-types.html), i didn't use the keyword `any` or a variable without an interface. 

- I used [TypeScript Access Modifiers](https://www.typescripttutorial.net/typescript-tutorial/typescript-access-modifiers/)

- I used [Camel case](https://en.wikipedia.org/wiki/Camel_case)  while writing the variables.

- I used kebab case while writing the names of the files. 

- All constant values is in [Enums](https://www.typescriptlang.org/docs/handbook/enums.html).


- i used [Lazy-loading feature modules](https://angular.io/guide/lazy-loading-ngmodules) to handle our features, you will find our modules inside this folder `\Qorrect\src\app\application` 

- I tried to keep modules flat.

- The structure of the  modules files  

  - > --components  //the shared components between the pages of the module
    >
    > --models  //the models of the module
    >
    > --pages  //the pages of the module (each pages must have it's dependencies like pipes, resolvers, services and ...   that is not shared between other pages)
    >
    > --pipes //the shared pipes between the pages of the module
    >
    > --resolvers //the shared resolvers between the pages of the module
    >
    > --services  //the shared services between the pages of the module
  
- I added the shared components, services, pipes,... between the modules inside this module`\Qorrect\src\app\application\shared\shared.module.ts` 

- I used **Smart Components vs Presentational Components** architecture approach during designing the app components
  https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/
  https://stackblitz.com/edit/angular-container-components?file=src%2Fapp%2Fcontainers%2Flist-container%2Flist-container.component.html

  

