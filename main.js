const { app, BrowserWindow } = require("electron");

let mainWindow = null;
async function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1000,
		height: 800,
		titleBarStyle: "customButtonOnHover",
	});

	await mainWindow.loadFile("./src/pages/notes/index.html");
}

app.whenReady().then(createWindow);

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
