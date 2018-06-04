import React from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

class MyState {
    @observable num = 0;

    @action addNum = () => {
        this.num++;
    };
}

const newState = new MyState();

@observer
export default class App extends React.Component {


    componentWillMount() {
        console.debug('000000000', this);
    }

    componentWillReceiveProps(nextProps) {
        console.debug(2222222222222, nextProps);
    }

    shouldComponentUpdate(nextProps) {
        console.debug('shouldComponentUpdate');
        return true;
    }

    componentWillUpdate() {
        console.debug(333333333333);
    }

    render() {

        console.debug(444444444444);

        return (
            <div>
                <p>{newState.num}</p>
                <button onClick={newState.addNum}>+1</button>
            </div>
        )
    }
}

