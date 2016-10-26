import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Editor,
  EditorState,
  convertFromRaw,
} from 'draft-js';
import {
  Radio as AntRadio,
  Icon as AntIcon,
} from 'antd';
import styles from './styles.css';
import {
  blockRenderer,
  entitiesDecorator,
} from '../Entities';

class View extends Component { // HMR

  constructor(props) {
    super(props);
    this.state = {
      viewport: 'desktop',
    };
  }

  changeViewport = (event) => {
    this.setState({
      viewport: event.target.value,
    });
  }

  render() {
    const { viewport } = this.state;
    const { content } = this.props;
    return (
      <div className={styles.view}>
        <div className={styles.select}>
          <AntRadio.Group
            defaultValue="desktop"
            onChange={this.changeViewport}
          >
            {['desktop',
              'tablet',
              'mobile',
            ].map((type, index) =>
              <AntRadio.Button
                key={index}
                value={type}
              >
                <AntIcon type={type} />
              </AntRadio.Button>
          )}
          </AntRadio.Group>
        </div>
        <div className={styles[viewport]}>
          <Editor
            blockRendererFn={blockRenderer}
            editorState={EditorState
              .createWithContent(
                convertFromRaw(
                  content
                ),
                entitiesDecorator,
              )}
            readOnly
          />
        </div>
      </div>
    );
  }
}

View.propTypes = {
  content: PropTypes.object, // http://stackoverflow.com/a/33427304
};

export default View;
