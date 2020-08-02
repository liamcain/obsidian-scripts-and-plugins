import { clipboard } from "electron";

module.exports = () => {
  class VimTweaksPlugin {
    constructor() {
      this.id = "vim-tweaks";
      this.name = "VIM Tweaks";
      this.description = "Small tweaks to improve CodeMirror vim-mode";
      this.defaultOn = true;

      this.app = null;
      this.instance = null;
      this.CodeMirror = window.CodeMirror;
    }

    init(app, instance) {
      this.app = app;
      this.instance = instance;
    }

    onEnable() {
      // set clipboard=unnamed
      const unnamedRegister = this.CodeMirror.Vim.getRegisterController()[
        "unnamedRegister"
      ];
      const defaultSetText = unnamedRegister.setText.bind(unnamedRegister);
      unnamedRegister.setText = function (text, linewise, blockwise) {
        defaultSetText(text, linewise, blockwise);
        clipboard.writeText(text);
      };

      // noremap <silent> k gk
      // noremap <silent> j gj
      this.CodeMirror.Vim.map("k", "gk");
      this.CodeMirror.Vim.map("j", "gj");
    }

    onDisable() {
      // reset unnamed register's `.setText`
      const unnamedRegister = this.CodeMirror.Vim.getRegisterController()[
        "unnamedRegister"
      ];
      unnamedRegister.setText = unnamedRegister.__proto__.setText;
    }
  }

  return new VimTweaksPlugin();
};
