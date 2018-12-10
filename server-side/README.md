## backend
### rest api developed with express & mongoose, 

to install the project 

    yarn 
OR

    npm install
    
to start using the api

    yarn start
    
OR
    
    npm start

then you can access to the api via 

    http://localhost:5000/api/v1
    
to consume the book entity

    /books => GET METHOD
    /book => POST 
    /book/:id => PUT & DELTE
    /book/:id/author => GET
 
to consume the author entity

    /authors => GET METHOD
    /author => POST 
    /author/:id => PUT & DELTE
    /author/:id/books => GET
 