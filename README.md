# Obsidian Note Gallery
Obsidian Note Gallery is a masonry style note gallery for [Obsidian](https://obsidian.md/).

**Brand new thing in active development...**

# Functionality
## Current
- Currently works as an image gallery and let's you create a masonry image gallery inside a note
- Has options for sorting, # of results and recursively scanning folders

## WIP
- Rendering markdown notes as a masonry gallery, similar to "Safari overview mode" or "Craft-like folder view"
- Showing currently open tabs as a Masonry gallery

# Alpha Installation
1. Install BRAT from the Community Plugins in Obsidian
  1.1 Enable the BRAT plugin in the settings
2. Open the command palette (CMD/CTRL + P) and run the command BRAT: `Add a beta plugin for testing`
3. Enter the following URL: `https://github.com/pashashocky/obsidian-note-gallery`
4. Enable the `Note Gallery` plugin in the `Community Plugins` tab in settings
5. Create a code block similar to the below in any of your notes

```
~~~~note-gallery     #           default | options
path: Atlas          # optional: current note folder | path/to/folder
limit: 10            # optional: 0 | any number
recursive: true      # optional: true | false
sort: desc           # optional: desc | asc
sortby: mtime        # optional: mtime | ctime | name
~~~~
```

- please feel free to leave any bugs or feature requests in issues.
