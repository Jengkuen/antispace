//@ts-nocheck
import { Antispace, UI } from "@antispace/sdk";
import manifest from "./manifest";
import aiActions from "./ai";
import widgetUI from "./ui/widget";
import pageUI from "./ui/page";

// Create a new Antispace app with the manifest
const app = new Antispace({
  manifest,
  ai: aiActions
});

// Add UI routes for the widget and page
app.ui.add("/", widgetUI);
app.ui.add("/page", pageUI);

// Start the app
app.start(); 