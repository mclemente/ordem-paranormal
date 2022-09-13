class EffectsCanvasGroupPF2e extends EffectsCanvasGroup {
    /** Is rules-based vision enabled and applicable to the scene? */
    get rulesBasedVision(): boolean {
        return (
            game.settings.get("ordem-paranormal", "automation.rulesBasedVision") &&
            canvas.ready &&
            !!canvas.scene?.tokenVision
        );
    }
}

export { EffectsCanvasGroupPF2e };
