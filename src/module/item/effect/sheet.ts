import { EffectBadge } from "@item/abstract-effect";
import { ItemSheetDataPF2e } from "@item/sheet/data-types";
import { EffectPF2e } from ".";
import { ItemSheetPF2e } from "../sheet/base";

export class EffectSheetPF2e extends ItemSheetPF2e<EffectPF2e> {
    override async getData(options?: Partial<DocumentSheetOptions>): Promise<ItemSheetDataPF2e<EffectPF2e>> {
        return {
            ...(await super.getData(options)),
            hasSidebar: true,
            hasDetails: false,
            itemType: game.i18n.localize("PF2E.LevelLabel"),
        };
    }

    override activateListeners($html: JQuery<HTMLElement>): void {
        super.activateListeners($html);

        $html.find("[data-action=badge-add]").on("click", () => {
            const badge: EffectBadge = { type: "counter", value: 1 };
            this.item.update({ system: { badge } });
        });

        $html.find("[data-action=badge-delete]").on("click", () => {
            this.item.update({ "system.-=badge": null });
        });
    }
}
