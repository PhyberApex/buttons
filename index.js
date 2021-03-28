/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/

'use strict';

var obsidian = require('obsidian');

const createArgumentObject = (source) => source.split("\n").reduce((acc, i) => {
    const split = i.split(" ");
    const key = split[0];
    acc[key] = split.filter((item) => item !== split[0]).join(" ");
    return acc;
}, {});
const removeButton = async (app, buttonName) => {
    const activeView = app.workspace.getActiveViewOfType(obsidian.MarkdownView);
    if (activeView) {
        const file = activeView.file;
        const originalContent = await app.vault.read(file);
        const button = `\u0060{3}button\nname ${buttonName}.*?remove true\n\u0060{3}`;
        const re = new RegExp(button, "gms");
        const splitContent = originalContent.split(re);
        const content = `${splitContent[0]} ${splitContent[1]}`;
        await app.vault.modify(file, content);
    }
    else {
        new obsidian.Notice("There was an issue adding content, please try again", 2000);
    }
};
const prependContent = async (app, insert, buttonName) => {
    const activeView = app.workspace.getActiveViewOfType(obsidian.MarkdownView);
    if (activeView) {
        const file = activeView.file;
        const originalContent = await app.vault.read(file);
        const buttonRegex = `\u0060{3}button\nname ${buttonName}.*?\n\u0060{3}`;
        const re = new RegExp(buttonRegex, "gms");
        const button = originalContent.match(re)[0];
        const splitContent = originalContent.split(re);
        const content = `${splitContent[0] ? splitContent[0] : ""}
${insert}
${button}
${splitContent[1] ? splitContent[1] : ""}`;
        await app.vault.modify(file, content);
    }
    else {
        new obsidian.Notice("There was an issue prepending content, please try again", 2000);
    }
};
const appendContent = async (app, insert, buttonName) => {
    const activeView = app.workspace.getActiveViewOfType(obsidian.MarkdownView);
    if (activeView) {
        const file = activeView.file;
        const originalContent = await app.vault.read(file);
        const buttonRegex = `\u0060{3}button\nname ${buttonName}.*?\n\u0060{3}`;
        const re = new RegExp(buttonRegex, "gms");
        const button = originalContent.match(re);
        const splitContent = originalContent.split(re);
        const content = `${splitContent[0] ? splitContent[0] : ""}
${button}
${insert}
${splitContent[1] ? splitContent[1] : ""}`;
        await app.vault.modify(file, content);
    }
    else {
        new obsidian.Notice("There was an issue appending content, please try again", 2000);
    }
};

const remove = (app, { name }) => {
    setTimeout(() => removeButton(app, name), 100);
};
const template = async (app, { name, type, action }) => {
    console.log("template button");
    const templatesEnabled = app.internalPlugins.plugins.templates.enabled;
    //only run if templates plugin is enabled
    if (templatesEnabled) {
        const folder = app.internalPlugins.plugins.templates.instance.options.folder;
        const allFiles = app.vault.getFiles();
        const file = allFiles.filter((file) => file.path === `${folder}/${action}.md`)[0];
        if (file) {
            const content = await app.vault.read(file);
            //prepend template above the button
            if (type.includes("prepend")) {
                prependContent(app, content, name);
                setTimeout(() => app.commands.executeCommandById("templater-obsidian:replace-in-file-templater"), 100);
            }
            // append template below the button
            if (type.includes("append")) {
                appendContent(app, content, name);
                setTimeout(() => app.commands.executeCommandById("templater-obsidian:replace-in-file-templater"), 100);
            }
        }
        else {
            new obsidian.Notice(`Couldn't find the specified template, please check and try again`, 2000);
        }
    }
    else {
        new obsidian.Notice("You need to have the Templates plugin enabled", 2000);
    }
};
const link = ({ action }) => {
    const link = action.trim();
    window.open(link);
};
const command = (app, { action }) => {
    const allCommands = app.commands.listCommands();
    const command = allCommands.filter((command) => command.name.toUpperCase() === action.toUpperCase().trim())[0];
    app.commands.executeCommandById(command.id);
};

//extend the obsidian module with some additional typings
class ButtonsPLugin extends obsidian.Plugin {
    async onload() {
        this.registerMarkdownCodeBlockProcessor("button", async (source, el) => {
            // create an object out of the arguments
            const args = createArgumentObject(source);
            //handle button clicks
            const clickHandler = async () => {
                //handle command buttons
                if (args.type === "command") {
                    command(this.app, args);
                }
                //handle link buttons
                if (args.type === "link") {
                    link(args);
                }
                //handle template buttons
                if (args.type.includes("template")) {
                    template(this.app, args);
                }
                //handle removing the button
                if (args.remove) {
                    remove(this.app, args);
                }
            };
            //create the button element
            const button = el.createEl("button", {
                text: args.name,
                cls: args.class
                    ? `${args.class} ${args.color}`
                    : `button-default ${args.color ? args.color : ""}`,
            });
            args.id ? button.setAttribute("id", args.id) : "";
            button.on("click", "button", () => {
                clickHandler();
            });
        });
    }
}

module.exports = ButtonsPLugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbInNyYy91dGlscy50cyIsInNyYy9idXR0b25UeXBlcy50cyIsInNyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXJrZG93blZpZXcsIEFwcCwgTm90aWNlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBBcmd1bWVudHMgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQXJndW1lbnRPYmplY3QgPSAoc291cmNlOiBzdHJpbmcpOiBBcmd1bWVudHMgPT5cbiAgc291cmNlLnNwbGl0KFwiXFxuXCIpLnJlZHVjZSgoYWNjOiBBcmd1bWVudHMsIGk6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHNwbGl0OiBzdHJpbmdbXSA9IGkuc3BsaXQoXCIgXCIpO1xuICAgIGNvbnN0IGtleTogc3RyaW5nID0gc3BsaXRbMF07XG4gICAgYWNjW2tleV0gPSBzcGxpdC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IHNwbGl0WzBdKS5qb2luKFwiIFwiKTtcbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG5cbmV4cG9ydCBjb25zdCByZW1vdmVCdXR0b24gPSBhc3luYyAoXG4gIGFwcDogQXBwLFxuICBidXR0b25OYW1lOiBzdHJpbmdcbik6IFByb21pc2U8dm9pZD4gPT4ge1xuICBjb25zdCBhY3RpdmVWaWV3ID0gYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XG4gIGlmIChhY3RpdmVWaWV3KSB7XG4gICAgY29uc3QgZmlsZSA9IGFjdGl2ZVZpZXcuZmlsZTtcbiAgICBjb25zdCBvcmlnaW5hbENvbnRlbnQgPSBhd2FpdCBhcHAudmF1bHQucmVhZChmaWxlKTtcbiAgICBjb25zdCBidXR0b24gPSBgXFx1MDA2MHszfWJ1dHRvblxcbm5hbWUgJHtidXR0b25OYW1lfS4qP3JlbW92ZSB0cnVlXFxuXFx1MDA2MHszfWA7XG4gICAgY29uc3QgcmUgPSBuZXcgUmVnRXhwKGJ1dHRvbiwgXCJnbXNcIik7XG4gICAgY29uc3Qgc3BsaXRDb250ZW50ID0gb3JpZ2luYWxDb250ZW50LnNwbGl0KHJlKTtcbiAgICBjb25zdCBjb250ZW50ID0gYCR7c3BsaXRDb250ZW50WzBdfSAke3NwbGl0Q29udGVudFsxXX1gO1xuICAgIGF3YWl0IGFwcC52YXVsdC5tb2RpZnkoZmlsZSwgY29udGVudCk7XG4gIH0gZWxzZSB7XG4gICAgbmV3IE5vdGljZShcIlRoZXJlIHdhcyBhbiBpc3N1ZSBhZGRpbmcgY29udGVudCwgcGxlYXNlIHRyeSBhZ2FpblwiLCAyMDAwKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHByZXBlbmRDb250ZW50ID0gYXN5bmMgKFxuICBhcHA6IEFwcCxcbiAgaW5zZXJ0OiBzdHJpbmcsXG4gIGJ1dHRvbk5hbWU6IHN0cmluZ1xuKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGNvbnN0IGFjdGl2ZVZpZXcgPSBhcHAud29ya3NwYWNlLmdldEFjdGl2ZVZpZXdPZlR5cGUoTWFya2Rvd25WaWV3KTtcbiAgaWYgKGFjdGl2ZVZpZXcpIHtcbiAgICBjb25zdCBmaWxlID0gYWN0aXZlVmlldy5maWxlO1xuICAgIGNvbnN0IG9yaWdpbmFsQ29udGVudCA9IGF3YWl0IGFwcC52YXVsdC5yZWFkKGZpbGUpO1xuICAgIGNvbnN0IGJ1dHRvblJlZ2V4ID0gYFxcdTAwNjB7M31idXR0b25cXG5uYW1lICR7YnV0dG9uTmFtZX0uKj9cXG5cXHUwMDYwezN9YDtcbiAgICBjb25zdCByZSA9IG5ldyBSZWdFeHAoYnV0dG9uUmVnZXgsIFwiZ21zXCIpO1xuICAgIGNvbnN0IGJ1dHRvbiA9IG9yaWdpbmFsQ29udGVudC5tYXRjaChyZSlbMF07XG4gICAgY29uc3Qgc3BsaXRDb250ZW50ID0gb3JpZ2luYWxDb250ZW50LnNwbGl0KHJlKTtcbiAgICBjb25zdCBjb250ZW50ID0gYCR7c3BsaXRDb250ZW50WzBdID8gc3BsaXRDb250ZW50WzBdIDogXCJcIn1cbiR7aW5zZXJ0fVxuJHtidXR0b259XG4ke3NwbGl0Q29udGVudFsxXSA/IHNwbGl0Q29udGVudFsxXSA6IFwiXCJ9YDtcbiAgICBhd2FpdCBhcHAudmF1bHQubW9kaWZ5KGZpbGUsIGNvbnRlbnQpO1xuICB9IGVsc2Uge1xuICAgIG5ldyBOb3RpY2UoXCJUaGVyZSB3YXMgYW4gaXNzdWUgcHJlcGVuZGluZyBjb250ZW50LCBwbGVhc2UgdHJ5IGFnYWluXCIsIDIwMDApO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgYXBwZW5kQ29udGVudCA9IGFzeW5jIChcbiAgYXBwOiBBcHAsXG4gIGluc2VydDogc3RyaW5nLFxuICBidXR0b25OYW1lOiBzdHJpbmdcbik6IFByb21pc2U8dm9pZD4gPT4ge1xuICBjb25zdCBhY3RpdmVWaWV3ID0gYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XG4gIGlmIChhY3RpdmVWaWV3KSB7XG4gICAgY29uc3QgZmlsZSA9IGFjdGl2ZVZpZXcuZmlsZTtcbiAgICBjb25zdCBvcmlnaW5hbENvbnRlbnQgPSBhd2FpdCBhcHAudmF1bHQucmVhZChmaWxlKTtcbiAgICBjb25zdCBidXR0b25SZWdleCA9IGBcXHUwMDYwezN9YnV0dG9uXFxubmFtZSAke2J1dHRvbk5hbWV9Lio/XFxuXFx1MDA2MHszfWA7XG4gICAgY29uc3QgcmUgPSBuZXcgUmVnRXhwKGJ1dHRvblJlZ2V4LCBcImdtc1wiKTtcbiAgICBjb25zdCBidXR0b24gPSBvcmlnaW5hbENvbnRlbnQubWF0Y2gocmUpO1xuICAgIGNvbnN0IHNwbGl0Q29udGVudCA9IG9yaWdpbmFsQ29udGVudC5zcGxpdChyZSk7XG4gICAgY29uc3QgY29udGVudCA9IGAke3NwbGl0Q29udGVudFswXSA/IHNwbGl0Q29udGVudFswXSA6IFwiXCJ9XG4ke2J1dHRvbn1cbiR7aW5zZXJ0fVxuJHtzcGxpdENvbnRlbnRbMV0gPyBzcGxpdENvbnRlbnRbMV0gOiBcIlwifWA7XG4gICAgYXdhaXQgYXBwLnZhdWx0Lm1vZGlmeShmaWxlLCBjb250ZW50KTtcbiAgfSBlbHNlIHtcbiAgICBuZXcgTm90aWNlKFwiVGhlcmUgd2FzIGFuIGlzc3VlIGFwcGVuZGluZyBjb250ZW50LCBwbGVhc2UgdHJ5IGFnYWluXCIsIDIwMDApO1xuICB9XG59O1xuIiwiaW1wb3J0IHsgQXBwLCBURmlsZSwgTm90aWNlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyByZW1vdmVCdXR0b24sIGFwcGVuZENvbnRlbnQsIHByZXBlbmRDb250ZW50IH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7IEFyZ3VtZW50cyB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCByZW1vdmUgPSAoYXBwOiBBcHAsIHsgbmFtZSB9OiBBcmd1bWVudHMpOiB2b2lkID0+IHtcbiAgc2V0VGltZW91dCgoKSA9PiByZW1vdmVCdXR0b24oYXBwLCBuYW1lKSwgMTAwKTtcbn07XG5cbmV4cG9ydCBjb25zdCB0ZW1wbGF0ZSA9IGFzeW5jIChcbiAgYXBwOiBBcHAsXG4gIHsgbmFtZSwgdHlwZSwgYWN0aW9uIH06IEFyZ3VtZW50c1xuKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGNvbnNvbGUubG9nKFwidGVtcGxhdGUgYnV0dG9uXCIpO1xuICBjb25zdCB0ZW1wbGF0ZXNFbmFibGVkID0gYXBwLmludGVybmFsUGx1Z2lucy5wbHVnaW5zLnRlbXBsYXRlcy5lbmFibGVkO1xuICAvL29ubHkgcnVuIGlmIHRlbXBsYXRlcyBwbHVnaW4gaXMgZW5hYmxlZFxuICBpZiAodGVtcGxhdGVzRW5hYmxlZCkge1xuICAgIGNvbnN0IGZvbGRlciA9XG4gICAgICBhcHAuaW50ZXJuYWxQbHVnaW5zLnBsdWdpbnMudGVtcGxhdGVzLmluc3RhbmNlLm9wdGlvbnMuZm9sZGVyO1xuICAgIGNvbnN0IGFsbEZpbGVzID0gYXBwLnZhdWx0LmdldEZpbGVzKCk7XG4gICAgY29uc3QgZmlsZTogVEZpbGUgPSBhbGxGaWxlcy5maWx0ZXIoXG4gICAgICAoZmlsZSkgPT4gZmlsZS5wYXRoID09PSBgJHtmb2xkZXJ9LyR7YWN0aW9ufS5tZGBcbiAgICApWzBdO1xuICAgIGlmIChmaWxlKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgYXBwLnZhdWx0LnJlYWQoZmlsZSk7XG4gICAgICAvL3ByZXBlbmQgdGVtcGxhdGUgYWJvdmUgdGhlIGJ1dHRvblxuICAgICAgaWYgKHR5cGUuaW5jbHVkZXMoXCJwcmVwZW5kXCIpKSB7XG4gICAgICAgIHByZXBlbmRDb250ZW50KGFwcCwgY29udGVudCwgbmFtZSk7XG4gICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgKCkgPT5cbiAgICAgICAgICAgIGFwcC5jb21tYW5kcy5leGVjdXRlQ29tbWFuZEJ5SWQoXG4gICAgICAgICAgICAgIFwidGVtcGxhdGVyLW9ic2lkaWFuOnJlcGxhY2UtaW4tZmlsZS10ZW1wbGF0ZXJcIlxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAxMDBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIC8vIGFwcGVuZCB0ZW1wbGF0ZSBiZWxvdyB0aGUgYnV0dG9uXG4gICAgICBpZiAodHlwZS5pbmNsdWRlcyhcImFwcGVuZFwiKSkge1xuICAgICAgICBhcHBlbmRDb250ZW50KGFwcCwgY29udGVudCwgbmFtZSk7XG4gICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgKCkgPT5cbiAgICAgICAgICAgIGFwcC5jb21tYW5kcy5leGVjdXRlQ29tbWFuZEJ5SWQoXG4gICAgICAgICAgICAgIFwidGVtcGxhdGVyLW9ic2lkaWFuOnJlcGxhY2UtaW4tZmlsZS10ZW1wbGF0ZXJcIlxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAxMDBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbmV3IE5vdGljZShcbiAgICAgICAgYENvdWxkbid0IGZpbmQgdGhlIHNwZWNpZmllZCB0ZW1wbGF0ZSwgcGxlYXNlIGNoZWNrIGFuZCB0cnkgYWdhaW5gLFxuICAgICAgICAyMDAwXG4gICAgICApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBuZXcgTm90aWNlKFwiWW91IG5lZWQgdG8gaGF2ZSB0aGUgVGVtcGxhdGVzIHBsdWdpbiBlbmFibGVkXCIsIDIwMDApO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgbGluayA9ICh7IGFjdGlvbiB9OiBBcmd1bWVudHMpOiB2b2lkID0+IHtcbiAgY29uc3QgbGluayA9IGFjdGlvbi50cmltKCk7XG4gIHdpbmRvdy5vcGVuKGxpbmspO1xufTtcblxuZXhwb3J0IGNvbnN0IGNvbW1hbmQgPSAoYXBwOiBBcHAsIHsgYWN0aW9uIH06IEFyZ3VtZW50cyk6IHZvaWQgPT4ge1xuICBjb25zdCBhbGxDb21tYW5kcyA9IGFwcC5jb21tYW5kcy5saXN0Q29tbWFuZHMoKTtcbiAgY29uc3QgY29tbWFuZCA9IGFsbENvbW1hbmRzLmZpbHRlcihcbiAgICAoY29tbWFuZCkgPT4gY29tbWFuZC5uYW1lLnRvVXBwZXJDYXNlKCkgPT09IGFjdGlvbi50b1VwcGVyQ2FzZSgpLnRyaW0oKVxuICApWzBdO1xuICBhcHAuY29tbWFuZHMuZXhlY3V0ZUNvbW1hbmRCeUlkKGNvbW1hbmQuaWQpO1xufTtcbiIsImltcG9ydCB7IFBsdWdpbiB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgY3JlYXRlQXJndW1lbnRPYmplY3QgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHsgcmVtb3ZlLCB0ZW1wbGF0ZSwgbGluaywgY29tbWFuZCB9IGZyb20gXCIuL2J1dHRvblR5cGVzXCI7XG5cbi8vZXh0ZW5kIHRoZSBvYnNpZGlhbiBtb2R1bGUgd2l0aCBzb21lIGFkZGl0aW9uYWwgdHlwaW5nc1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXR0b25zUEx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcbiAgYXN5bmMgb25sb2FkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMucmVnaXN0ZXJNYXJrZG93bkNvZGVCbG9ja1Byb2Nlc3NvcihcImJ1dHRvblwiLCBhc3luYyAoc291cmNlLCBlbCkgPT4ge1xuICAgICAgLy8gY3JlYXRlIGFuIG9iamVjdCBvdXQgb2YgdGhlIGFyZ3VtZW50c1xuICAgICAgY29uc3QgYXJncyA9IGNyZWF0ZUFyZ3VtZW50T2JqZWN0KHNvdXJjZSk7XG4gICAgICAvL2hhbmRsZSBidXR0b24gY2xpY2tzXG4gICAgICBjb25zdCBjbGlja0hhbmRsZXIgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIC8vaGFuZGxlIGNvbW1hbmQgYnV0dG9uc1xuICAgICAgICBpZiAoYXJncy50eXBlID09PSBcImNvbW1hbmRcIikge1xuICAgICAgICAgIGNvbW1hbmQodGhpcy5hcHAsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIC8vaGFuZGxlIGxpbmsgYnV0dG9uc1xuICAgICAgICBpZiAoYXJncy50eXBlID09PSBcImxpbmtcIikge1xuICAgICAgICAgIGxpbmsoYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgLy9oYW5kbGUgdGVtcGxhdGUgYnV0dG9uc1xuICAgICAgICBpZiAoYXJncy50eXBlLmluY2x1ZGVzKFwidGVtcGxhdGVcIikpIHtcbiAgICAgICAgICB0ZW1wbGF0ZSh0aGlzLmFwcCwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgLy9oYW5kbGUgcmVtb3ZpbmcgdGhlIGJ1dHRvblxuICAgICAgICBpZiAoYXJncy5yZW1vdmUpIHtcbiAgICAgICAgICByZW1vdmUodGhpcy5hcHAsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgLy9jcmVhdGUgdGhlIGJ1dHRvbiBlbGVtZW50XG4gICAgICBjb25zdCBidXR0b24gPSBlbC5jcmVhdGVFbChcImJ1dHRvblwiLCB7XG4gICAgICAgIHRleHQ6IGFyZ3MubmFtZSxcbiAgICAgICAgY2xzOiBhcmdzLmNsYXNzXG4gICAgICAgICAgPyBgJHthcmdzLmNsYXNzfSAke2FyZ3MuY29sb3J9YFxuICAgICAgICAgIDogYGJ1dHRvbi1kZWZhdWx0ICR7YXJncy5jb2xvciA/IGFyZ3MuY29sb3IgOiBcIlwifWAsXG4gICAgICB9KTtcbiAgICAgIGFyZ3MuaWQgPyBidXR0b24uc2V0QXR0cmlidXRlKFwiaWRcIiwgYXJncy5pZCkgOiBcIlwiO1xuICAgICAgYnV0dG9uLm9uKFwiY2xpY2tcIiwgXCJidXR0b25cIiwgKCkgPT4ge1xuICAgICAgICBjbGlja0hhbmRsZXIoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTWFya2Rvd25WaWV3IiwiTm90aWNlIiwiUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFHTyxNQUFNLG9CQUFvQixHQUFHLENBQUMsTUFBYyxLQUNqRCxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQWMsRUFBRSxDQUFTO0lBQ2xELE1BQU0sS0FBSyxHQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckMsTUFBTSxHQUFHLEdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFRixNQUFNLFlBQVksR0FBRyxPQUMxQixHQUFRLEVBQ1IsVUFBa0I7SUFFbEIsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQ0EscUJBQVksQ0FBQyxDQUFDO0lBQ25FLElBQUksVUFBVSxFQUFFO1FBQ2QsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM3QixNQUFNLGVBQWUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELE1B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
