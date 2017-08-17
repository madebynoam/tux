import React, { ReactNode } from 'react'
import { Raw, Plain } from 'slate'
import { renderToStaticMarkup } from 'react-dom/server'
import { Theme, input } from '../../theme'
import { EditableProps } from '../../interfaces'
import SlateRenderer from '../EditInline/SlateRenderer'
import { Html } from '../../utils/slate'
import withEditorState, { EditorStateProps } from '../HOC/withEditorState'

// icons
import FaBold from 'react-icons/lib/fa/bold'
import FaItalic from 'react-icons/lib/fa/italic'
import FaUnderline from 'react-icons/lib/fa/underline'
import FaQuoteRight from 'react-icons/lib/fa/quote-right'
import FaListUl from 'react-icons/lib/fa/list-ul'
import FaListOl from 'react-icons/lib/fa/list-ol'

export interface Props extends EditorStateProps {
  value: any
  id: string
  placeholder: string
  field: string | Array<string>
  onChange: Function
  isEditing: boolean
}

class RichTextField extends React.Component<Props, {}> {
  static getInitialEditorState(props: Props) {
    const { value } = props

    try {
      if (value) {
        return Raw.deserialize(value, { terse: true })
      }
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error('Could not parse content', value, err)
    }
    return Plain.deserialize('')
  }

  componentDidUpdate(oldProps: Props) {
    if (oldProps.editorState !== this.props.editorState) {
      this.onChange()
    }
  }

  onChange = async () => {
    const { onEditorChange, editorState, onChange, id } = this.props
    onEditorChange(editorState)
    onChange(Raw.serialize(editorState), id)
  }

  renderBlockButton(type: string, icon: ReactNode) {
    const { onClickBlock, hasBlock } = this.props
    const isActive = hasBlock(type)

    return (
      <span
        className="Toolbar-button"
        onMouseDown={event => onClickBlock(event, type)}
        data-active={isActive}
      >
        {icon}
        <style jsx>{`
          .Toolbar-button {
            display: flex;
            margin: 4px;
            margin-left: 12px;
            width: 12px;
            opacity: 0.5;
          }

          .Toolbar-button:first-child {
            margin-left: 6px;
          }

          .Toolbar-button[data-active="true"] {
            opacity: 1;
          }
        `}</style>
      </span>
    )
  }

  renderMarkButton(type: string, icon: ReactNode) {
    const { onClickMark, hasMark } = this.props
    const isActive = hasMark(type)

    return (
      <span
        className="Toolbar-button"
        onMouseDown={event => onClickMark(event, type)}
        data-active={isActive}
      >
        {icon}
        <style jsx>{`
          .Toolbar-button {
            display: flex;
            margin: 4px;
            margin-left: 12px;
            width: 12px;
            opacity: 0.5;
          }

          .Toolbar-button:first-child {
            margin-left: 6px;
          }

          .Toolbar-button[data-active="true"] {
            opacity: 1;
          }
        `}</style>
      </span>
    )
  }

  render() {
    const { editorState, onEditorChange, isEditing, placeholder, onKeyDown } = this.props
    return (
      <div className="RichTextField">
        <div className="RichTextField-toolbar">
          {this.renderMarkButton('bold', <FaBold />)}
          {this.renderMarkButton('italic', <FaItalic />)}
          {this.renderMarkButton('underlined', <FaUnderline />)}
          {this.renderMarkButton('quote', <FaQuoteRight />)}
          {this.renderBlockButton('bulleted-list', <FaListUl />)}
          {this.renderBlockButton('numbered-list', <FaListOl />)}
        </div>
        <div className="RichTextField-editor">
          <SlateRenderer
            style={{ width: '100%' }}
            state={editorState}
            onChange={onEditorChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder || ''}
          />
        </div>
        <style jsx>{`
          .RichTextField {
            align-items: baseline;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
          }
          .RichTextField-toolbar {
            border: 1px solid ${input.border};
            border-bottom: none;
            display: flex;
            padding: 12px;
            width: 100%;
            background: #e5e6ed;
          }
          .RichTextField-editor {
            background: #fff;
            border: 1px solid ${input.border};
            color: ${Theme.textDark};
            display: flex;
            font-size: 16px;
            font-weight: 400;
            font-family: initial;
            line-height: 1.5;
            min-height: 12em;
            padding: 8px;
            width: 100%;
          }
        `}</style>
      </div>
    )
  }
}

export default withEditorState(RichTextField, RichTextField.getInitialEditorState)