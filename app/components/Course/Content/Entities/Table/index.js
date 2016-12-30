import React, { Component, PropTypes } from 'react';
import {
  Table as AntTable,
  Button as AntButton,
} from 'antd';
import {
  get,
  set,
  omit,
  random,
} from 'lodash/fp';
import {
  Entity,
  EditorState,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import classNames from 'classnames';
import {
  entitiesDecorator,
} from '../../Entities';
import Cell from './Cell';
import Editor from './Editor';
import styles from './styles.css';

const toggleColumnFixedWidth = (isEqual, content) => {
  const { columns } = content.data;
  return {
    ...content,
    styles: set([
      'equalColumnsWidth',
    ],
      isEqual,
      content.styles,
    ),
    data: {
      ...content.data,
      columns: columns.map((column) => ({
        ...column,
        width: isEqual
          ? `${100 / columns.length}%`
          : null,
      })),
    },
  };
};

const convertRawToDraftEditorState = (content) =>
  content && ({
    ...content,
    data: {
      rows: content.data.rows.map((row) => (
        Object.keys(row).reduce((newRow, key) => (
          key === 'key' ? newRow : {
            ...newRow,
            [key]: EditorState
              .createWithContent(
              convertFromRaw(row[key]),
              entitiesDecorator
            ),
          }
        ), row)
      )),
      columns: content.data.columns.map((column) => ({
        ...column,
        content: EditorState
          .createWithContent(
            convertFromRaw(column.content),
            entitiesDecorator
          ),
        title: (<Cell
          value={
            EditorState
              .createWithContent(
                convertFromRaw(column.content),
                entitiesDecorator
              )
          }
          isReadOnly
        />),
        render(value) {
          return <Cell value={value} isReadOnly />;
        },
      })),
    },
  });

const convertDraftEditorStateToRow = (content) => ({
  ...content,
  data: {
    rows: content.data.rows.map((row) => (
      Object.keys(row).reduce((newRow, key) => (
        row[key] instanceof EditorState ? {
          ...newRow,
          [key]: convertToRaw(
            row[key]
              .getCurrentContent()
          ),
        } : newRow
      ), { ...row })
    )),
    columns: content.data.columns.map((column) => ({
      ...column,
      title: null,
      render: null,
      content: convertToRaw(
        column.content
          .getCurrentContent()
      ),
    })),
  },
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
        'data',
        'rows',
        index,
        key,
      ],
        value,
        this.state.temp,
      ),
    });
  }

  addColumn = (columnKey) => () => {
    const dataIndex = `index${random(0, 999)}`;
    const { temp } = this.state;
    const rows = temp.data.rows
      .map((row) => ({
        ...row,
        [dataIndex]: EditorState.createEmpty(),
      }));
    const columns = [
      ...temp.data.columns.slice(0, columnKey),
      {
        content: EditorState.createEmpty(),
        dataIndex,
      },
      ...temp.data.columns.slice(columnKey),
    ];
    this.setState({
      temp: toggleColumnFixedWidth(
        temp.styles.equalColumnsWidth,
        {
          ...temp,
          data: {
            columns: this.makeEditableColumns(columns),
            rows,
          },
        }
      ),
    });
  }

  delColumn = (columnKey) => () => {
    const {
      temp: {
        data: {
          columns,
          rows,
        },
      },
      temp,
    } = this.state;
    const { dataIndex } = columns[columnKey];
    this.setState({
      temp: toggleColumnFixedWidth(
        temp.styles.equalColumnsWidth,
        {
          ...temp,
          data: {
            rows: rows
              .map((row) => omit(dataIndex, row)),
            columns: this.makeEditableColumns(
              columns.filter((value, key) => key !== columnKey)
            ),
          },
        }
      ),
    });
  }

  addRow = (columnKey, index) => () => {
    const newrows = [...this.state.temp.data.rows];
    const newRow = Object.keys(newrows[0])
      .reduce((row, key) => (
        key === 'key' ? row : {
          ...row,
          [key]: EditorState.createEmpty(),
        }), { ...newrows[0], key: `${random(0, 999)}` });
    this.setState({
      temp: set(
        [
          'data',
          'rows',
        ],
        [
          ...newrows.slice(0, index),
          newRow,
          ...newrows.slice(index),
        ],
        this.state.temp,
      ),
    });
  }

  delRow = (columnKey, index) => () => {
    const { rows } = this.state.temp.data;
    if (rows.length > 1) {
      this.setState({
        temp: set([
          'data',
          'rows',
        ],
          rows.filter((value, key) => key !== index),
          this.state.temp,
        ),
      });
    }
  }

  headChange = (columnKey) => (content) => {
    const { temp } = this.state;
    this.setState({
      temp: set([
        'data',
        'columns',
        columnKey,
      ],
        {
          ...temp.data.columns[columnKey],
          // https://ant.design/components/table/#Column
          // Ант таблица может рендерить кастомный React.Elment
          // который передаеться ей через свойство title
          // к сожалению при изменении данных надо передавать
          // весь элемент с новыми пропсами
          title: <Cell
            addRow={this.addRow}
            delRow={this.delRow}
            addColumn={this.addColumn}
            delColumn={this.delColumn}
            index={-1}
            value={content}
            onChange={this.headChange(columnKey)}
            columnKey={columnKey}
          />,
          content,
        },
        temp,
      ),
    });
  };

  editMode = () => {
    const { content: {
      data: {
        columns,
        rows,
      },
    }, content } = this.state;
    this.setState({
      isReadOnly: false,
      temp: {
        ...content,
        data: {
          rows,
          columns: this.makeEditableColumns(columns),
        },
      },
    }, this.context.toggleReadOnly);
  }

  saveSettings = () => {
    const {
      temp: {
        data: {
          columns,
          rows,
        },
      },
      temp,
    } =
      this.state;
    const content = {
      ...temp,
      data: {
        rows,
        columns: columns.map((column) => ({
          ...column,
          title: (<Cell
            value={column.content}
            isReadOnly
          />),
          render: (value) => (
            <Cell
              value={value}
              isReadOnly
            />
          ),
        })),
      },
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
    .map((column, key) => ({
      ...column,
      title: (
      // Это свойство содержить компонет для рендера ячейки заголовков таблицы
      // https://ant.design/components/table/#Column
        <Cell
          index={-1}
          value={column.content}
          onChange={this.headChange(key)}
          columnKey={key}
          addRow={this.addRow}
          delRow={this.delRow}
          addColumn={this.addColumn}
          delColumn={this.delColumn}
        />),
      render: (text, record, index) => (
      // Функция для рендера ячейки
      // https://ant.design/components/table/#Column
        <Cell
          addRow={this.addRow}
          delRow={this.delRow}
          addColumn={this.addColumn}
          delColumn={this.delColumn}
          index={index}
          value={text}
          onChange={this.onCellChange(index, column.dataIndex)}
          columnKey={key}
        />
      ),
    }))

  stylesChange = (type) => (event) => {
    // Если событие произошло в Ant.Select
    // то в параметре функции передается
    // значение select а не event!
    const value = !event.target && event;
    const { temp } = this.state;
    if (value) {
      this.setState({
        temp: set([
          'styles',
          type,
        ],
          value,
          this.state.temp,
        ),
      });
    } else if (type === 'equalColumnsWidth') {
      this.setState({
        temp: toggleColumnFixedWidth(
          event.target.checked, temp
        ),
      });
    } else {
      this.setState({
        temp: set([
          'styles',
          type,
        ],
          event.target.checked,
          this.state.temp,
        ),
      });
    }
  }

  deleteBlock = () => this.context.removeBlock(this.props.blockKey);

  duplicateBlock = () => this.context.duplicateBlock(this.props.entityKey);

  render() {
    const content = this.state.temp || this.state.content;
    const { rows, columns } = content.data;
    const { isReadOnly } = this.state;
    return (<div
      className={classNames(
        styles.table,
        styles[content.styles.head],
        styles[content.styles.body],
        {
          [styles.editing]: !isReadOnly,
        },
      )}
      onDoubleClick={isReadOnly && this.editMode}
    >
      <AntTable
        columns={columns}
        pagination={false}
        dataSource={rows}
        showHeader={!content.styles.hideHeader}
        bordered={get(['body'], content.styles) === 'big'}
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
            icon="copy"
            type="primary"
            className={styles.icon}
            onClick={this.duplicateBlock}
          />
          <AntButton
            icon="edit"
            type="primary"
            className={styles.icon}
            onClick={this.editMode}
          />
        </div>
        : <div className={styles.editor}>
          <Editor
            styles={content.styles}
            stylesChange={this.stylesChange}
            closeEditor={this.closeEditor}
            saveSettings={this.saveSettings}
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
    styles: PropTypes.shape({
      hideHeader: PropTypes.bool,
      equalColumnsWidth: PropTypes.bool,
      head: PropTypes.oneOf([
        'bold',
        'normal',
      ]).isRequired,
      body: PropTypes.oneOf([
        'big',
        'small',
        'compact',
      ]).isRequired,
    }).isRequired,
    /* https://ant.design/components/table/#How-To-Use */
    data: PropTypes.shape({
      rows: PropTypes.arrayOf( // rows
        PropTypes.objectOf(
            PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.instanceOf(EditorState),
              PropTypes.shape({
                blocks: PropTypes.arrayOf(PropTypes.object.isRequired),
                entityMap: PropTypes.object.isRequired,
              }),
            ]),
        ).isRequired,
      ).isRequired,
      /* https://ant.design/components/table/#Column */
      columns: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.element,
          width: PropTypes.string, // Ширина в процентах "20%"
          render: PropTypes.func,
          content: PropTypes.oneOfType([
            PropTypes.instanceOf(EditorState),
            /* https://facebook.github.io/draft-js/docs/api-reference-data-conversion.html#converttoraw */
            PropTypes.shape({
              blocks: PropTypes.arrayOf(PropTypes.object.isRequired),
              entityMap: PropTypes.object.isRequired,
            }).isRequired,
          ]).isRequired,
          dataIndex: PropTypes.string.isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

// // Новая структура данных компонента

// Table.propTypes = {
//   entityKey: PropTypes.string.isRequired,
//   blockKey: PropTypes.string.isRequired,
//   content: PropTypes.shape({
//     styles: PropTypes.shape({
//       table: PropTypes.shape({
//         head: PropTypes.oneOf([
//           'bold',
//           'normal',
//         ]).isRequired,
//         body: PropTypes.oneOf([
//           'big',
//           'small',
//           'compact',
//         ]).isRequired,
//       }).isRequired,
//     }).isRequired,
//     /* https://ant.design/components/table/#How-To-Use */
//     data: PropTypes.shape({
//       rows: PropTypes.arrayOf( // rows
//         PropTypes.objectOf(
//           PropTypes.instanceOf(EditorState),
//         ).isRequired,
//       ).isRequired,
//       /* https://ant.design/components/table/#Column */
//       columns: PropTypes.arrayOf(
//         PropTypes.shape({
//           title: PropTypes.element,
//           width: PropTypes.number,
//           render: PropTypes.func,
//           content: PropTypes.oneOfType([
//             PropTypes.instanceOf(EditorState),
//             /* https://facebook.github.io/draft-js/docs/api-reference-data-conversion.html#converttoraw */
//             PropTypes.shape({
//               blocks: PropTypes.arrayOf(PropTypes.object.isRequired),
//               entityMap: PropTypes.object.isRequired,
//             }).isRequired,
//           ]).isRequired,
//           dataIndex: PropTypes.string.isRequired,
//         }).isRequired,
//       ).isRequired,
//     }).isRequired,
//   }).isRequired,
// };

const emptyEditorStateRaw = convertToRaw(
  EditorState.createEmpty()
    .getCurrentContent()
);

Table.defaultProps = {
  content: {
    styles: {
      body: 'big',
      head: 'bold',
    },
    data: {
      columns: [{
        content: emptyEditorStateRaw,
        dataIndex: 'name',
      }, {
        content: emptyEditorStateRaw,
        dataIndex: 'age',
      }, {
        content: emptyEditorStateRaw,
        dataIndex: 'address',
      }],
      rows: [{
        key: '0',
        name: emptyEditorStateRaw,
        age: emptyEditorStateRaw,
        address: emptyEditorStateRaw,
      }, {
        key: '1',
        name: emptyEditorStateRaw,
        age: emptyEditorStateRaw,
        address: emptyEditorStateRaw,
      }],
    },
  },
};

Table.contextTypes = {
  removeBlock: PropTypes.func,
  duplicateBlock: PropTypes.func,
  toggleReadOnly: PropTypes.func,
};

export default Table;
