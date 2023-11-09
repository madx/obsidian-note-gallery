import {
  App,
  TFolder,
  TFile,
  FileStats,
  TAbstractFile,
  Vault,
  MarkdownPostProcessorContext,
} from "obsidian";
import { Settings } from "~/code-block/settings";
import renderError from "~/code-block/errors";

type WVault = Vault & {
  getAbstractFileByPathInsensitive?: null | ((path: string) => TAbstractFile | null);
};

const VALID_EXTENSIONS = ["jpeg", "jpg", "gif", "png", "webp", "tiff", "tif", "md"];

const getChildren = (children: TAbstractFile[], recursive = false) =>
  children.reduce((acc, v) => {
    if (recursive && v instanceof TFolder) {
      acc = acc.concat(getChildren(v.children, true));
    } else if (v instanceof TFile) {
      acc.push(v);
    }
    return acc;
  }, [] as Array<TFile>);

const getPath = (app: App, path: string) => {
  const { vault } = app;
  const wVault: WVault = vault;
  if (wVault.getAbstractFileByPathInsensitive) {
    return wVault.getAbstractFileByPathInsensitive(path);
  }
  return vault.getAbstractFileByPath(path);
};

const getFileList = (
  app: App,
  ctx: MarkdownPostProcessorContext,
  container: HTMLElement,
  settings: Settings,
) => {
  // retrieve a list of files in the settings.path
  // and if specified by settings.recursive fetch the files
  // in all the subfolders.
  let files: TFile[];
  const folder = getPath(app, settings.path);
  if (folder instanceof TFolder) {
    files = getChildren(folder.children, settings.recursive);
  } else {
    const error = "The folder doesn't exist, or it's empty!";
    renderError(container, error);
    throw new Error(error);
  }

  // filter + sort
  files = files
    .filter(file => file.path !== ctx.sourcePath)
    .filter(file => VALID_EXTENSIONS.includes(file.extension))
    .sort((a: TFile, b: TFile) => {
      const refA =
        settings.sortby === "name"
          ? a["name"].toUpperCase()
          : a.stat[settings.sortby as keyof FileStats];
      const refB =
        settings.sortby === "name"
          ? b["name"].toUpperCase()
          : b.stat[settings.sortby as keyof FileStats];
      return refA < refB ? -1 : refA > refB ? 1 : 0;
    });
  files = settings.sort === "asc" ? files : files.reverse();
  files = settings.limit === 0 ? files : files.splice(0, settings.limit);

  return files;
};

export default getFileList;
