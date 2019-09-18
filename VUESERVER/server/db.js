"use strict";
const sqlite3 = require('sqlite3').verbose();

class Db
{

  constructor(file)
  {
        this.db = new sqlite3.Database(file);

        //CREATES USER TABLE
        this.createUserTable()

        //CREATES USER TABLE
        this.createMessagesTable()

  }

  createUserTable()
  {
        const sql = `
                    	CREATE TABLE IF NOT EXISTS user (
                    		id integer PRIMARY KEY,
                    		name text NOT NULL,
                    		email text NOT NULL UNIQUE,
                    		user_pass text NOT NULL,
                        is_admin integer NOT NULL DEFAULT 0)`

	       return this.db.run(sql);
  }

  createMessagesTable()
  {
        const sql = `
                    	CREATE TABLE IF NOT EXISTS messages (
                    		id integer PRIMARY KEY,
                    		user_id text NOT NULL,
                    		message text NOT NULL,
                        tags text DEFAULT 0,
                        date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`

	       return this.db.run(sql);
  }

  selectByEmail(email, callback)
  {
        return this.db.get
        (
          `SELECT * FROM user WHERE email = ?`, [email],function(err,row){
            callback(err,row)
        })
  }

  selectAll(callback)
  {
        return this.db.all(`SELECT * FROM user`, function(err,rows)
        {
        	callback(err,rows)
        })
  }

  selectAllMessages(callback)
  {
        return this.db.all(`SELECT * FROM messages`, function(err,rows)
        {
        	callback(err,rows)
        })
  }

  selectMessagesID(userid,callback)
  {
        return this.db.all(`SELECT * FROM messages WHERE user_id = ?`,[userid], function(err,rows){
        	callback(err,rows)
        })
  }

  insertUser(user, callback)
  {
        return this.db.run
        (
          'INSERT INTO user (name,email,user_pass) VALUES (?,?,?)',
          user, (err) => {
        	callback(err)
        })
  }

  // Insert Message
  insertMessage(message, callback)
  {
        return this.db.run
        (
          'INSERT INTO messages (user_id,message,tags) VALUES (?,?,?)',
          message, (err) => {
        	callback(err)
        })
  }

  // Insert Message
  deleteMessage(id, callback)
  {
        return this.db.run
        (
          'DELETE FROM messages WHERE id = ?',[id], (err) => {
        	callback(err)
        })
  }


}

module.exports = Db
