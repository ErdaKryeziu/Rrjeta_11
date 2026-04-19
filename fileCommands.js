const fs = require("fs");
const path = require("path");

const filesDir = path.join(__dirname, "files");
if (!fs.existsSync(filesDir)) fs.mkdirSync(filesDir);

function list() {
    const files = fs.readdirSync(filesDir);
    return files.join("\n") || "No files\n";
}

function read(name) {
    const file = path.join(filesDir, name);
    if (fs.existsSync(file)) return fs.readFileSync(file, "utf8");
    return "File not found\n";
}

function upload(name, content) {
    fs.writeFileSync(path.join(filesDir, name), content);
    return "Uploaded\n";
}

function download(name) {
    const file = path.join(filesDir, name);
    if (fs.existsSync(file)) return fs.readFileSync(file);
    return "File not found\n";
}

function remove(name) {
    const file = path.join(filesDir, name);
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        return "Deleted\n";
    }
    return "File not found\n";
}

function search(keyword) {
    const result = fs.readdirSync(filesDir)
        .filter(f => f.includes(keyword));
    return result.join("\n") || "No match\n";
}

function info(name) {
    const file = path.join(filesDir, name);
    if (fs.existsSync(file)) {
        const stat = fs.statSync(file);
        return `Size:${stat.size} Created:${stat.birthtime} Modified:${stat.mtime}\n`;
    }
    return "File not found\n";
}

module.exports = {
    list,
    read,
    upload,
    download,
    remove,
    search,
    info
};
