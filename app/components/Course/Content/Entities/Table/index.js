import React, { Component, PropTypes } from 'react';
import {
  Table as AntTable,
  Button as AntButton,
} from 'antd';
import {
  set,
  random,
  omit,
  get,
} from 'lodash/fp';
import classNames from 'classnames';
import {
  Entity,
  EditorState,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import {
  entitiesDecorator,
} from '../../Entities';
import Cell from './Cell';
import Editor from './Editor';
import styles from './styles.css';


const toggleColumnFixedWidth = (isEqual, temp) => {
  const { columns } = temp;
  return {
    ...temp,
    tableStyles: set([
      'equalColumnsWidth',
    ],
      isEqual,
      temp.tableStyles,
    ),
    columns: columns.map((obj) => ({
      ...obj,
      width: isEqual ? `${100 / columns.length}%` : null,
    })),
  };
};

const renderCell = (value) => (
  <Cell value={value} isReadOnly />
);

const convertRawOrEmptyState = (raw) => (
  raw
  ? EditorState
    .createWithContent(
      convertFromRaw(raw),
      entitiesDecorator
    )
  : EditorState.createEmpty()
);

const convertRawToDraftEditorState = (object) =>
  object && ({
    ...object,
    dataSource: object.dataSource.map((row) => (
      (row.editorKeys || []).reduce((obj, key) => ({
        ...obj,
        [key]: EditorState
          .createWithContent(
          convertFromRaw(row[key]),
          entitiesDecorator
        ),
      }), row))
    ),
    columns: object.columns.map((column) => ({
      ...column,
      editorStateTtle: convertRawOrEmptyState(column.editorStateTtle),
      title: (<Cell
        value={convertRawOrEmptyState(column.editorStateTtle)}
        isReadOnly
      />),
      render: renderCell,
    })),
  });

const convertDraftEditorStateToRow = (object) => ({
  ...object,
  dataSource: object.dataSource.map((row) => (
    Object.keys(row).reduce((obj, key) => (
      row[key] instanceof EditorState ? {
        [key]: convertToRaw(
          row[key]
            .getCurrentContent()
        ),
        editorKeys: obj.editorKeys.concat([key]),
      } : obj
    ), { ...row, editorKeys: [] })
  )),
  columns: object.columns.map((col) => ({
    ...col,
    editorStateTtle: convertToRaw(
      col.editorStateTtle
        .getCurrentContent()
    ),
  })),
});


class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: convertRawToDraftEditorState(this.props.content),
      isReadOnly: true,
      temp: false,
    };
  }

  onCellChange = (index, key) => (value) => {
    this.setState({
      temp: set([
        'dataSource',
        index,
        key,
      ],
        value,
        this.state.temp,
      ),
    });
  }

  editTable = (type, columnKey, index) => () => {
    this[type](columnKey, index);
  }

  addColumn = (columnKey) => {
    const dataIndex = `index${random(0, 999)}`;
    const { temp } = this.state;
    const dataSource = temp.dataSource
      .map((obj) => ({
        ...obj,
        [dataIndex]: EditorState.createEmpty(),
      }));
    const newCol = {
      editorStateTtle: EditorState.createEmpty(),
      dataIndex,
    };
    const columns = [].concat(
      temp.columns.slice(0, columnKey),
      [newCol],
      temp.columns.slice(columnKey),
    );
    // columns.splice(columnKey, 0, newCol); // eslint-disable-line
    this.setState({
      temp: toggleColumnFixedWidth(
        temp.tableStyles.equalColumnsWidth,
        {
          ...temp,
          columns: this.makeEditableColumns(columns),
          dataSource,
        }
      ),
    });
  }

  delColumn = (columnKey) => {
    const {
      temp: {
        columns,
        dataSource,
      },
      temp,
    } = this.state;
    const { dataIndex } = columns[columnKey];
    this.setState({
      temp: toggleColumnFixedWidth(
        temp.tableStyles.equalColumnsWidth,
        {
          ...temp,
          dataSource: dataSource
            .map((obj) => omit(dataIndex, obj)),
          columns: this.makeEditableColumns(
            columns.filter((val, key) => key !== columnKey)
          ),
        }
      ),
    });
  }

  addRow = (columnKey, index) => {
    const newDataSource = [...this.state.temp.dataSource];
    const newRow = Object.keys(newDataSource[0])
      .reduce((obj, key) => ({
        ...obj,
        [key]: key === 'editorKeys'
        ? newDataSource[0].editorKeys
        : EditorState.createEmpty(),
      }), {});
    newRow.key = `${random(0, 999)}`; // eslint-disable-line
    newDataSource.splice(index, 0, newRow); // eslint-disable-line
    this.setState({
      temp: set([
        'dataSource',
      ],
        newDataSource,
        this.state.temp,
      ),
    });
  }

  delRow = (columnKey, index) => {
    const { dataSource } = this.state.temp;
    if (dataSource.length > 1) {
      this.setState({
        temp: set([
          'dataSource',
        ],
          dataSource.filter((val, key) => key !== index),
          this.state.temp,
        ),
      });
    }
  }

  headChange = (columnKey) => (value) => {
    this.setState({
      temp: set([
        'columns',
        columnKey,
        'title',
      ],
        <Cell
          editTable={this.editTable}
          index={-1}
          value={value}
          onChange={this.headChange(columnKey)}
          columnKey={columnKey}
        />,
        set([
          'columns',
          columnKey,
          'editorStateTtle',
        ],
          value,
          this.state.temp,
        ),
      ),
    });
  };

  editMode = () => {
    const { content: {
      columns,
    }, content } = this.state;
    this.setState({
      isReadOnly: false,
      temp: {
        ...content,
        columns: this.makeEditableColumns(columns),
      },
    }, this.context.toggleReadOnly);
  }

  saveSettings = () => {
    const {
      temp: { columns },
      temp,
    } =
      this.state;
    const content = {
      ...temp,
      columns: columns.map((obj) => ({
        ...obj,
        title: (<Cell
          value={obj.editorStateTtle}
          isReadOnly
        />),
        render: (value) => (
          <Cell
            value={value}
            isReadOnly
          />
        ),
      })),
    };
    Entity.mergeData(
      this.props.entityKey, {
        content: convertDraftEditorStateToRow(temp),
      }
    );
    this.setState({
      content,
      temp: false,
      isReadOnly: true,
    });
    this.context.toggleReadOnly();
  }

  closeEditor = () => {
    this.setState({
      temp: false,
      isReadOnly: true,
    });
    this.context.toggleReadOnly();
  }

  makeEditableColumns = (columns) => columns
    .map((obj, key) => ({
      ...obj,
      title: (
      // Компонент для рендера ячейки заголовков таблицы должен
      // храниться в этом свойстве https://ant.design/components/table/
        <Cell
          index={-1}
          value={obj.editorStateTtle}
          onChange={this.headChange(key)}
          columnKey={key}
          editTable={this.editTable}
        />),
      render: (text, record, index) => (
      // Функция для рендера ячейки должна
      // храниться в этом свойстве https://ant.design/components/table/
        <Cell
          editTable={this.editTable}
          index={index}
          value={text}
          onChange={this.onCellChange(index, obj.dataIndex)}
          columnKey={key}
        />
      ),
    }))

  editorOnChange = (type) => (e) => {
    const { temp } = this.state;
    if (type === 'equalColumnsWidth') {
      this.setState({
        temp: toggleColumnFixedWidth(e.target.checked, temp),
      });
    } else if (!e.target) {
      this.setState({
        temp: set([
          'tableStyles',
          type,
        ],
          { [e]: true },
          this.state.temp,
        ),
      });
    } else {
      this.setState({
        temp: set([
          'tableStyles',
          type,
        ],
          e.target.checked,
          this.state.temp,
        ),
      });
    }
  }

  deleteBlock = () => this.context.removeBlock(this.props.blockKey);

  render() {
    const { dataSource, columns, tableStyles } = this.state.temp || this.state.content;
    const { isReadOnly } = this.state;
    return (<div
      className={classNames(
        styles.table, {
          [styles.editing]: !isReadOnly,
          ...tableStyles.headOptions,
          ...tableStyles.tableOptions,
        }
      )}
      onDoubleClick={isReadOnly && this.editMode}
    >
      <AntTable
        bordered={get(['tableOptions', 'table__big'], tableStyles)}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        showHeader={!tableStyles.hideHeader}
      />
      {isReadOnly ?
        <div className={styles.actions}>
          <AntButton
            type="danger"
            icon="close-circle"
            className={styles.icon}
            onClick={this.deleteBlock}
          />
          <AntButton
            type="primary"
            icon="edit"
            className={styles.icon}
            onClick={this.editMode}
          />
        </div>
        : <div className={styles.editor}>
          <Editor
            saveSettings={this.saveSettings}
            closeEditor={this.closeEditor}
            onChange={this.editorOnChange}
            tableStyles={tableStyles}
          />
          <div className={styles.actions}>
            <AntButton
              type="primary"
              icon="rollback"
              className={styles.icon}
              onClick={this.closeEditor}
            />
            <AntButton
              type="primary"
              icon="check-circle"
              className={styles.icon}
              onClick={this.saveSettings}
            />
          </div>
        </div>
      }
    </div>);
  }
}

Table.propTypes = {
  blockKey: PropTypes.string.isRequired,
  entityKey: PropTypes.string.isRequired,
  content: PropTypes.shape({
    dataSource: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
  }).isRequired,
};

Table.defaultProps = {
  content: {
    tableStyles: {
      tableOptions: {
        table__big: true,
      },
      headOptions: {
        'table-head__bold': true,
      },
    },
    columns: [{
      title: '',
      dataIndex: 'name',
    }, {
      title: '',
      dataIndex: 'age',
    }, {
      title: '',
      dataIndex: 'address',
    }],
    dataSource: [{
      key: '0',
      name: {},
      age: {},
      address: {},
    }, {
      key: '1',
      name: {},
      age: {},
      address: {},
    }],
  },
};

Table.contextTypes = {
  toggleReadOnly: PropTypes.func,
  removeBlock: PropTypes.func,
};

export default Table;
