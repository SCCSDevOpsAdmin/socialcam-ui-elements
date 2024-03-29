import * as React from 'react';
import { usePrevious } from '../../hooks/Hooks';
import { classNames, DomHandler, ObjectUtils } from 'src/utils/Utils';
import { ColumnFilter } from './ColumnFilter';
import { HeaderCheckbox } from './HeaderCheckbox';
import './DataTable.scss';

export const HeaderCell = React.memo((props: any) => {
    const [styleObjectState, setStyleObjectState] = React.useState({});
    const elementRef = React.useRef(null);
    const prevColumn = usePrevious(props.column);

    const isBadgeVisible = () => {
        return props.multiSortMeta && props.multiSortMeta.length > 1;
    };

    const isSortableDisabled = () => {
        return (
            !getColumnProp('sortable') ||
            (getColumnProp('sortable') &&
                (props.allSortableDisabled ||
                    getColumnProp('sortableDisabled')))
        );
    };

    const getColumnProp = (...args) => {
        return props.column
            ? typeof args[0] === 'string'
                ? props.column.props[args[0]]
                : (args[0] || props.column).props[args[1]]
            : null;
    };

    const getStyle = () => {
        const headerStyle = getColumnProp('headerStyle');
        const columnStyle = getColumnProp('style');

        return getColumnProp('frozen')
            ? Object.assign({}, columnStyle, headerStyle, styleObjectState)
            : Object.assign({}, columnStyle, headerStyle);
    };

    const getMultiSortMetaIndex = () => {
        return props.multiSortMeta.findIndex(
            (meta) =>
                meta.field === getColumnProp('field') ||
                meta.field === getColumnProp('sortField')
        );
    };

    const getSortMeta = () => {
        let sorted = false;
        let sortOrder = 0;
        let metaIndex = -1;

        if (props.sortMode === 'single') {
            sorted =
                props.sortField &&
                (props.sortField === getColumnProp('field') ||
                    props.sortField === getColumnProp('sortField'));
            sortOrder = sorted ? props.sortOrder : 0;
        } else if (props.sortMode === 'multiple') {
            metaIndex = getMultiSortMetaIndex();
            if (metaIndex > -1) {
                sorted = true;
                sortOrder = props.multiSortMeta[metaIndex].order;
            }
        }

        return { sorted, sortOrder, metaIndex };
    };

    const getAriaSort = ({ sorted, sortOrder }) => {
        if (getColumnProp('sortable')) {
            const sortIcon = sorted
                ? sortOrder < 0
                    ? 'csi-sort-amount-down'
                    : 'csi-sort-amount-up-alt'
                : 'csi-sort-alt';
            if (sortIcon === 'csi-sort-amount-down') return 'descending';
            else if (sortIcon === 'csi-sort-amount-up-alt') return 'ascending';
            else return 'none';
        }

        return null;
    };

    const updateStickyPosition = () => {
        if (getColumnProp('frozen')) {
            let styleObject = { ...styleObjectState };
            let align = getColumnProp('alignFrozen');
            if (align === 'right') {
                let right = 0;
                let next = elementRef.current.nextElementSibling;
                if (next) {
                    right =
                        DomHandler.getOuterWidth(next) +
                        parseFloat(next.style.right || 0);
                }
                styleObject['right'] = right + 'px';
            } else {
                let left = 0;
                let prev = elementRef.current.previousElementSibling;
                if (prev) {
                    left =
                        DomHandler.getOuterWidth(prev) +
                        parseFloat(prev.style.left || 0);
                }
                styleObject['left'] = left + 'px';
            }

            let filterRow = elementRef.current.parentElement.nextElementSibling;
            if (filterRow) {
                let index = DomHandler.index(elementRef.current);
                filterRow.children[index].style.left = styleObject['left'];
                filterRow.children[index].style.right = styleObject['right'];
            }

            const isSameStyle =
                styleObjectState['left'] === styleObject['left'] &&
                styleObjectState['right'] === styleObject['right'];
            !isSameStyle && setStyleObjectState(styleObject);
        }
    };

    const updateSortableDisabled = (prevColumn) => {
        if (
            getColumnProp(prevColumn, 'sortableDisabled') !==
                getColumnProp('sortableDisabled') ||
            getColumnProp(prevColumn, 'sortable') !== getColumnProp('sortable')
        ) {
            props.onSortableChange();
        }
    };

    const onClick = (event) => {
        if (!isSortableDisabled()) {
            let targetNode = event.target;
            if (
                DomHandler.hasClass(targetNode, 'cs-sortable-column') ||
                DomHandler.hasClass(targetNode, 'cs-column-title') ||
                DomHandler.hasClass(targetNode, 'cs-column-header-content') ||
                DomHandler.hasClass(targetNode, 'cs-sortable-column-icon') ||
                DomHandler.hasClass(
                    targetNode.parentElement,
                    'cs-sortable-column-icon'
                )
            ) {
                DomHandler.clearSelection();

                props.onSortChange({
                    originalEvent: event,
                    column: props.column,
                    sortableDisabledFields: props.sortableDisabledFields,
                });
            }
        }
    };

    const onMouseDown = (event) => {
        props.onColumnMouseDown({ originalEvent: event, column: props.column });
    };

    const onKeyDown = (event) => {
        if (
            event.key === 'Enter' &&
            event.currentTarget === elementRef.current &&
            DomHandler.hasClass(event.currentTarget, 'cs-sortable-column')
        ) {
            onClick(event);

            event.preventDefault();
        }
    };

    const onDragStart = (event) => {
        props.onColumnDragStart({ originalEvent: event, column: props.column });
    };

    const onDragOver = (event) => {
        props.onColumnDragOver({ originalEvent: event, column: props.column });
    };

    const onDragLeave = (event) => {
        props.onColumnDragLeave({ originalEvent: event, column: props.column });
    };

    const onDrop = (event) => {
        props.onColumnDrop({ originalEvent: event, column: props.column });
    };

    const onResizerMouseDown = (event) => {
        props.onColumnResizeStart({
            originalEvent: event,
            column: props.column,
        });
    };

    const onResizerClick = (event) => {
        if (props.onColumnResizerClick) {
            props.onColumnResizerClick({
                originalEvent: event,
                element: event.currentTarget.parentElement,
                column: props.column,
            });

            event.preventDefault();
        }
    };

    const onResizerDoubleClick = (event) => {
        if (props.onColumnResizerDoubleClick) {
            props.onColumnResizerDoubleClick({
                originalEvent: event,
                element: event.currentTarget.parentElement,
                column: props.column,
            });

            event.preventDefault();
        }
    };

    React.useEffect(() => {
        if (getColumnProp('frozen')) {
            updateStickyPosition();
        }

        updateSortableDisabled(prevColumn);
    });

    const createResizer = () => {
        if (props.resizableColumns && !getColumnProp('frozen')) {
            return (
                <span
                    className="cs-column-resizer"
                    onMouseDown={onResizerMouseDown}
                    onClick={onResizerClick}
                    onDoubleClick={onResizerDoubleClick}
                ></span>
            );
        }

        return null;
    };

    const createTitle = () => {
        const title = ObjectUtils.getJSXElement(getColumnProp('header'), {
            props: props.tableProps,
        });

        return <span className="cs-column-title">{title}</span>;
    };

    const createSortIcon = ({ sorted, sortOrder }) => {
        if (getColumnProp('sortable')) {
            let sortIcon = sorted
                ? sortOrder < 0
                    ? 'csi-sort-amount-down'
                    : 'csi-sort-amount-up-alt'
                : 'csi-sort-alt';
            let className = classNames(
                'cs-sortable-column-icon csi csi-fw',
                sortIcon
            );

            return <span className={className}></span>;
        }

        return null;
    };

    const createBadge = ({ metaIndex }) => {
        if (metaIndex !== -1 && isBadgeVisible()) {
            const value =
                props.groupRowsBy &&
                props.groupRowsBy === props.groupRowSortField
                    ? metaIndex
                    : metaIndex + 1;

            return <span className="cs-sortable-column-badge">{value}</span>;
        }

        return null;
    };

    const createCheckbox = () => {
        if (
            props.showSelectAll &&
            getColumnProp('selectionMode') === 'multiple' &&
            props.filterDisplay !== 'row'
        ) {
            const allRowsSelected = props.allRowsSelected(props.value);

            return (
                <HeaderCheckbox
                    checked={allRowsSelected}
                    onChange={props.onColumnCheckboxChange}
                    disabled={props.empty}
                />
            );
        }

        return null;
    };

    const createFilter = () => {
        if (props.filterDisplay === 'menu' && getColumnProp('filter')) {
            return (
                <ColumnFilter
                    display="menu"
                    column={props.column}
                    filters={props.filters}
                    onFilterChange={props.onFilterChange}
                    onFilterApply={props.onFilterApply}
                    filtersStore={props.filtersStore}
                />
            );
        }

        return null;
    };

    const createHeader = (sortMeta) => {
        const title = createTitle();
        const sortIcon = createSortIcon(sortMeta);
        const badge = createBadge(sortMeta);
        const checkbox = createCheckbox();
        const filter = createFilter();

        return (
            <div className="cs-column-header-content">
                {title}
                {sortIcon}
                {badge}
                {checkbox}
                {filter}
            </div>
        );
    };

    const createElement = () => {
        const _isSortableDisabled = isSortableDisabled();
        const sortMeta = getSortMeta();
        const style = getStyle();
        const align = getColumnProp('alignHeader') || getColumnProp('align');
        const frozen = getColumnProp('frozen');
        const className = classNames(
            getColumnProp('headerClassName'),
            getColumnProp('className'),
            {
                'cs-sortable-column': getColumnProp('sortable'),
                'cs-resizable-column':
                    props.resizableColumns && getColumnProp('resizeable'),
                'cs-highlight': sortMeta.sorted,
                'cs-frozen-column': frozen,
                'cs-selection-column': getColumnProp('selectionMode'),
                'cs-sortable-disabled':
                    getColumnProp('sortable') && _isSortableDisabled,
                'cs-reorderable-column':
                    props.reorderableColumns &&
                    getColumnProp('reorderable') &&
                    !frozen,
                [`cs-align-${align}`]: !!align,
            }
        );
        const tabIndex =
            getColumnProp('sortable') && !_isSortableDisabled
                ? props.tabIndex
                : null;
        const colSpan = getColumnProp('colSpan');
        const rowSpan = getColumnProp('rowSpan');
        const ariaSort = getAriaSort(sortMeta);

        const resizer = createResizer();
        const header = createHeader(sortMeta);

        return (
            <th
                ref={elementRef}
                style={style}
                className={className}
                tabIndex={tabIndex}
                role="columnheader"
                onClick={onClick}
                onKeyDown={onKeyDown}
                onMouseDown={onMouseDown}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                colSpan={colSpan}
                rowSpan={rowSpan}
                aria-sort={ariaSort}
            >
                {resizer}
                {header}
            </th>
        );
    };

    const element = createElement();

    return element;
});

HeaderCell.displayName = 'HeaderCell';
