import React from "react";
import { newLineMessage } from './newLineMessage';

describe('newLineMessage', () => {
  it('should split the message by new line and return an array with <br /> elements', () => {
    const formatMessage = jest.fn().mockReturnValue('Hello\\nWorld');
    const id = 'messageId';

    const result = newLineMessage(formatMessage, id);

    expect(formatMessage).toHaveBeenCalledWith({ id: id });
    expect(result).toEqual(['Hello', <br />, 'World']);
  });

  it('should return an empty array if the message is empty', () => {
    const formatMessage = jest.fn().mockReturnValue('');
    const id = 'messageId';

    const result = newLineMessage(formatMessage, id);

    expect(formatMessage).toHaveBeenCalledWith({ id: id });
    expect(result).toEqual([""]);
  });

  it('should return an array with a single element if the message does not contain new lines', () => {
    const formatMessage = jest.fn().mockReturnValue('Hello World');
    const id = 'messageId';

    const result = newLineMessage(formatMessage, id);

    expect(formatMessage).toHaveBeenCalledWith({ id: id });
    expect(result).toEqual(['Hello World']);
  });
});
