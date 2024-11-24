const { app, BrowserWindow } = require('electron');

let mainWindow = null;
async function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1000,
		height: 800,
	});

	await mainWindow.loadFile('./src/pages/notes/index.html');
}

app.whenReady().then(createWindow);

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

const ffmpeg = require('fluent-ffmpeg');

//Get the paths to the packaged versions of the binaries we want to use
const ffmpegPath = require('ffmpeg-static').replace(
	'app.asar',
	'app.asar.unpacked'
);
const ffprobePath = require('ffprobe-static').path.replace(
	'app.asar',
	'app.asar.unpacked'
);

//tell the ffmpeg package where it can find the needed binaries.
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
