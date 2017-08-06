import Immutable from 'immutable';
import React, { Component } from 'react';
import Reorder, { reorderImmutable } from '../../../src/index';

import { classNames } from './styles';

export class LockHorizontal extends Component {
  constructor () {
    super();

    this.state = {
      list: Immutable.List(Immutable.Range(0, 10).map(function (value) {
        return {
          name: ['Thing', value].join(' '),
          color: ['rgb(', (value + 1) * 25, ',', 250 - ((value + 1) * 25), ',0)'].join('')
        };
      })),
      prefix: 'Prefix'
    };
  }

  onPrefixChange (event) {
    const target = event.currentTarget;

    this.setState({
      prefix: target.value
    });
  }

  onReorder (event, previousIndex, nextIndex) {
    const list = reorderImmutable(this.state.list, previousIndex, nextIndex);

    this.setState({
      list: list
    });
  }

  render () {
    return (
      <div>
        <h3>
          Lock horizontal
        </h3>
        <p>
          This example has a hold time of 500 milliseconds before dragging begins,
          allowing for other events like clicking / tapping to be attached
        </p>
        <p>
          Selected item: {this.state.clickedItem ? this.state.clickedItem.name : undefined}
        </p>
        <p>
          {'Prefix: '}
          <input type="text" value={this.state.prefix} onChange={this.onPrefixChange.bind(this)} />
        </p>

        <Reorder
          reorderId="myList1"
          component="ul"
          className={[classNames.myList, classNames.myList1].join(' ')}
          placeholderClassName={classNames.placeholder}
          draggedClassName={classNames.dragged}
          lock="horizontal"
          holdTime={500}
          onReorder={this.onReorder.bind(this)}
          placeholder={<div className={[classNames.listItem, classNames.customPlaceholder].join(' ')} />}
        >
          {
            this.state.list.map(function (item) {
              return (
                <li
                  key={item.name}
                  className={classNames.listItem}
                  style={{ color: item.color }}
                >
                  <div className={classNames.contentHolder}>
                    <span className={classNames.itemName}>
                      {this.state.prefix} {item.name}
                    </span>
                    <input
                      className={classNames.input}
                      type="text"
                      defaultValue="Change me, I retain this state!"
                    />
                  </div>
                </li>
              );
            }.bind(this)).toArray()
          }
        </Reorder>
      </div>
    );
  }
}
