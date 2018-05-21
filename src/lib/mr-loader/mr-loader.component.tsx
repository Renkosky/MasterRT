import * as React from 'react';
import * as mu from 'mzmu';
import * as _ from 'lodash';

interface MrLoaderComponentProps {
    data: any;
    start: number | boolean;
    end: number | boolean;
    type: string;
}

export default class MrLoader extends React.Component<MrLoaderComponentProps, {}> {

    render() {
        return (<div></div>);
    }
}