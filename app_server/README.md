Instruction  

Configuration of the database,  
The database used is mysql, we use the driver sequelize for it ORM management.  
Use the dot file .env from this folder to set the configuration.

example:
    
    DB_HOSTNAME="localhost"
    DB_USERNAME="root"
    DB_PASSWORD="root"
    DB_PORT="3306"
    DB_DATABASE="database_name"
    
This .env file is naturally ignored by git.




Launch the application:
- it use typescript, so the tsc compiler is needed  
to install it : 
        
        npm i -g tsc
        
- then install the depencies need for node:   
       
       npm i
       
       
- you can now launch the app with package.json script  

        npm start
        
 - this script is used for developpement side,  
 it will build and watch .ts files, and nodemon will relaunch the app each time a modification is done.
 
