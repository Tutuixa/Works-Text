const { app, BrowserWindow, Menu } = require("electron");

let mainWindow = null;
async function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1000,
		height: 800,
	});

	await mainWindow.loadFile("./src/pages/notes/index.html");
}
//Arquivo
let file = {};

//Criar arquivo
function createNewFile() {
	file = {
		name: "novo-arquivo.txt",
		content: "",
		saved: false,
		path: `${app.getPath("documents")}/novo-arquivo.txt`,
	};

	mainWindow.webContents.send("set-file", file);
}

const templateMenu = [
	{
		label: "Arquivo'",
		submenu: [
			{
				label: "Novo",
				click() {
					createNewFile();
				},
			},
			{
				label: "Abrir",
			},
			{
				label: "Salvar",
			},
			{
				label: "Salvar como",
			},
			{
				label: "Fechar",
				role: process.platform === "darwin" ? "close" : quit,
			},
		],
	},
];

const menu = Menu.buildFromTemplate(templateMenu);
Menu.setApplicationMenu(menu);

app.whenReady().then(createWindow);

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
