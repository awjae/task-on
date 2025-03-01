import { app, BrowserWindow, screen } from 'electron';
import App from './app/app';
import ElectronEvents from './app/events/electron.events';
import SquirrelEvents from './app/events/squirrel.events';

function createWindow() {
  const workAreaSize = screen.getPrimaryDisplay().workAreaSize;
  const width = Math.min(320, workAreaSize.width || 320);
  const height = Math.min(420, workAreaSize.height || 420);
  const win = new BrowserWindow({
    width,
    height,
    resizable: false,
    frame: false,
    titleBarStyle: 'hidden',
    show: true,
    webPreferences: {
      contextIsolation: true,
      backgroundThrottling: false,
      nodeIntegrationInWorker: true,
      nodeIntegration: false,
      devTools: true,
    },
  });

  // 지정된 URL을 로드합니다.
  win.loadURL('http://localhost:3000/');
}

export default class Main {
  static initialize() {
    if (SquirrelEvents.handleEvents()) {
      // squirrel event handled (except first run event) and app will exit in 1000ms, so don't do anything else
      app.quit();
    } else {
      app.whenReady().then(() => {
        Main.bootstrapApp();
        Main.bootstrapAppEvents();
      });
    }
  }

  static bootstrapApp() {
    // App.main(app, BrowserWindow);
    createWindow();
  }

  static bootstrapAppEvents() {
    ElectronEvents.bootstrapElectronEvents();

    // initialize auto updater service
    if (!App.isDevelopmentMode()) {
      // UpdateEvents.initAutoUpdateService();
    }
  }
}

// handle setup events as quickly as possible
Main.initialize();