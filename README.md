This is a simple note taking project.
-
It contains 2 .js files, on the Express_MiniProject folder, **notes_app.js** and **app.js**.

The notes are saved in a json called **notes.json**.

- **notes_app.js** is a command-line note taking app.

- **app.js** works as an API using the ExpressJS module, and uses the functionallity of note_app.js.

The **[Project Library]** folder contains beginner friendly js code (for learning purposes, not related to this content but its there for anyone to check out).

In the **Express_MiniProject folder**,is the app, with simple functionallity like:
1. Add note.
2. Delete note. (with ID).
3. Search note. (with title name, will return all notes that match the substring of the search value).
4. List all notes.
5. Update note.

### Conditions ###

- Notes must have different titles.
- All notes have different IDs.

**Command-line** usage example:
-
<img src="https://github.com/user-attachments/assets/2fa6a02b-2ca8-48f5-a99f-8191791901a7" width="600" height="400" />

**API** usage example:
-

## Start Server ##

<img src="https://github.com/user-attachments/assets/ea2addd6-7cb2-40e3-9232-e170fc744a2c" width="350" height="300" />


### [Add note] ###

**POST /notes**

In the body of POST, add the payload like so:

```json
{
    "title":"note title",
    "body": "note content"
}
```

### [Delete note] ###

**DELETE /notes/noteId**

### [Search note] ###

**GET /notes/noteTitle**

### [List all notes] ###

**GET /notes**
