import { SaveString, SkillAbbreviation } from '@actor/actor-data-definitions';
import { SKILL_DICTIONARY } from '../actor';
import { PF2EFamiliar } from '../familiar';

/**
 * @category Actor
 */
export class FamiliarSheetPF2e extends ActorSheet<PF2EFamiliar> {
    static get defaultOptions() {
        const options = super.defaultOptions;
        mergeObject(options, {
            classes: options.classes?.concat(['actor', 'familiar']),
            width: 650,
            height: 680,
            tabs: [{ navSelector: '.sheet-navigation', contentSelector: '.sheet-content', initial: 'attributes' }],
        });
        return options;
    }

    get template() {
        return 'systems/pf2e/templates/actors/familiar-sheet.html';
    }

    getData() {
        const familiar = this.actor;
        // find all owners, which are the list of all potential masters
        const owners = Object.entries(familiar.data.permission)
            .filter(([_id, permission]) => permission === CONST.ENTITY_PERMISSIONS.OWNER)
            .flatMap(([userID]) => game.users.get(userID) ?? []);
        const masters = game.actors.entities
            .filter((actor) => ['character', 'npc'].includes(actor.data.type))
            .filter((actor) => actor.hasPerm(game.user, 'OWNER'))
            .filter((actor) => owners.some((owner) => actor.hasPerm(owner, 'OWNER')));

        // list of abilities that can be selected as spellcasting ability
        const abilities = CONFIG.PF2E.abilities;

        const size = CONFIG.PF2E.actorSizes[familiar.data.data.traits.size.value] ?? null;

        return {
            ...super.getData(),
            owners,
            masters,
            abilities,
            size,
        };
    }

    /** @override */
    activateListeners(html: JQuery) {
        super.activateListeners(html);

        // rollable stats
        html.find('[data-saving-throw]:not([data-saving-throw=""])').on('click', '*', (event) => {
            const save = $(event.currentTarget).closest('[data-saving-throw]').attr('data-saving-throw') as SaveString;
            const options = this.actor.getRollOptions(['all', 'saving-throw', save]);
            this.actor.data.data.saves[save].roll(event, options);
        });

        html.find('[data-skill-check]:not([data-skill-check=""])').on('click', '*', (event) => {
            const skill = $(event.currentTarget)
                .closest('[data-skill-check]')
                .attr('data-skill-check') as SkillAbbreviation;
            const options = this.actor.getRollOptions(['all', 'skill-check', SKILL_DICTIONARY[skill] ?? skill]);
            this.actor.data.data.skills[skill].roll(event, options);
        });

        html.find('[data-perception-check]').on('click', '*', (event) => {
            const options = this.actor.getRollOptions(['all', 'perception']);
            this.actor.data.data.attributes.perception.roll({ event, options });
        });

        html.find('[data-attack-roll]').on('click', '*', (event) => {
            const options = this.actor.getRollOptions(['all', 'attack']);
            (this.actor.data.data as any).attack.roll(event, options);
        });

        // expand and condense item description
        html.find('.item-list').on('click', '.expandable', (event) => {
            $(event.currentTarget).removeClass('expandable').addClass('expanded');
        });

        html.find('.item-list').on('click', '.expanded', (event) => {
            $(event.currentTarget).removeClass('expanded').addClass('expandable');
        });

        if (!this.isEditable) return;

        // item controls
        html.find('.item-list').on('click', '[data-item-id]:not([data-item-id=""]) .item-edit', (event) => {
            const itemID = $(event.currentTarget).closest('[data-item-id]').attr('data-item-id');
            const item = this.actor.items.get(itemID ?? '');
            if (item) {
                item.sheet.render(true);
            }
        });

        html.find('.item-list').on('click', '[data-item-id]:not([data-item-id=""]) .item-delete', (event) => {
            const itemID = $(event.currentTarget).closest('[data-item-id]').attr('data-item-id');
            const item = this.actor.getOwnedItem(itemID);
            new Dialog({
                title: `Remove ${item.type}?`,
                content: `<p>Are you sure you want to remove ${item.name}?</p>`,
                buttons: {
                    delete: {
                        icon: '<i class="fas fa-trash"></i>',
                        label: 'Remove',
                        callback: () => {
                            this.actor.deleteOwnedItem(itemID);
                        },
                    },
                    cancel: {
                        icon: '<i class="fas fa-times"></i>',
                        label: 'Cancel',
                    },
                },
                default: 'cancel',
            }).render(true);
            return false;
        });
    }
}
