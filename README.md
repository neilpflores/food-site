To run the website you need:

    1. Nodejs

    2. MySql workbench


Open mysql workbench and connect to your local server =>

    navagate to the file in this repository labled "fooddbDUMP.sql" it will be under the folder database

    Download it or save it somewhere

    on workbench, go to server, than data import

    Import the dump file and name a new schema

To run the website create a file called .env
Fill the file with the following lines:

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD= YOUR-PASSWORD \\this should be your password for the local mysql server
    DB_NAME=  fooddb
    DB_PORT = YOUR-PORT \\this should be the port you had configured for mysql workbench
Also change the same lines in db.js

To run program use command node .\app.js in the the repository directory

Then use your browser and navigate to "localhost:4500" Or if you change it in app.js whatever starts the server

Notes: the other items in the database are just there to view easily what is in the database.

Under Client theres a folder for images and pages, each page has a css file and there a js for the hovering over an ingrediant feature after selecting a recipe