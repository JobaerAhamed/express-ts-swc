import { SayHello } from '@src/service';

describe('SayHello Service:', () => {
  it('should return correct greeting', () => {
    expect(SayHello('World')).toEqual({ message: 'Hello World' });
  });
});
