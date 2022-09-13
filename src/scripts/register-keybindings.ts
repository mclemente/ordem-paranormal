export function registerKeybindings(): void {
    game.keybindings.register("ordem-paranormal", "cycle-token-stack", {
        name: "PF2E.Keybinding.CycleTokenStack.Label",
        hint: "PF2E.Keybinding.CycleTokenStack.Hint",
        editable: [{ key: "KeyZ", modifiers: [] }],
        onUp: (): boolean => canvas.tokens.cycleStack(),
    });
}
