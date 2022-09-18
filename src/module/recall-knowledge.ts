/**
 * Implementation of Creature Identification
 * https://2e.aonprd.com/Rules.aspx?ID=566
 * https://2e.aonprd.com/Skills.aspx?ID=5&General=true
 *
 * See https://www.youtube.com/watch?v=UtNS1vM7czM for interpretations
 */

import { NPCPF2e } from "@actor";
import { SkillAbbreviation } from "@actor/creature/data";
import { Rarity } from "@module/data";
import {
    adjustDC,
    calculateDC,
    combineDCAdjustments,
    createDifficultyScale,
    DCAdjustment,
    DCOptions,
    NegativeDCAdjustment,
    rarityToDCAdjustment,
} from "./dc";

const identifySkills = new Map<string, SkillAbbreviation[]>();
identifySkills.set("aberration", ["ocu"]);
identifySkills.set("animal", ["cie"]);
identifySkills.set("astral", ["ocu"]);
identifySkills.set("beast", ["cie"]);
identifySkills.set("celestial", ["rel"]);
// identifySkills.set("construct", ["arc", "cra"]);
// identifySkills.set("dragon", ["arc"]);
// identifySkills.set("elemental", ["arc", "nat"]);
identifySkills.set("ethereal", ["ocu"]);
// identifySkills.set("fey", ["nat"]);
identifySkills.set("fiend", ["rel"]);
identifySkills.set("fungus", ["cie"]);
identifySkills.set("humanoid", ["atu"]);
identifySkills.set("monitor", ["rel"]);
identifySkills.set("ooze", ["ocu"]);
identifySkills.set("plant", ["cie"]);
identifySkills.set("spirit", ["ocu"]);
identifySkills.set("undead", ["rel"]);

export interface RecallKnowledgeDC {
    dc: number;
    progression: number[];
    start: DCAdjustment;
}

export interface IdentifyCreatureData {
    skill: RecallKnowledgeDC;
    specificLoreDC: RecallKnowledgeDC;
    unspecificLoreDC: RecallKnowledgeDC;
    skills: Set<SkillAbbreviation>;
}

function toKnowledgeDC(dc: number, rarity: Rarity, loreAdjustment: NegativeDCAdjustment = "normal"): RecallKnowledgeDC {
    const rarityAdjustment = rarityToDCAdjustment(rarity);
    const start = combineDCAdjustments(rarityAdjustment, loreAdjustment);
    const progression = createDifficultyScale(dc, start);
    return {
        dc: adjustDC(dc, start),
        progression,
        start,
    };
}

export function identifyCreature(
    creature: NPCPF2e,
    { proficiencyWithoutLevel = false }: DCOptions = {}
): IdentifyCreatureData {
    const rarity = creature.system.traits.rarity ?? "common";
    const level = Number(creature.system.details.level?.value) || 0;
    const dc = calculateDC(level, { proficiencyWithoutLevel });

    const traits = creature.system.traits.value;
    const skills = new Set(traits.flatMap((t) => identifySkills.get(t) ?? []));

    return {
        specificLoreDC: toKnowledgeDC(dc, rarity, "very easy"),
        unspecificLoreDC: toKnowledgeDC(dc, rarity, "easy"),
        skill: toKnowledgeDC(dc, rarity, "normal"),
        skills,
    };
}
