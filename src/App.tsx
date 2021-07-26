import React, { ReactNode } from 'react';
import Spell from './components/Spell/Spell';

export default class App extends React.Component {
    render = (): ReactNode => (
        <div className="dnd-app">
            <Spell/>
        </div>
    )
}
