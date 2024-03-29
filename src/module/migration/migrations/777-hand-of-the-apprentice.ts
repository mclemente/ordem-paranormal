import { ItemSourcePF2e } from "@item/data";
import { AELikeSource } from "@module/rules/rule-element/ae-like";
import { MigrationBase } from "../base";

/** Have Hand of the Apprentice feat enlarge focus pool */
export class Migration777HandOfTheApprentice extends MigrationBase {
    static override version = 0.777;

    override async updateItem(source: ItemSourceWithAELikes): Promise<void> {
        if (source.type === "feat" && source.system.slug === "hand-of-the-apprentice") {
            source.system.rules = [
                {
                    key: "ActiveEffectLike",
                    mode: "add",
                    path: "system.resources.focus.max",
                    value: 1,
                },
            ];
        }
    }
}

type ItemSourceWithAELikes = ItemSourcePF2e & {
    system: { rules: AELikeSource[] };
};
