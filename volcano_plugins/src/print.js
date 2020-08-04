function htmlToElements(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstChild;
}

module.exports = () => {
  class PrintPlugin {
    constructor() {
      this.id = "print";
      this.name = "Print";
      this.description = "Print a markdown file";
      this.defaultOn = true;

      this.app = null;
      this.instance = null;
    }

    init(app, instance) {
      this.app = app;
      this.instance = instance;
      this.instance.registerGlobalCommand({
        id: "print-file",
        name: "Print file",
        callback: this.printFile.bind(this),
      });
    }

    printFile() {
      const { activeLeaf } = this.app.workspace;

      const fileContent = activeLeaf.containerEl.find(".markdown-preview-view");
      const printFrame = document.createElement("iframe");
      printFrame.setAttribute(
        "style",
        "visibility: hidden; height: 0; width: 0; position: absolute;"
      );
      document.body.appendChild(printFrame);

      const printContainer = htmlToElements(fileContent.innerHTML);
      printFrame.contentWindow.document.body.appendChild(printContainer);
      printFrame.contentWindow.print();
      printFrame.contentWindow.close();
    }

    onEnable() {}
    onLoad() {}
  }
  return new PrintPlugin();
};
