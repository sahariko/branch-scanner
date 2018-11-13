const isWindows = process.platform === "win32";

const windowsCommand = 'cls';
const macCommand = '\x1b[H\x1b[J';
const command = isWindows ? windowsCommand : macCommand;

module.exports = () => {
    console.log(command);
};
