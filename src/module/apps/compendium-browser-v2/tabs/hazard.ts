import { sluggify } from "@util";
import { CompendiumBrowserV2 } from "..";
import { CompendiumBrowserTab } from "./base";

export class CompendiumBrowserHazardTab extends CompendiumBrowserTab {
    protected index = ["img", "data.details.level.value", "data.details.isComplex", "data.traits"];

    constructor(browser: CompendiumBrowserV2) {
        super(browser, "hazard");

        // Set the filterData object of this tab
        this.prepareFilterData();
    }

    protected override async loadData() {
        console.debug("PF2e System | Compendium Browser | Started loading Hazard actors");

        const hazardActors: CompendiumIndexData[] = [];
        const sources: Set<string> = new Set();
        const indexFields = [...this.index, "data.details.alignment.value", "data.details.source.value"];

        for await (const { pack, index } of this.browser.packLoader.loadPacks(
            "Actor",
            this.browser.loadedPacks("hazard"),
            indexFields
        )) {
            console.debug(`PF2e System | Compendium Browser | ${pack.metadata.label} - ${index.size} entries found`);
            for (const actorData of index) {
                if (actorData.type === "hazard") {
                    if (!this.hasAllIndexFields(actorData, this.index)) {
                        console.warn(
                            `Hazard '${actorData.name}' does not have all required data fields. Consider unselecting pack '${pack.metadata.label}' in the compendium browser settings.`
                        );
                        continue;
                    }
                    // Prepare source
                    const source = actorData.data.details.source?.value;
                    if (source) {
                        sources.add(source);
                        actorData.data.details.source.value = sluggify(source);
                    } else {
                        actorData.data.details.source = { value: "" };
                    }

                    hazardActors.push({
                        _id: actorData._id,
                        type: actorData.type,
                        name: actorData.name,
                        img: actorData.img,
                        compendium: pack.collection,
                        level: actorData.data.details.level.value,
                        complexity: actorData.data.details.isComplex ? "complex" : "simple",
                        traits: actorData.data.traits.traits.value,
                        rarity: actorData.data.traits.rarity,
                        source: actorData.data.details.source.value,
                    });
                }
            }
            console.debug(`PF2e System | Compendium Browser | ${pack.metadata.label} - Loaded`);
        }

        // Set indexData
        this.indexData = hazardActors;

        // Filters
        this.filterData.checkboxes.complexity.options = this.generateCheckboxOptions(
            {
                simple: "PF2E.TraitSimple",
                complex: "PF2E.TraitComplex",
            },
            false
        );
        this.filterData.checkboxes.traits.options = this.generateCheckboxOptions(CONFIG.PF2E.hazardTraits);
        this.filterData.checkboxes.rarity.options = this.generateCheckboxOptions(CONFIG.PF2E.rarityTraits, false);
        this.filterData.checkboxes.source.options = this.generateSourceCheckboxOptions(sources);

        console.debug("PF2e System | Compendium Browser | Finished loading Hazard actors");
    }

    protected override filterIndexData(entry: CompendiumIndexData): boolean {
        const { checkboxes, ranges, search } = this.filterData;
        // Level
        if (!(entry.level >= ranges.level.values.min && entry.level <= ranges.level.values.max)) return false;
        // Name
        if (search.text) {
            if (!entry.name.toLocaleLowerCase().includes(search.text)) return false;
        }
        // Complexity
        if (checkboxes.complexity.selected.length) {
            if (!checkboxes.complexity.selected.includes(entry.complexity)) return false;
        }
        // Traits
        if (checkboxes.traits.selected.length) {
            if (!this.arrayIncludes(checkboxes.traits.selected, entry.traits)) return false;
        }
        // Source
        if (checkboxes.source.selected.length) {
            if (!checkboxes.source.selected.includes(entry.source)) return false;
        }
        // Rarity
        if (checkboxes.rarity.selected.length) {
            if (!checkboxes.rarity.selected.includes(entry.rarity)) return false;
        }
        return true;
    }

    protected override prepareFilterData(): void {
        this.filterData = {
            checkboxes: {
                complexity: {
                    isExpanded: true,
                    label: "PF2E.BrowserFilterComplexity",
                    options: {},
                    selected: [],
                },
                traits: {
                    isExpanded: false,
                    label: "PF2E.BrowserFilterTraits",
                    options: {},
                    selected: [],
                },
                rarity: {
                    isExpanded: false,
                    label: "PF2E.BrowserFilterRarities",
                    options: {},
                    selected: [],
                },
                source: {
                    isExpanded: false,
                    label: "PF2E.BrowserFilterSource",
                    options: {},
                    selected: [],
                },
            },
            dropdowns: {},
            order: {
                by: "name",
                direction: "asc",
                options: {
                    name: "PF2E.BrowserSortyByNameLabel",
                    ["data.details.level.value"]: "PF2E.BrowserSortyByLevelLabel",
                },
            },
            ranges: {
                level: {
                    isExpanded: false,
                    label: "PF2E.BrowserFilterLevels",
                    values: {
                        min: -1,
                        max: 25,
                    },
                },
            },
            search: {
                text: "",
            },
        };
    }
}