/** Register Handlebars template partials */
export function registerTemplates(): void {
    const templatePaths = [
        // PC Sheet Tooltips
        "systems/ordem-paranormal/templates/actors/character/partials/modifiers-tooltip.html",
        "systems/ordem-paranormal/templates/actors/character/partials/traits.html",
        "systems/ordem-paranormal/templates/actors/character/partials/background.html",
        "systems/ordem-paranormal/templates/actors/character/partials/abilities.html",
        "systems/ordem-paranormal/templates/actors/character/partials/header.html",
        "systems/ordem-paranormal/templates/actors/character/partials/granted-feat.html",

        // PC Sheet Sidebar
        "systems/ordem-paranormal/templates/actors/character/sidebar/armor-class.html",
        "systems/ordem-paranormal/templates/actors/character/sidebar/class-dc.html",
        "systems/ordem-paranormal/templates/actors/character/sidebar/health.html",
        "systems/ordem-paranormal/templates/actors/character/sidebar/esforço.html",
        "systems/ordem-paranormal/templates/actors/character/sidebar/stamina.html",
        "systems/ordem-paranormal/templates/actors/character/sidebar/resistances.html",
        "systems/ordem-paranormal/templates/actors/character/sidebar/perception.html",
        "systems/ordem-paranormal/templates/actors/character/sidebar/initiative.html",
        "systems/ordem-paranormal/templates/actors/character/sidebar/saves.html",

        // PC Sheet Tabs
        "systems/ordem-paranormal/templates/actors/character/tabs/general.html",
        "systems/ordem-paranormal/templates/actors/character/tabs/actions.html",
        "systems/ordem-paranormal/templates/actors/character/tabs/biography.html",
        "systems/ordem-paranormal/templates/actors/character/tabs/effects.html",
        "systems/ordem-paranormal/templates/actors/character/tabs/feats.html",
        "systems/ordem-paranormal/templates/actors/character/tabs/inventory.html",
        "systems/ordem-paranormal/templates/actors/character/tabs/pfs.html",
        "systems/ordem-paranormal/templates/actors/character/tabs/proficiencies.html",
        "systems/ordem-paranormal/templates/actors/character/tabs/spellcasting.html",
        "systems/ordem-paranormal/templates/actors/character/tabs/crafting.html",

        // Hazard Sheets Partials
        "systems/ordem-paranormal/templates/actors/hazard/partials/header.html",
        "systems/ordem-paranormal/templates/actors/hazard/partials/sidebar.html",

        // Shared Actor Sheet Partials
        "systems/ordem-paranormal/templates/actors/partials/coinage.html",
        "systems/ordem-paranormal/templates/actors/partials/inventory.html",
        "systems/ordem-paranormal/templates/actors/partials/item-line.html",
        "systems/ordem-paranormal/templates/actors/partials/carry-type.html",
        "systems/ordem-paranormal/templates/actors/partials/conditions.html",
        "systems/ordem-paranormal/templates/actors/partials/dying-pips.html",
        "systems/ordem-paranormal/templates/actors/crafting-entry-alchemical.html",
        "systems/ordem-paranormal/templates/actors/crafting-entry-list.html",
        "systems/ordem-paranormal/templates/actors/spellcasting-spell-list.html",
        "systems/ordem-paranormal/templates/actors/character/partials/proficiencylevels-dropdown.html",

        // SVG icons
        "systems/ordem-paranormal/templates/actors/character/icons/d20.html",
        "systems/ordem-paranormal/templates/actors/character/icons/pfs.html",
        "systems/ordem-paranormal/templates/actors/character/icons/plus.html",

        // Actor Sheet Partials (SVG images)
        "systems/ordem-paranormal/templates/actors/partials/images/header_stroke.html",
        "systems/ordem-paranormal/templates/actors/partials/images/header_stroke_large.html",

        // NPC partials
        "systems/ordem-paranormal/templates/actors/npc/tabs/main.html",
        "systems/ordem-paranormal/templates/actors/npc/tabs/inventory.html",
        "systems/ordem-paranormal/templates/actors/npc/tabs/effects.html",
        "systems/ordem-paranormal/templates/actors/npc/tabs/spells.html",
        "systems/ordem-paranormal/templates/actors/npc/tabs/notes.html",
        "systems/ordem-paranormal/templates/actors/npc/partials/header.html",
        "systems/ordem-paranormal/templates/actors/npc/partials/sidebar.html",
        "systems/ordem-paranormal/templates/actors/npc/partials/action.html",
        "systems/ordem-paranormal/templates/actors/npc/partials/attack.html",

        // Item Sheet Partials
        "systems/ordem-paranormal/templates/items/rules-panel.html",
        "systems/ordem-paranormal/templates/items/action-details.html",
        "systems/ordem-paranormal/templates/items/ancestry-details.html",
        "systems/ordem-paranormal/templates/items/ancestry-sidebar.html",
        "systems/ordem-paranormal/templates/items/armor-details.html",
        "systems/ordem-paranormal/templates/items/armor-sidebar.html",
        "systems/ordem-paranormal/templates/items/background-details.html",
        "systems/ordem-paranormal/templates/items/backpack-details.html",
        "systems/ordem-paranormal/templates/items/backpack-sidebar.html",
        "systems/ordem-paranormal/templates/items/book-details.html",
        "systems/ordem-paranormal/templates/items/book-sidebar.html",
        "systems/ordem-paranormal/templates/items/treasure-sidebar.html",
        "systems/ordem-paranormal/templates/items/class-details.html",
        "systems/ordem-paranormal/templates/items/consumable-details.html",
        "systems/ordem-paranormal/templates/items/consumable-sidebar.html",
        "systems/ordem-paranormal/templates/items/condition-details.html",
        "systems/ordem-paranormal/templates/items/condition-sidebar.html",
        "systems/ordem-paranormal/templates/items/deity-details.html",
        "systems/ordem-paranormal/templates/items/effect-sidebar.html",
        "systems/ordem-paranormal/templates/items/equipment-details.html",
        "systems/ordem-paranormal/templates/items/equipment-sidebar.html",
        "systems/ordem-paranormal/templates/items/feat-details.html",
        "systems/ordem-paranormal/templates/items/feat-sidebar.html",
        "systems/ordem-paranormal/templates/items/heritage-sidebar.html",
        "systems/ordem-paranormal/templates/items/kit-details.html",
        "systems/ordem-paranormal/templates/items/kit-sidebar.html",
        "systems/ordem-paranormal/templates/items/lore-details.html",
        "systems/ordem-paranormal/templates/items/lore-sidebar.html",
        "systems/ordem-paranormal/templates/items/mystify-panel.html",
        "systems/ordem-paranormal/templates/items/spell-details.html",
        "systems/ordem-paranormal/templates/items/spell-overlay.html",
        "systems/ordem-paranormal/templates/items/spell-sidebar.html",
        "systems/ordem-paranormal/templates/items/melee-details.html",
        "systems/ordem-paranormal/templates/items/weapon-details.html",
        "systems/ordem-paranormal/templates/items/weapon-sidebar.html",
        "systems/ordem-paranormal/templates/items/activation-panel.html",

        // Loot partials
        "systems/ordem-paranormal/templates/actors/loot/inventory.html",
        "systems/ordem-paranormal/templates/actors/loot/sidebar.html",

        // Vehicle partials
        "systems/ordem-paranormal/templates/actors/vehicle/vehicle-sheet.html",
        "systems/ordem-paranormal/templates/actors/vehicle/vehicle-header.html",
        "systems/ordem-paranormal/templates/actors/vehicle/sidebar/vehicle-health.html",
        "systems/ordem-paranormal/templates/actors/vehicle/sidebar/vehicle-armorclass.html",
        "systems/ordem-paranormal/templates/actors/vehicle/sidebar/vehicle-saves.html",
        "systems/ordem-paranormal/templates/actors/vehicle/sidebar/vehicle-resistances.html",
        "systems/ordem-paranormal/templates/actors/vehicle/tabs/vehicle-details.html",
        "systems/ordem-paranormal/templates/actors/vehicle/tabs/vehicle-actions.html",
        "systems/ordem-paranormal/templates/actors/vehicle/tabs/vehicle-inventory.html",
        "systems/ordem-paranormal/templates/actors/vehicle/tabs/vehicle-description.html",

        // Compendium Browser Partials
        "systems/ordem-paranormal/templates/compendium-browser/browser-settings.html",
        "systems/ordem-paranormal/templates/compendium-browser/filters.html",

        // Action Partial
        "systems/ordem-paranormal/templates/system/actions/repair/chat-button-partial.html",
        "systems/ordem-paranormal/templates/system/actions/repair/repair-result-partial.html",
        "systems/ordem-paranormal/templates/system/actions/repair/item-heading-partial.html",

        // TokenConfig partials
        "systems/ordem-paranormal/templates/scene/token/partials/appearance.html",
        "systems/ordem-paranormal/templates/scene/token/partials/identity.html",
        "systems/ordem-paranormal/templates/scene/token/partials/lighting.html",
    ];

    loadTemplates(templatePaths);
}
