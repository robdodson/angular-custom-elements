/**
 *
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

class MyList extends HTMLElement {
  attachedCallback() {
    // Stamp template
    this.innerHTML = `
      <ul class="my-list__list"></ul>
      <button class="my-list__btn">Update friends in Custom Element</button>
    `;
    this.list = this.querySelector('.my-list__list');
    this.btn = this.querySelector('.my-list__btn');

    // Setup properties
    this.friends = this.getAttribute('friends');

    // Add event listeners
    this._onBtnClicked = this._onBtnClicked.bind(this);
    this.btn.addEventListener('click', this._onBtnClicked);
  }

  _onBtnClicked() {
    this.friends = [].concat(this.friends, ['Sam']);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this[name] = newVal;
  }

  // This will regenerate the list each time render is called. Not ideal
  // if the list is large or complex. You could use a virtual dom lib like
  // diffHTML if you'd prefer a bit more performance
  // https://github.com/tbranyen/diffhtml#user-content-html
  render(values) {
    var patch = '';
    values.forEach(function(value) {
      patch += `<li class="my-list__list-item">${value}</li>`;
    });
    this.list.innerHTML = patch;
  }

  set friends(value) {
    var parsedValue;
    // Initially Angular will have its {{}} syntax in the attr so this will
    // fail. Subsequently it will fulfill the value with an array string
    // and this should pass
    if (typeof value === 'string') {
      try {
        parsedValue = JSON.parse(value);
      } catch(err) {
        // Default value if nothing provided in the attr
        parsedValue = ['Default'];
      }
    } else {
      parsedValue = value;
    }
    if (this._friends !== parsedValue) {
      this._friends = parsedValue;
      this.render(parsedValue);
      this.dispatchEvent(new CustomEvent('friends-changed', {
        detail: {
          value: parsedValue
        }
      }));
    }
  }

  get friends() {
    return this._friends;
  }
}

document.registerElement('my-list', MyList);
