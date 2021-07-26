import React, { ReactNode } from 'react';
import './SpellNav.scss';
import _ from 'lodash';
import API from '../../utils/API';
import Helpers from '../../helpers/Helpers';

interface ISpell {
    readonly _id: string,
    readonly name: string,
    readonly aliases: string[],
    readonly level: number,
    readonly text: string,
    readonly school: string,
    readonly castingTime: string,
    readonly range: string,
    readonly materials: string,
    readonly components: string,
    readonly duration: string,
    readonly source: string,
    readonly ritual?: string,
}

type State = {
    spells: ISpell[]
    spell: ISpell | undefined
}

export default class SpellNav extends React.Component<any, State> {
    public readonly state: State = {
        spells: [],
        spell: undefined
    }

    getSpells = (): Promise<ISpell[]> => new Promise((resolve, reject) => {
        API({
            method: 'get',
            url: '/spells',
        }).then(res => {
            if (Helpers.isQuerySuccess(res) && 'spells' in res.data) {
                resolve(res.data.spells);
            } else {
                reject(Error('Something wrong'));
            }
        }).catch(err => {
            reject(err);
        })
    })

    parseSpells(list: ISpell[]): void {
        const spells: ISpell[] = [];

        if (!list.length) return;

        _.cloneDeep(list).forEach(item => {
            spells.push(item)
        });

        this.setState({ spells });

        const lastSpellID = localStorage.getItem('last-spell');
        const lastSpell = this.state.spells.find(spell => spell._id === lastSpellID);

        this.setSpellForEdit(lastSpell || spells[0])
    }

    setSpellForEdit(spell: ISpell): void {
        localStorage.setItem('last-spell', spell._id);

        this.setState({ spell: _.cloneDeep(spell) })
    }

    componentDidMount(): void {
        this.getSpells()
            .then((res: ISpell[]) => {
                this.parseSpells(res)
            })
            .catch(err => {
                throw err
            })
    }

    render = (): ReactNode => (
        <div className="spell-nav">
            <div className="spell-nav__title">Список заклинаний</div>

            <div className="spell-nav__list">
                {this.state.spells.map((spell: ISpell, index) => (
                    <div className="spell-nav__item" key={index}>{spell.name}</div>
                ))}
            </div>
        </div>
    )
}
