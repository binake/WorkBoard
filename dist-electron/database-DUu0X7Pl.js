"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const l=require("electron"),n=require("path"),c=require("fs"),u=require("better-sqlite3"),d=process.env.NODE_ENV==="development",o=d?n.join(process.cwd(),"tasks.db"):n.join(l.app.getPath("userData"),"tasks.db");console.log("Database path:",o);const i=n.dirname(o);c.existsSync(i)||(console.log("Creating database directory:",i),c.mkdirSync(i,{recursive:!0}));let a;try{console.log("Initializing database at:",o),a=new u(o,{verbose:console.log,fileMustExist:!1}),console.log("Creating tasks table if not exists"),a.prepare(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      status TEXT NOT NULL,
      createTime TEXT NOT NULL,
      updateTime TEXT NOT NULL
    )
  `).run(),console.log("Database table initialized successfully")}catch(t){throw console.error("Database initialization error:",t),t}const T={getAllTasks(){try{const e=a.prepare("SELECT * FROM tasks").all();return console.log("Retrieved tasks:",e),e}catch(t){throw console.error("Error getting all tasks:",t),t}},addTask(t){try{if(console.log("Adding task to database:",t),!t.id||!t.title||!t.status)throw new Error("Invalid task data");const e=a.prepare(`
        INSERT INTO tasks (id, title, status, createTime, updateTime) 
        VALUES (@id, @title, @status, @createTime, @updateTime)
      `),s={id:t.id,title:t.title,status:t.status,createTime:t.createTime,updateTime:t.updateTime};console.log("Executing SQL with params:",s);try{const r=e.run(s);if(console.log("SQL execution result:",r),r.changes!==1)throw new Error("Failed to insert task");return r}catch(r){throw console.error("SQL execution error:",r),new Error(`Database error: ${r.message}`)}}catch(e){throw console.error("Error in addTask:",e),e}},updateTaskStatus(t,e,s){try{return a.prepare("UPDATE tasks SET status = ?, updateTime = ? WHERE id = ?").run(e,s,t)}catch(r){throw console.error("Error updating task status:",r),r}},deleteTask(t){try{return a.prepare("DELETE FROM tasks WHERE id = ?").run(t)}catch(e){throw console.error("Error deleting task:",e),e}},updateTask(t){try{if(console.log("Updating task in database:",t),!t.id||!t.title||!t.status)throw new Error("Invalid task data");const e=a.prepare(`
        UPDATE tasks 
        SET title = @title, 
            status = @status, 
            updateTime = @updateTime 
        WHERE id = @id
      `),s={id:t.id,title:t.title,status:t.status,updateTime:t.updateTime};console.log("Executing SQL with params:",s);const r=e.run(s);if(console.log("Update result:",r),r.changes!==1)throw new Error("Failed to update task");return r}catch(e){throw console.error("Error updating task:",e),e}}};exports.taskDb=T;
//# sourceMappingURL=database-DUu0X7Pl.js.map
