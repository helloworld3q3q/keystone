import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import localeData from '../translations/data.json';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
//需要本地化的语言
addLocaleData([...en, ...zh]);
//获取本地语言
const language = (navigator.languages && navigator.languages[0]) ||
                     navigator.language ||
                     navigator.userLanguage;

const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
//messages data.json 里对应的 语言文本
const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.zh;

class Translate extends Component {
	constructor(props) {
        super(props);
    }

    render() {
        //this.props.Template 父级传来的 this.props.Template
    	return (
	    	<IntlProvider locale={ language } messages={ messages }>
	    		{this.props.Template}
	    	</IntlProvider>
	    );
    }
}

module.exports = Translate;