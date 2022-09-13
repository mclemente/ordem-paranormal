import { CharacterSheetPF2e } from "@actor/character/sheet";
import { ActionSheetPF2e } from "@item/action/sheet";
import { HazardSheetPF2e } from "@actor/hazard/sheet";
import { LootSheetPF2e } from "@actor/loot/sheet";
import { FamiliarSheetPF2e } from "@actor/familiar/sheet";
import { VehicleSheetPF2e } from "@actor/vehicle/sheet";
import { NPCSheetPF2e } from "@actor/npc/sheet";
import { ItemSheetPF2e } from "@item/sheet/base";
import { KitSheetPF2e } from "@item/kit/sheet";
import { AncestrySheetPF2e } from "@item/ancestry/sheet";
import { BackgroundSheetPF2e } from "@item/background/sheet";
import { ClassSheetPF2e } from "@item/class/sheet";
import { SpellSheetPF2e } from "@item/spell/sheet";
import { LocalizePF2e } from "@system/localize";
import { PhysicalItemSheetPF2e } from "@item/physical/sheet";
import { FeatSheetPF2e } from "@item/feat/sheet";
import { PHYSICAL_ITEM_TYPES } from "@item/physical/values";
import { WeaponSheetPF2e } from "@item/weapon/sheet";
import { EffectSheetPF2e } from "@item/effect/sheet";
import { BookSheetPF2e } from "@item/book/sheet";
import { DeitySheetPF2e } from "@item/deity/sheet";
import { ArmorSheetPF2e } from "@item/armor/sheet";
import { HeritageSheetPF2e } from "@item/heritage";
import { JournalSheetPF2e, JournalTextTinyMCESheetPF2e } from "@module/journal-entry/sheet";
import { SceneConfigPF2e } from "@scene/sheet";
import { TokenConfigPF2e, TokenDocumentPF2e } from "@scene";
import { EquipmentSheetPF2e } from "@item/equipment/sheet";
import { ContainerSheetPF2e } from "@item/container/sheet";
import { MeleeSheetPF2e } from "@item/melee/sheet";
import { ConsumableSheetPF2e } from "@item/consumable/sheet";
import { TreasureSheetPF2e } from "@item/treasure/sheet";
import { UserPF2e } from "@module/user";
import { UserConfigPF2e } from "@module/user/sheet";

export function registerSheets() {
    const translations = LocalizePF2e.translations.PF2E;
    const sheetLabel = translations.SheetLabel;

    DocumentSheetConfig.unregisterSheet(JournalEntry, "core", JournalSheet);
    DocumentSheetConfig.registerSheet(JournalEntry, "ordem-paranormal", JournalSheetPF2e, {
        label: () =>
            game.i18n.format("SHEETS.DefaultDocumentSheet", { document: game.i18n.localize("DOCUMENT.JournalEntry") }),
        makeDefault: true,
    });

    // Replace the TinyMCE sheet with the version that'll let us inject themes
    DocumentSheetConfig.unregisterSheet(JournalEntryPage, "core", JournalTextTinyMCESheet);
    DocumentSheetConfig.registerSheet(JournalEntryPage, "ordem-paranormal", JournalTextTinyMCESheetPF2e, {
        types: ["text"],
        label: game.i18n.localize("EDITOR.TinyMCE"),
    });

    DocumentSheetConfig.registerSheet(Scene, "ordem-paranormal", SceneConfigPF2e, { makeDefault: true });
    DocumentSheetConfig.registerSheet(TokenDocumentPF2e, "ordem-paranormal", TokenConfigPF2e, { makeDefault: true });

    // ACTORS
    Actors.unregisterSheet("core", ActorSheet);

    const localizeType = (type: string) => {
        const entityType = type in CONFIG.PF2E.Actor.documentClasses ? "ACTOR" : "ITEM";
        const camelized = type[0].toUpperCase() + type.slice(1).toLowerCase();
        return game.i18n.localize(`${entityType}.Type${camelized}`);
    };

    Actors.registerSheet("ordem-paranormal", CharacterSheetPF2e, {
        types: ["character"],
        label: game.i18n.format(sheetLabel, { type: localizeType("character") }),
        makeDefault: true,
    });

    // Regiser NPC Sheet
    Actors.registerSheet("ordem-paranormal", NPCSheetPF2e, {
        types: ["npc"],
        label: game.i18n.format(sheetLabel, { type: localizeType("npc") }),
        makeDefault: true,
    });

    // Register Hazard Sheet
    Actors.registerSheet("ordem-paranormal", HazardSheetPF2e, {
        types: ["hazard"],
        label: game.i18n.format(sheetLabel, { type: localizeType("hazard") }),
    });

    // Register Loot Sheet
    Actors.registerSheet("ordem-paranormal", LootSheetPF2e, {
        types: ["loot"],
        label: game.i18n.format(sheetLabel, { type: localizeType("loot") }),
        makeDefault: true,
    });

    // Register Familiar Sheet
    Actors.registerSheet("ordem-paranormal", FamiliarSheetPF2e, {
        types: ["familiar"],
        label: game.i18n.format(sheetLabel, { type: localizeType("familiar") }),
        makeDefault: true,
    });

    // Register Vehicle Sheet
    Actors.registerSheet("ordem-paranormal", VehicleSheetPF2e, {
        types: ["vehicle"],
        label: game.i18n.format(sheetLabel, { type: localizeType("vehicle") }),
        makeDefault: true,
    });

    // ITEMS
    Items.unregisterSheet("core", ItemSheet);

    const itemTypes = ["condition", "lore", "spellcastingEntry"];
    for (const itemType of itemTypes) {
        Items.registerSheet("ordem-paranormal", ItemSheetPF2e, {
            types: [itemType],
            label: game.i18n.format(sheetLabel, { type: localizeType(itemType) }),
            makeDefault: true,
        });
    }

    const sheetEntries = [
        ["action", ActionSheetPF2e],
        ["ancestry", AncestrySheetPF2e],
        ["armor", ArmorSheetPF2e],
        ["background", BackgroundSheetPF2e],
        ["backpack", ContainerSheetPF2e],
        ["book", BookSheetPF2e],
        ["class", ClassSheetPF2e],
        ["consumable", ConsumableSheetPF2e],
        ["deity", DeitySheetPF2e],
        ["effect", EffectSheetPF2e],
        ["equipment", EquipmentSheetPF2e],
        ["feat", FeatSheetPF2e],
        ["heritage", HeritageSheetPF2e],
        ["kit", KitSheetPF2e],
        ["melee", MeleeSheetPF2e],
        ["spell", SpellSheetPF2e],
        ["treasure", TreasureSheetPF2e],
        ["weapon", WeaponSheetPF2e],
    ] as const;
    for (const [type, Sheet] of sheetEntries) {
        Items.registerSheet("ordem-paranormal", Sheet, {
            types: [type],
            label: game.i18n.format(sheetLabel, { type: localizeType(type) }),
            makeDefault: true,
        });
    }

    // Add any missing physical item sheets
    for (const itemType of PHYSICAL_ITEM_TYPES) {
        if (sheetEntries.some(([type, _sheet]) => itemType === type)) continue;
        Items.registerSheet("ordem-paranormal", PhysicalItemSheetPF2e, {
            types: [itemType],
            label: game.i18n.format(sheetLabel, { type: localizeType(itemType) }),
            makeDefault: true,
        });
    }

    // User

    DocumentSheetConfig.unregisterSheet(User, "core", UserConfig);
    DocumentSheetConfig.registerSheet(UserPF2e, "ordem-paranormal", UserConfigPF2e, {
        makeDefault: true,
        label: () => game.i18n.format("SHEETS.DefaultDocumentSheet", { document: game.i18n.localize("DOCUMENT.User") }),
    });
}
