import { css, StyleSheet } from 'aphrodite/no-important';
import React, { Component, PropTypes } from 'react';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';
import Page from './page';
import theme from '../../../theme';

const messages = defineMessages({
    showing: {id: 'Showing'},
    to: {id: 'to'},
    of: {id: 'of'},
    strip: {id: 'strip'},
});

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state={
            formatMessage: this.props.intl['formatMessage'],
        };
    }
    renderCount () {
        let count = '';
        const { currentPage, pageSize, plural, singular, total } = this.props;
        let show = this.state.formatMessage(messages.showing);
        let strip = this.state.formatMessage(messages.strip);

        if (total > pageSize) {
            let start = (pageSize * (currentPage - 1)) + 1;
            let end = Math.min(start + pageSize - 1, total);
            count = `${show} ${start} ${this.state.formatMessage(messages.to)} ${end} ${this.state.formatMessage(messages.of)} ${total}`;
        } else if(total) {
            count = total + strip;
        }
        return (
            <div className={css(classes.count)} data-e2e-pagination-count>
                {total ? count : <FormattedMessage id={'None'}/>}
                {
                    total && total <= pageSize ? 
                    ( total > 1 && plural ? <FormattedMessage id={plural}/> : null) :null
                }
                {
                    total && total <= pageSize ?
                    ( total === 1 && singular ? <FormattedMessage id={singular}/> : null) :null
                }
            </div>
        );
    }
    renderPages () {
        const { currentPage, limit, onPageSelect, pageSize, total } = this.props;

        if (total <= pageSize) return null;

        let pages = [];
        let totalPages = Math.ceil(total / pageSize);
        let minPage = 1;
        let maxPage = totalPages;

        if (limit && (limit < totalPages)) {
            let rightLimit = Math.floor(limit / 2);
            let leftLimit = rightLimit + (limit % 2) - 1;
            minPage = currentPage - leftLimit;
            maxPage = currentPage + rightLimit;

            if (minPage < 1) {
                maxPage = limit;
                minPage = 1;
            }
            if (maxPage > totalPages) {
                minPage = totalPages - limit + 1;
                maxPage = totalPages;
            }
        }
        if (minPage > 1) {
            pages.push(<Page key="page_start" onClick={() => onPageSelect(1)}>...</Page>);
        }
        for (let page = minPage; page <= maxPage; page++) {
            let selected = (page === currentPage);
            /* eslint-disable no-loop-func */
            pages.push(<Page key={'page_' + page} selected={selected} onClick={() => onPageSelect(page)}>{page}</Page>);
            /* eslint-enable */
        }
        if (maxPage < totalPages) {
            pages.push(<Page key="page_end" onClick={() => onPageSelect(totalPages)}>...</Page>);
        }
        return (
            <div className={css(classes.list)}>
                {pages}
            </div>
        );
    }
    render () {
        const className = css(classes.container, this.props.className);
        return (
            <div className={className} style={this.props.style}>
                {this.renderCount()}
                {this.renderPages()}
            </div>
        );
    }
};

const classes = StyleSheet.create({
    container: {
        display: 'block',
        lineHeight: theme.component.lineHeight,
        marginBottom: '2em',
    },
    count: {
        display: 'inline-block',
        marginRight: '1em',
        verticalAlign: 'middle',
    },
    list: {
        display: 'inline-block',
        verticalAlign: 'middle',
    },
});

Pagination.propTypes = {
    className: PropTypes.string,
    currentPage: PropTypes.number.isRequired,
    limit: PropTypes.number,
    onPageSelect: PropTypes.func,
    pageSize: PropTypes.number.isRequired,
    plural: PropTypes.string,
    singular: PropTypes.string,
    style: PropTypes.object,
    total: PropTypes.number.isRequired,
};

module.exports = injectIntl(Pagination);