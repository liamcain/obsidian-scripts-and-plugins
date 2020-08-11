import Handlebars from "handlebars";
import fs from "fs";

// const dailyNoteSkeleton = fs
//   .readFileSync("~/volcano/templates/daily_note.hbs")
//   .toString();
// const dailyNoteTemplate = Handlebars.compile(dailyNoteSkeleton);

module.exports = () => {
  class NoteWithTemplatePlugin {
    constructor() {
      this.id = "note-with-template";
      this.name = "New Note with Template";
      this.description = "Create a new note with a given template";
      this.defaultOn = false;

      this.app = null;
      this.instance = null;
    }

    init(app, instance) {
      this.app = app;
      this.instance = instance;

      this.instance.registerGlobalCommand({
        id: "create-from-template",
        name: "Create new file from template...",
        callback: this._createFile.bind(this),
      });
    }

    _openFileByName(filename) {
      const fileObj = this.app.vault.fileMap[filename];
      this.app.workspace.activeLeaf.openFile(fileObj);
    }

    _openFile(fileObj) {
      this.app.workspace.activeLeaf.openFile(fileObj);
      return fileObj;
    }

    _createFile() {
      const filename = "testing12345";

      // TODO how to refresh the active pane?
      this.app.fileManager
        .createNewMarkdownFile("", filename)
        .then(this._openFile.bind(this))
        .then((createdFile) => {
          this.app.vault.modify(
            createdFile,
            dailyNoteTemplate({
              todayHeader: "title", // TODO
            })
          );
          return createdFile;
        });
    }

    onEnable() {}
    onLoad() {}
  }

  return new NoteWithTemplatePlugin();
};
