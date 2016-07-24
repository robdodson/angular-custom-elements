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

class MyInput extends HTMLElement {
  attachedCallback() {
    // Stamp template
    this.innerHTML = `<input class="my-input__input" type="text">`;
    this.input = this.querySelector('.my-input__input');

    // Setup properties
    this.message = this.getAttribute('message');

    // Add event listeners
    this._onInputChanged = this._onInputChanged.bind(this);
    this.input.addEventListener('input', this._onInputChanged);
  }

  detachedCallback() {
    this.input.removeEventListener('input', this._onInputChanged);
  }

  _onInputChanged(event) {
    this.message = event.target.value;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this[name] = newVal;
  }

  set message(value) {
    if (this._message !== value) {
      this._message = value;
      this.input.value = value;
      // Tell the outside world our message property changed
      // Using the event name [property]-changed with the
      // structure event.detail.value means our binding directive
      // will pick this up
      this.dispatchEvent(new CustomEvent('message-changed', {
        detail: {
          value: value
        }
      }));
    }
  }

  get message() {
    return this._message;
  }
}

document.registerElement('my-input', MyInput);
