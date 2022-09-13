import { MigrationRunner } from "../module/migration/runner";

/** Store the world system and schema versions for the first time */
export async function storeInitialWorldVersions(): Promise<void> {
    if (!game.user.hasRole(CONST.USER_ROLES.GAMEMASTER)) return;

    const storedSystemVersion = game.settings.storage.get("world").getItem("pf2e.worldSystemVersion");
    if (!storedSystemVersion) {
        await game.settings.set("ordem-paranormal", "worldSystemVersion", game.system.version);
    }

    const storedSchemaVersion = game.settings.storage.get("world").getItem("pf2e.worldSchemaVersion");
    if (!storedSchemaVersion) {
        const minimumVersion = MigrationRunner.RECOMMENDED_SAFE_VERSION;
        const currentVersion =
            game.actors.size === 0
                ? game.settings.get("ordem-paranormal", "worldSchemaVersion")
                : Math.max(
                      Math.min(...new Set(game.actors.map((actor) => actor.schemaVersion ?? minimumVersion))),
                      minimumVersion
                  );
        await game.settings.set("ordem-paranormal", "worldSchemaVersion", currentVersion);
    }
}
