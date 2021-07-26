import React, { ReactNode } from 'react';
import './Spell.scss';
import SpellNav from './SpellNav';

export default class Spell extends React.Component {
    render = (): ReactNode => (
        <div className="spell">
            <SpellNav/>
        </div>
    )
}
