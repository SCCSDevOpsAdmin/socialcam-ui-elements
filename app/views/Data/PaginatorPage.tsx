import React, { useState } from 'react';
import { Paginator } from 'src/elements';
import { Button } from 'src/elements';
import { Ripple } from 'src/elements';
import { Dropdown } from 'src/elements';
import { InputText } from 'src/elements';
// import { Slider } from 'src/elements';
//import { Tooltip } from '../tooltip/Tooltip';
import { classNames } from 'src/utils/Utils';

const PaginatorPage = () => {
    const [basicFirst, setBasicFirst] = useState(0);
    const [basicRows, setBasicRows] = useState(10);
    const [customFirst1, setCustomFirst1] = useState(0);
    const [customRows1, setCustomRows1] = useState(10);
    const [customFirst2, setCustomFirst2] = useState(0);
    const [customRows2, setCustomRows2] = useState(10);
    const [customFirst3, setCustomFirst3] = useState(0);
    const [customRows3, setCustomRows3] = useState(10);
    const [contentFirst, setContentFirst] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInputTooltip, setPageInputTooltip] = useState(
        "Press 'Enter' key to go to this page."
    );

    const onBasicPageChange = (event) => {
        setBasicFirst(event.first);
        setBasicRows(event.rows);
    };

    const onCustomPageChange1 = (event) => {
        setCustomFirst1(event.first);
        setCustomRows1(event.rows);
        setCurrentPage(event.page + 1);
    };

    const onCustomPageChange2 = (event) => {
        setCustomFirst2(event.first);
        setCustomRows2(event.rows);
    };

    const onCustomPageChange3 = (event) => {
        setCustomFirst3(event.first);
        setCustomRows3(event.rows);
    };

    const onContentPageChange = (event) => {
        setContentFirst(event.first);
    };

    const onPageInputKeyDown = (event, options) => {
        if (event.key === 'Enter') {
            const page = currentPage; //parseInt(currentPage);
            if (page < 0 || page > options.totalPages) {
                setPageInputTooltip(
                    `Value must be between 1 and ${options.totalPages}.`
                );
            } else {
                const first = currentPage ? options.rows * (page - 1) : 0;

                setCustomFirst1(first);
                setPageInputTooltip("Press 'Enter' key to go to this page.");
            }
        }
    };

    const onPageInputChange = (event) => {
        setCurrentPage(event.target.value);
    };

    const leftContent = (
        <Button
            type="button"
            icon="csi csi-refresh"
            onClick={() => setContentFirst(0)}
        />
    );
    const rightContent = <Button type="button" icon="csi csi-search" />;
    const template1 = {
        layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
        PrevPageLink: (options) => {
            return (
                <button
                    type="button"
                    className={options.className}
                    onClick={options.onClick}
                    disabled={options.disabled}
                >
                    <span className="cs-3">Previous</span>
                    <Ripple />
                </button>
            );
        },
        NextPageLink: (options) => {
            return (
                <button
                    type="button"
                    className={options.className}
                    onClick={options.onClick}
                    disabled={options.disabled}
                >
                    <span className="cs-3">Next</span>
                    <Ripple />
                </button>
            );
        },
        PageLinks: (options) => {
            if (
                (options.view.startPage === options.page &&
                    options.view.startPage !== 0) ||
                (options.view.endPage === options.page &&
                    options.page + 1 !== options.totalPages)
            ) {
                const className = classNames(options.className, {
                    'cs-disabled': true,
                });

                return (
                    <span className={className} style={{ userSelect: 'none' }}>
                        ...
                    </span>
                );
            }

            return (
                <button
                    type="button"
                    className={options.className}
                    onClick={options.onClick}
                >
                    {options.page + 1}
                    <Ripple />
                </button>
            );
        },
        RowsPerPageDropdown: (options) => {
            const dropdownOptions = [
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 30, value: 30 },
                { label: 'All', value: options.totalRecords },
            ];

            return (
                <Dropdown
                    value={options.value}
                    options={dropdownOptions}
                    onChange={options.onChange}
                />
            );
        },
        CurrentPageReport: (options) => {
            return (
                <span
                    className="mx-3"
                    style={{ color: 'var(--text-color)', userSelect: 'none' }}
                >
                    Go to{' '}
                    <InputText
                        className="ml-1"
                        value={currentPage}
                        tooltip={pageInputTooltip}
                        onKeyDown={(e) => onPageInputKeyDown(e, options)}
                        onChange={onPageInputChange}
                    />
                </span>
            );
        },
    };
    const template2 = {
        layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
        RowsPerPageDropdown: (options) => {
            const dropdownOptions = [
                { label: 5, value: 5 },
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 120, value: 120 },
            ];

            return (
                <React.Fragment>
                    <span
                        className="mx-1"
                        style={{
                            color: 'var(--text-color)',
                            userSelect: 'none',
                        }}
                    >
                        Items per page:{' '}
                    </span>
                    <Dropdown
                        value={options.value}
                        options={dropdownOptions}
                        onChange={options.onChange}
                    />
                </React.Fragment>
            );
        },
        CurrentPageReport: (options) => {
            return (
                <span
                    style={{
                        color: 'var(--text-color)',
                        userSelect: 'none',
                        width: '120px',
                        textAlign: 'center',
                    }}
                >
                    {options.first} - {options.last} of {options.totalRecords}
                </span>
            );
        },
    };
    const template3 = {
        layout: 'RowsPerPageDropdown PrevPageLink PageLinks NextPageLink CurrentPageReport',
        RowsPerPageDropdown: (options) => {
            return (
                <></>
                // <div className="flex align-items-center">
                //     <Tooltip target=".slider>.cs-slider-handle" content={`${options.value} / page`} position="top" event="focus" />

                //     <span className="mr-3" style={{ color: 'var(--text-color)', userSelect: 'none' }}>Items per page: </span>
                //     <Slider className="slider" value={options.value} onChange={options.onChange} min={10} max={120} step={30} style={{ width: '10rem' }} />
                // </div>
            );
        },
        CurrentPageReport: (options) => {
            return (
                <span
                    style={{
                        color: 'var(--text-color)',
                        userSelect: 'none',
                        width: '120px',
                        textAlign: 'center',
                    }}
                >
                    {options.first} - {options.last} of {options.totalRecords}
                </span>
            );
        },
    };

    return (
        <div className="paginator-demo">
            <div className="card">
                <h5>Basic</h5>
                <Paginator
                    first={basicFirst}
                    rows={basicRows}
                    totalRecords={120}
                    rowsPerPageOptions={[10, 20, 30]}
                    onPageChange={onBasicPageChange}
                ></Paginator>

                <h5>Custom Template</h5>
                <Paginator
                    template={template1}
                    first={customFirst1}
                    rows={customRows1}
                    totalRecords={120}
                    onPageChange={onCustomPageChange1}
                ></Paginator>
                <Paginator
                    template={template2}
                    first={customFirst2}
                    rows={customRows2}
                    totalRecords={120}
                    onPageChange={onCustomPageChange2}
                    className="justify-content-end my-3"
                ></Paginator>
                <Paginator
                    template={template3}
                    first={customFirst3}
                    rows={customRows3}
                    totalRecords={120}
                    onPageChange={onCustomPageChange3}
                    className="justify-content-start my-3"
                ></Paginator>

                <h5>Left and Right Content</h5>
                <Paginator
                    first={contentFirst}
                    rows={1}
                    totalRecords={12}
                    onPageChange={onContentPageChange}
                    template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                ></Paginator>
                <Paginator
                    first={contentFirst}
                    rows={1}
                    totalRecords={12}
                    onPageChange={onContentPageChange}
                    leftContent={leftContent}
                    rightContent={rightContent}
                    template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                ></Paginator>

                <div className="image-gallery">
                    <img
                        alt={String(contentFirst)}
                        src={`images/nature/nature${contentFirst + 1}.jpg`}
                    />
                    {/* onError={(e) => e.target.src = 'https://www.primefaces.org/wcs-content/uploads/2020/05/placeholder.png'} */}
                </div>
            </div>
        </div>
    );
};

export default PaginatorPage;
