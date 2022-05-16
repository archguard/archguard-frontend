import { PluginKey } from 'prosemirror-state';

export interface Listeners {
  [name: string]: Set<Listener>;
}
export type Listener<T = any> = (data: T) => void;
export type Dispatch<T = any> = (
  eventName: PluginKey | string,
  data: T,
) => void;

/*
Copyright 2020 Atlassian Pty Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

// https://bitbucket.org/atlassian/atlassian-frontend-mirror/src/master/editor/editor-core/src/event-dispatcher/index.ts
export class EventDispatcher<T = any> {
  private listeners: Listeners = {};

  on(event: string, cb: Listener<T>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = new Set();
    }

    this.listeners[event].add(cb);
  }

  off(event: string, cb: Listener<T>): void {
    if (!this.listeners[event]) {
      return;
    }

    if (this.listeners[event].has(cb)) {
      this.listeners[event].delete(cb);
    }
  }

  emit(event: string, data: T): void {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach(cb => cb(data));
  }

  destroy(): void {
    this.listeners = {};
  }
}

/**
 * Creates a dispatch function that can be called inside ProseMirror Plugin
 * to notify listeners about that plugin's state change.
 */
export function createDispatch<T>(
  eventDispatcher: EventDispatcher<T>,
): Dispatch<T> {
  return (eventName: PluginKey | string, data: T) => {
    if (!eventName) {
      throw new Error('event name is required!');
    }

    const event =
      typeof eventName === 'string'
        ? eventName
        : (eventName as PluginKey & { key: string }).key;
    eventDispatcher.emit(event, data);
  };
}
