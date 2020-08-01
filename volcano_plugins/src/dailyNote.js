import electron from "electron";
import fs from "fs";
import Handlebars from "handlebars";
import moment from "moment";
import path from "path";

class NoteWithTemplatePlugin {
  constructor() {
    this.id = "daily-notes-dynamic";
    this.name = "Dynamic Daily Notes";
    this.description = "Create a new daily note";
    this.defaultOn = true;

    this.app = null;
    this.instance = null;
    this.volcanoPath = path.join(
      electron.remote.app.getPath("home"),
      "volcano"
    );
  }

  init(app, instance) {
    this.app = app;
    this.instance = instance;

    this.instance.registerGlobalCommand({
      id: "daily-note-dynamic",
      name: "Open today's note",
      callback: this._openDailyNote.bind(this),
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

  _fileExistsInVault(filename) {
    return !!this.app.vault.fileMap[filename];
  }

  _openDailyNote() {
    const today = moment();
    const todaysFilename = `${today.format("YYYY-MM-DD")}.md`;

    if (this._fileExistsInVault(todaysFilename)) {
      console.info(`${todaysFilename} exists. Opening...`);
      this._openFile(todaysFilename);
      return;
    }

    const dailyNoteSkeleton = fs
      .readFileSync(`${this.volcanoPath}/templates/daily_note.hbs`)
      .toString();
    const dailyNoteTemplate = Handlebars.compile(dailyNoteSkeleton);

    const dailyNoteContents = dailyNoteTemplate({
      todayHeader: today.format("ddd MMMM DD, YYYY"),
    });

    this._createFile(todaysFilename, dailyNoteContents);
  }

  _createFile(filename, contents) {
    // TODO how to refresh the active pane?
    this.app.fileManager
      .createNewMarkdownFile("", filename)
      .then(this._openFile.bind(this))
      .then((createdFile) => {
        this.app.vault.modify(createdFile, contents);
        return createdFile;
      });
  }

  onEnable() {}
  onLoad() {}
}

module.exports = () => new NoteWithTemplatePlugin();
