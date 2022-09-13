/** Add a deathIcon setting to the CombatTrackerConfig application */
export const CloseCombatTrackerConfig = {
    listen: (): void => {
        Hooks.on("closeCombatTrackerConfig", async (_app, $html): Promise<void> => {
            const newIcon = String($html.find<HTMLInputElement>('input[name="deathIcon"]').val()).trim();
            if (newIcon && newIcon !== game.settings.get("ordem-paranormal", "deathIcon")) {
                await game.settings.set("ordem-paranormal", "deathIcon", newIcon);
            }

            const currentDeadAtZero = game.settings.get("ordem-paranormal", "automation.actorsDeadAtZero");
            const newDeadAtZero = String($html.find<HTMLSelectElement>('select[name="actorsDeadAtZero"]').val());
            if (currentDeadAtZero !== newDeadAtZero) {
                await game.settings.set("ordem-paranormal", "automation.actorsDeadAtZero", newDeadAtZero);
            }
        });
    },
};
