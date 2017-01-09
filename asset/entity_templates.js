Game.ALL_ENTITIES = {};

Game.EntityTemplates = {};

Game.EntityTemplates.Avatar = {
    name: 'avatar',
    chr: '@',
    fg: '#f00',
    maxHP: 10,
    traits: [Game.EntityTraits.WalkerCorporeal, Game.EntityTraits.StatHitPoints]
};
