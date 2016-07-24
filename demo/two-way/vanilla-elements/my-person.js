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

class MyPerson extends HTMLElement {
  attachedCallback() {
    // Stamp template
    this.innerHTML = `
      <p class="my-person__field"></p>
      <button class="my-person__btn">Update name in Custom Element</button>
    `;
    this.field = this.querySelector('.my-person__field');
    this.btn = this.querySelector('.my-person__btn');

    // Setup properties
    this.person = this.getAttribute('person');

    // Add event listeners
    this._onBtnClicked = this._onBtnClicked.bind(this);
    this.btn.addEventListener('click', this._onBtnClicked);
  }

  detachedCallback() {
    this.btn.removeEventListener('click', this._onBtnClicked);
  }

  _onBtnClicked() {
    this.person = { name: 'Alex' };
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this[name] = newVal;
  }

  set person(value) {
    var parsedValue;
    // Initially Angular will have its {{}} syntax in the attr so this will
    // fail. Subsequently it will fulfill the value with an array string
    // and this should pass
    if (typeof value === 'string') {
      try {
        parsedValue = JSON.parse(value);
      } catch(err) {
        // Default value if nothing provided in the attr
        parsedValue = { name: 'Default' };
      }
    } else {
      parsedValue = value;
    }
    if (this._person !== parsedValue) {
      this._person = parsedValue;
      this.field.textContent = parsedValue.name;
      this.dispatchEvent(new CustomEvent('person-changed', {
        detail: {
          value: parsedValue
        }
      }));
    }
  }

  get person() {
    return this._person;
  }
}

document.registerElement('my-person', MyPerson);
