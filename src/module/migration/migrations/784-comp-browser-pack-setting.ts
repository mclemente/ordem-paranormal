import { MigrationBase } from "../base";

/** Migrate Compendium Browser packs selection setting to an object */
export class Migration784CompBrowserPackSetting extends MigrationBase {
    static override version = 0.784;

    override async migrate(): Promise<void> {
        const savedSettings = game.settings.get("ordem-paranormal", "compendiumBrowserPacks") as unknown;
        if (savedSettings instanceof String) {
            const settings = JSON.parse(savedSettings.toString());
            await game.settings.set("ordem-paranormal", "compendiumBrowserPacks", settings);
            const browser = game?.pf2e?.compendiumBrowser;
            if (browser) {
                browser.settings = settings;
                browser.initCompendiumList();
            }
        }
    }
}
