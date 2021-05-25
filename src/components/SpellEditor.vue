<template>
    <div class="spell-editor">
        <nav v-if="spells.length"
             class="spell-editor__nav"
        >
            <div class="spell-editor__nav_title">
                Список заклинаний
            </div>

            <div class="spell-editor__nav_list">
                <a v-for="item in spells"
                   :key="item._id"
                   class="spell-editor__nav_item"
                   :class="{ 'is-active': isSpellInEdit(item) }"
                   @click.left.exact.prevent="setSpellForEdit(item)"
                >
                    {{ item.name }}
                </a>
            </div>
        </nav>

        <div v-if="spell"
             class="spell-editor__spell"
        >
            <label class="spell-editor__field">
                <span class="spell-editor__field_caption">{{ captions.name.label }}</span>

                <input v-model="spell.name"
                       type="text"
                >
            </label>

            <label class="spell-editor__field">
                <span class="spell-editor__field_caption">{{ captions.aliases.label }}</span>

                <input v-for="(alias, index) in aliases"
                       :key="index"
                       :value="alias"
                       type="text"
                       @input.prevent="updateAliases($event, index)"
                >
            </label>

            <label class="spell-editor__field">
                <span class="spell-editor__field_caption">{{ captions.level.label }}</span>

                <select v-model="spell.level">
                    <option v-for="option in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]"
                            :key="option"
                            :value="option"
                    >{{ option }}</option>
                </select>
            </label>

            <label class="spell-editor__field">
                <span class="spell-editor__field_caption">{{ captions.source.label }}</span>

                <select v-model="spell.source"
                        :disabled="true"
                >
                    <option v-for="option in sources"
                            :key="option.key"
                            :value="option.key"
                    >{{ option.label }}</option>
                </select>
            </label>

            <label class="spell-editor__field">
                <span class="spell-editor__field_caption">{{ captions.school.label }}</span>

                <select v-model="spell.school"
                        :disabled="true"
                >
                    <option v-for="option in schools"
                            :key="option.key"
                            :value="option.key"
                    >{{ option.label }}</option>
                </select>
            </label>

            <label class="spell-editor__field">
                <span class="spell-editor__field_caption">{{ captions.castingTime.label }}</span>

                <input v-model="spell.castingTime"
                       type="text"
                >
            </label>

            <label class="spell-editor__field">
                <span class="spell-editor__field_caption">{{ captions.duration.label }}</span>

                <input v-model="spell.duration"
                       type="text"
                >
            </label>

            <label class="spell-editor__field">
                <span class="spell-editor__field_caption">{{ captions.range.label }}</span>

                <input v-model="spell.range"
                       type="text"
                >
            </label>

            <label class="spell-editor__field">
                <span class="spell-editor__field_caption">{{ captions.components.label }}</span>

                <input v-model="spell.components"
                       type="text"
                >
            </label>

            <label class="spell-editor__field">
                <span class="spell-editor__field_caption">{{ captions.materials.label }}</span>

                <textarea v-model="spell.materials"
                          type="text"
                />
            </label>

            <label class="spell-editor__field">
                <span class="spell-editor__field_caption">{{ captions.text.label }}</span>

                <textarea v-model="spell.text"
                          type="text"
                />
            </label>

            <div class="spell-editor__controls">
                <button type="button"
                        class="spell-editor__button"
                        :class="{
                            'is-saved': typeof saved === 'boolean' && saved,
                            'is-error': typeof saved === 'boolean' && !saved
                        }"
                        @click.left.exact.prevent="saveSpell"
                >
                    Сохранить
                </button>
            </div>
        </div>

        <div v-else
             class="spell-editor__empty"
        >
            Заклинания пока не загружены...
        </div>
    </div>
</template>

<script>
    import Helpers from '@/helpers/Helpers';
    import _ from 'lodash';

    export default {
        name: 'SpellEditor',
        data() {
            return {
                spells: [],
                sources: {
                    PHB: {
                        key: 'PHB',
                        label: 'Книга игрока'
                    },
                    XGTE: {
                        key: 'XGTE',
                        label: 'Руководство Занатара обо всем'
                    }
                },
                captions: {
                    name: {
                        key: 'name',
                        label: 'Название'
                    },
                    aliases: {
                        key: 'aliases',
                        label: 'Синонимы'
                    },
                    level: {
                        key: 'level',
                        label: 'Ячейка'
                    },
                    source: {
                        key: 'source',
                        label: 'Источник'
                    },
                    school: {
                        key: 'school',
                        label: 'Школа'
                    },
                    castingTime: {
                        key: 'castingTime',
                        label: 'Время применения'
                    },
                    duration: {
                        key: 'duration',
                        label: 'Длительность'
                    },
                    range: {
                        key: 'range',
                        label: 'Дальность'
                    },
                    components: {
                        key: 'components',
                        label: 'Компоненты'
                    },
                    materials: {
                        key: 'materials',
                        label: 'Материалы'
                    },
                    text: {
                        key: 'text',
                        label: 'Описание'
                    },
                },
                schools: {
                    conjuration: {
                        key: 'conjuration',
                        label: 'Призыв'
                    },
                    abjuration: {
                        key: 'abjuration',
                        label: 'Ограждение'
                    },
                    necromancy: {
                        key: 'necromancy',
                        label: 'Некромантия'
                    },
                    evocation: {
                        key: 'evocation',
                        label: 'Проявление'
                    },
                    enchantment: {
                        key: 'enchantment',
                        label: 'Очарование'
                    },
                    transmutation: {
                        key: 'transmutation',
                        label: 'Преобразование'
                    },
                    illusion: {
                        key: 'illusion',
                        label: 'Иллюзия'
                    },
                    divination: {
                        key: 'divination',
                        label: 'Прорицания'
                    },
                },
                spell: undefined,
                saved: undefined
            }
        },
        computed: {
            aliases: {
                get() {
                    return [
                        ...this.spell.aliases,
                        ""
                    ]
                },

                set(value) {
                    this.spell.aliases = value
                }
            }
        },
        mounted() {
            const token = localStorage.getItem('token');

            if (token === process.env.VUE_APP_TOKEN) {
                this.getSpells();
            }
        },
        methods: {
            getSpells() {
                this.$axios({
                    method: 'get',
                    url: '/spells',
                }).then(res => {
                    if (Helpers.isQuerySuccess(res) && 'spells' in res.data) {
                        this.parseSpells(res.data.spells);
                    }
                })
            },

            parseSpells(list) {
                const spells = [];

                if (!list.length) return;

                list.forEach(item => {
                    spells.push(_.cloneDeep(item))
                });

                this.spells = spells;

                const lastSpellID = localStorage.getItem('last-spell');
                // eslint-disable-next-line no-underscore-dangle
                const lastSpell = this.spells.find(spell => spell._id === lastSpellID);

                this.setSpellForEdit(lastSpell || spells[0])
            },

            setSpellForEdit(spell) {
                // eslint-disable-next-line no-underscore-dangle
                localStorage.setItem('last-spell', spell._id);

                this.spell = { ...spell };
            },

            isSpellInEdit(spell) {
                if (!this.spell) return false;

                // eslint-disable-next-line no-underscore-dangle
                return this.spell._id === spell._id
            },

            saveSpell() {
                this.$axios({
                    method: 'post',
                    url: '/update-spell',
                    data: {
                        spell: _.cloneDeep(this.spell)
                    }
                }).then(res => {
                    if (Helpers.isQuerySuccess(res)) {
                        this.saved = true;

                        this.updateSpell(res.data);
                    }
                }).catch(() => {
                    this.saved = false
                }).finally(() => {
                    setTimeout(() => {
                        this.saved = undefined;
                    }, 2000)
                })
            },

            updateSpell(spell) {
                // eslint-disable-next-line no-underscore-dangle
                const index = this.spells.findIndex(item => item._id === spell._id);
                const newSpell = _.cloneDeep(spell);

                this.spells[index] = newSpell;

                this.setSpellForEdit(newSpell)
            },

            updateAliases(e, index) {
                const aliases = _.cloneDeep(this.aliases);

                aliases[index] = e.target.value;

                this.aliases = aliases;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .spell-editor {
        width: 100vw;
        height: 100vh;
        display: flex;

        &__nav {
            display: flex;
            flex-direction: column;
            width: 320px;
            height: 100%;
            flex-shrink: 0;
            padding: 0 0 12px;
            box-shadow: 0 0 12px transparentize($black-300, .5);

            &_title {
                font-size: 18px;
                line-height: 24px;
                font-weight: 600;
                padding: 12px 16px;
                flex-shrink: 0;
                box-shadow: 0 0 12px transparentize($black-300, .5);
            }

            &_list {
                padding: 12px 0;
                overflow: auto;
                height: 100%;
            }

            &_item {
                display: flex;
                padding: 4px 16px;
                color: $blue;

                &:hover {
                    text-decoration: underline;
                }

                &.is-active {
                    color: $green;
                    font-weight: 600;
                }
            }
        }

        &__spell {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
            height: 100%;
            overflow: auto;
        }

        &__field {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
            padding: 12px 16px;

            &:nth-child(n+2) {
                border-top: 1px solid $black-200;
            }

            &_caption {
                font: {
                    weight: 600;
                };
            }

            input, textarea, select {
                @include css_anim();

                margin-top: 4px;
                width: 100%;
                border: 1px solid $black-200;
                padding: 4px 8px;
                border-radius: 4px;

                &:focus-within {
                    @include css_anim();

                    border-color: $black-300;
                }
            }

            select {
                &:not(:disabled) {
                    cursor: pointer;
                }
            }

            textarea {
                height: auto;
                min-height: 256px;
                resize: none;
            }
        }

        &__controls {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 100%;
            padding: 12px 16px;
        }

        &__button {
            @include css_anim();

            color: $white;
            align-items: center;
            display: inline-flex;
            border-radius: 4px;
            padding: 8px 12px;
            justify-content: center;
            background-color: $blue;
            border: 1px solid $blue;
            cursor: pointer;

            &:nth-child(n+2) {
                margin-left: 8px;
            }

            &:hover {
                &:not(:disabled),
                &:not(.is-disabled) {
                    @include css_anim();

                    background-color: $blue-400;
                    border-color: $blue-400;
                }
            }

            &:active {
                &:not(:disabled),
                &:not(.is-disabled) {
                    @include css_anim();

                    background-color: $blue-700;
                    border-color: $blue-700;
                }
            }

            &.is-saved {
                background-color: $green;
                border-color: $green;

                &:hover, &.is-disabled, &:disabled {
                    background-color: $green;
                    border-color: $green;
                }
            }

            &.is-error {
                background-color: $red;
                border-color: $red;

                &:hover, &.is-disabled, &:disabled {
                    background-color: $red;
                    border-color: $red;
                }
            }
        }

        &__empty {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            font-weight: 600;
            font-size: 24px;
            line-height: 32px;
            color: $black-400;
        }
    }
</style>
