# Frontend Angular

Starter Angular project deve ser criado pelo candidato.


Steps:
1. Local installation of Angular. Version 19
npm install @angular/cli@19
2. Create a project
ng new app
3. Enter the folder
cd app
4. Install Material
ng add @angular/material 
5. Create a model (interface) inside /src/app/interfaces
ng generate interface [interface_name]
6. Manage environments
ng generate environments
This command creates a src/environments/ directory with two files. Choose one of them to version.
To use these variables, import the base environment file into your components or services
7. Create a service inside src/app/services
ng generate service [service_name]
Add http calls and use signal
7. Create a component
ng generate component [component_name]
8. Create a module
