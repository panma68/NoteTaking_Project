This is a simple note taking project.
-
It contains 2 .js files, on the Express_MiniProject folder, **notes_app.js** and **app.js**.

The notes are saved in a json called **notes.json**.

- **notes_app.js** is a command-line note taking.

- **app.js** works as an API using the ExpressJS module, and uses the functionallity of note_app.js.

It has simple functionallity like:
1. Add note.
2. Delete note. (with ID).
3. Search note. (with title name).
4. List all notes.

**Command-line** usage example:
-
<img src="https://github.com/user-attachments/assets/2fa6a02b-2ca8-48f5-a99f-8191791901a7" width="600" height="400" />

**API** usage example:
-
- Add note:

**POST /notes**

In the body of POST, format the note like so to add it.

```json
{
    "title":"note title",
    "body": "note content"
}
```
