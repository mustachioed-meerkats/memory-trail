## Schema Creation / Modification
To create new table:
1. create new model file for table in models folder
2. run 'knex migrate:make "SCHEMA_CHANGE_ACTION_NAME"' on command line; this wil generate the migration file name
3. a new file will be created in "migrations" folder, this migration is where you would specify table columns
4. refer to this link for migration file editing: http://bookshelfjs.org/#associations
5. run "knex migrate:latest" to create table

To modify existing table:
1. repeat step 2 to 5 from above


## Database Model Usage & Creation 
To create methods specific to a model
* create that method in the model file