import * as React from 'react';
import MrServices from '../common/mr.services';
import * as mu from 'mzmu';

export interface MrDownloadProps {
    url?: string;
    filename?: string;
    content?: string;
    mime?: string;
    // download event: 'click', 'load', 'over' | 'click'
    event?: string;
}

/**
 * 用于下载文件
 *
 * 支持URL（path, 路径）
 * 支持二进制
 * 支持文本
 * 支持图片
 */
export class MrDownload extends React.Component<MrDownloadProps, {}> {

    download(eventName: string) {
        const {url, filename, content, event= 'click', mime} = this.props;
        if(eventName === event){
            if(url){
                MrServices.download(url);
            } else {
                MrServices.download(content, filename, mime);
            }
        }
    }

    componentWillMount() {
        if(this.props.event === 'load') {
            this.download('load');
        }
    }

    render() {
        return this.props.event === 'load' ? '' : <span onClick={this.download.bind(this, 'click')} onMouseOver={this.download.bind(this, 'over')}>{this.props.children}</span>;
    }
}
