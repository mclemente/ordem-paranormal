import { ActorPF2e } from "@actor/base";
import { AutomaticBonusProgression } from "@actor/character/automatic-bonus-progression";
import { FeatCategoryOptions } from "@actor/character/feats";
import { CheckModifier, ModifierPF2e, MODIFIER_TYPE, StatisticModifier } from "@actor/modifiers";
import { ItemPF2e } from "@item/base";
import { CoinsPF2e } from "@item/physical/helpers";
import { ActiveEffectPF2e } from "@module/active-effect";
import { CompendiumBrowser, CompendiumBrowserSettings } from "@module/apps/compendium-browser";
import { EffectsPanel } from "@module/apps/effects-panel";
import { LicenseViewer } from "@module/apps/license-viewer";
import { ChatLogPF2e, CompendiumDirectoryPF2e, EncounterTrackerPF2e } from "@module/apps/ui";
import { HotbarPF2e } from "@module/apps/ui/hotbar";
import { WorldClock } from "@module/apps/world-clock";
import { CanvasPF2e, EffectsCanvasGroupPF2e } from "@module/canvas";
import { StatusEffects } from "@module/canvas/status-effects";
import { ChatMessagePF2e } from "@module/chat-message";
import { ActorsPF2e } from "@module/collection/actors";
import { MacroPF2e } from "@module/macro";
import { RuleElementPF2e, RuleElements } from "@module/rules";
import {
    AmbientLightDocumentPF2e,
    MeasuredTemplateDocumentPF2e,
    ScenePF2e,
    TileDocumentPF2e,
    TokenDocumentPF2e,
} from "@module/scene";
import { UserPF2e } from "@module/user";
import { PF2ECONFIG, StatusEffectIconTheme } from "@scripts/config";
import { DicePF2e } from "@scripts/dice";
import { rollActionMacro, rollItemMacro } from "@scripts/macros/hotbar";
import { launchTravelSheet } from "@scripts/macros/travel/travel-speed-sheet";
import { calculateXP } from "@scripts/macros/xp";
import { ModuleArt, registerModuleArt } from "@scripts/register-module-art";
import { remigrate } from "@scripts/system/remigrate";
import { UserVisibility } from "@scripts/ui/user-visibility";
import { EffectTracker } from "@system/effect-tracker";
import { ActorImporter } from "@system/importer/actor-importer";
import { CheckPF2e } from "@system/rolls";
import type { HomebrewSettingsKey, HomebrewTag } from "@system/settings/homebrew";
import { TextEditorPF2e } from "@system/text-editor";
import { sluggify } from "@util";
import { CombatantPF2e, EncounterPF2e } from "./module/encounter";
import { ConditionManager } from "./module/system/conditions";

declare global {
    interface Game {
        pf2e: {
            actions: Record<string, Function>;
            compendiumBrowser: CompendiumBrowser;
            licenseViewer: LicenseViewer;
            worldClock: WorldClock;
            effectPanel: EffectsPanel;
            effectTracker: EffectTracker;
            rollActionMacro: typeof rollActionMacro;
            rollItemMacro: typeof rollItemMacro;
            gm: {
                calculateXP: typeof calculateXP;
                launchTravelSheet: typeof launchTravelSheet;
            };
            system: {
                moduleArt: {
                    map: Map<ActorUUID, ModuleArt>;
                    refresh: typeof registerModuleArt;
                };
                remigrate: typeof remigrate;
                sluggify: typeof sluggify;
            };
            importer: {
                actor: typeof ActorImporter;
            };
            variantRules: {
                AutomaticBonusProgression: typeof AutomaticBonusProgression;
            };
            Coins: typeof CoinsPF2e;
            Dice: typeof DicePF2e;
            StatusEffects: typeof StatusEffects;
            ConditionManager: typeof ConditionManager;
            ModifierType: typeof MODIFIER_TYPE;
            Modifier: typeof ModifierPF2e;
            StatisticModifier: typeof StatisticModifier;
            CheckModifier: typeof CheckModifier;
            Check: typeof CheckPF2e;
            RuleElements: typeof RuleElements;
            RuleElement: typeof RuleElementPF2e;
            TextEditor: typeof TextEditorPF2e;
        };
    }

    interface ConfigPF2e extends ConfiguredConfig {
        debug: ConfiguredConfig["debug"] & {
            ruleElement: boolean;
        };
        PF2E: typeof PF2ECONFIG;
        time: {
            roundTime: number;
        };
    }

    const CONFIG: ConfigPF2e;
    const canvas: CanvasPF2e;

    namespace globalThis {
        // eslint-disable-next-line no-var
        var game: Game<ActorPF2e, ActorsPF2e, ChatMessagePF2e, EncounterPF2e, ItemPF2e, MacroPF2e, ScenePF2e, UserPF2e>;

        // eslint-disable-next-line no-var
        var ui: FoundryUI<ActorPF2e, ItemPF2e, ChatLogPF2e, CompendiumDirectoryPF2e>;
    }

    interface Window {
        AutomaticBonusProgression: typeof AutomaticBonusProgression;
    }

    interface ClientSettings {
        get(
            module: "ordem-paranormal",
            setting: "automation.actorsDeadAtZero"
        ): "neither" | "npcsOnly" | "pcsOnly" | "both";
        get(module: "ordem-paranormal", setting: "automation.effectExpiration"): boolean;
        get(module: "ordem-paranormal", setting: "automation.flankingDetection"): boolean;
        get(module: "ordem-paranormal", setting: "automation.lootableNPCs"): boolean;
        get(module: "ordem-paranormal", setting: "automation.removeExpiredEffects"): boolean;
        get(module: "ordem-paranormal", setting: "automation.rulesBasedVision"): boolean;

        get(module: "ordem-paranormal", setting: "gradualBoostsVariant"): boolean;
        get(module: "ordem-paranormal", setting: "ancestryParagonVariant"): boolean;
        get(
            module: "ordem-paranormal",
            setting: "automaticBonusVariant"
        ): "noABP" | "ABPFundamentalPotency" | "ABPRulesAsWritten";
        get(module: "ordem-paranormal", setting: "dualClassVariant"): boolean;
        get(module: "ordem-paranormal", setting: "freeArchetypeVariant"): boolean;
        get(
            module: "ordem-paranormal",
            setting: "proficiencyVariant"
        ): "ProficiencyWithLevel" | "ProficiencyWithoutLevel";
        get(module: "ordem-paranormal", setting: "staminaVariant"): 0 | 1;

        get(module: "ordem-paranormal", setting: "proficiencyUntrainedModifier"): number;
        get(module: "ordem-paranormal", setting: "proficiencyTrainedModifier"): number;
        get(module: "ordem-paranormal", setting: "proficiencyExpertModifier"): number;
        get(module: "ordem-paranormal", setting: "proficiencyMasterModifier"): number;
        get(module: "ordem-paranormal", setting: "proficiencyLegendaryModifier"): number;

        get(module: "ordem-paranormal", setting: "metagame.partyVision"): boolean;
        get(module: "ordem-paranormal", setting: "metagame.secretCondition"): boolean;
        get(module: "ordem-paranormal", setting: "metagame.secretDamage"): boolean;
        get(module: "ordem-paranormal", setting: "metagame.showDC"): UserVisibility;
        get(module: "ordem-paranormal", setting: "metagame.showResults"): UserVisibility;
        get(module: "ordem-paranormal", setting: "metagame.tokenSetsNameVisibility"): boolean;

        get(module: "ordem-paranormal", setting: "tokens.autoscale"): boolean;

        get(module: "ordem-paranormal", setting: "worldClock.dateTheme"): "AR" | "IC" | "AD" | "CE";
        get(module: "ordem-paranormal", setting: "worldClock.playersCanView"): boolean;
        get(module: "ordem-paranormal", setting: "worldClock.showClockButton"): boolean;
        get(module: "ordem-paranormal", setting: "worldClock.syncDarkness"): boolean;
        get(module: "ordem-paranormal", setting: "worldClock.timeConvention"): 24 | 12;
        get(module: "ordem-paranormal", setting: "worldClock.worldCreatedOn"): string;

        get(module: "ordem-paranormal", setting: "campaignFeats"): boolean;
        get(module: "ordem-paranormal", setting: "campaignFeatSections"): FeatCategoryOptions[];

        get(module: "ordem-paranormal", setting: "homebrew.weaponCategories"): HomebrewTag<"weaponCategories">[];
        get(module: "ordem-paranormal", setting: HomebrewSettingsKey): HomebrewTag[];

        get(module: "ordem-paranormal", setting: "compendiumBrowserPacks"): CompendiumBrowserSettings;
        get(module: "ordem-paranormal", setting: "critFumbleButtons"): boolean;
        get(module: "ordem-paranormal", setting: "deathIcon"): ImagePath;
        get(module: "ordem-paranormal", setting: "drawCritFumble"): boolean;
        get(module: "ordem-paranormal", setting: "enabledRulesUI"): boolean;
        get(module: "ordem-paranormal", setting: "identifyMagicNotMatchingTraditionModifier"): 0 | 2 | 5 | 10;
        get(module: "ordem-paranormal", setting: "nathMode"): boolean;
        get(module: "ordem-paranormal", setting: "statusEffectType"): StatusEffectIconTheme;
        get(module: "ordem-paranormal", setting: "worldSchemaVersion"): number;
        get(module: "ordem-paranormal", setting: "worldSystemVersion"): string;
    }

    interface ClientSettingsMap {
        get(key: "pf2e.worldClock.worldCreatedOn"): SettingConfig & { default: string };
    }

    interface RollMathProxy {
        eq: (a: number, b: number) => boolean;
        gt: (a: number, b: number) => boolean;
        gte: (a: number, b: number) => boolean;
        lt: (a: number, b: number) => boolean;
        lte: (a: number, b: number) => boolean;
        ne: (a: number, b: number) => boolean;
        ternary: (condition: boolean | number, ifTrue: number, ifFalse: number) => number;
    }

    const BUILD_MODE: "development" | "production";
}

type ConfiguredConfig = Config<
    AmbientLightDocumentPF2e,
    ActiveEffectPF2e,
    ActorPF2e,
    ChatLogPF2e,
    ChatMessagePF2e,
    EncounterPF2e,
    CombatantPF2e,
    EncounterTrackerPF2e<EncounterPF2e | null>,
    CompendiumDirectoryPF2e,
    HotbarPF2e,
    ItemPF2e,
    MacroPF2e,
    MeasuredTemplateDocumentPF2e,
    TileDocumentPF2e,
    TokenDocumentPF2e,
    ScenePF2e,
    UserPF2e,
    EffectsCanvasGroupPF2e
>;
