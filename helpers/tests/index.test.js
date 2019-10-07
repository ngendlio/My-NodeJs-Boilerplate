const { enumsOf, getRandomInt, hashPassword, checkPassword } = require('../index');

describe('Testing helper functions', () => {
  it('return a correctly mapped array of enums', () => {
    const names = ['MALE', 'FEMALE'];
    const results = enumsOf(names);
    expect(results).toStrictEqual({
      MALE: 'MALE',
      FEMALE: 'FEMALE'
    });
  });

  it('Should return a randomn integer', () => {
    const x = getRandomInt(100, 102);
    expect(x >= 100 && x <= 102).toBeTruthy();
  });

  it(`Should create and verify a hashed password`, async () => {
    const user = { password: 'bonjour', _id: '23490823949234234' };

    const hash = await hashPassword(user);
    expect(hash.length).toBe(60);

    const storedUser = { password: hash, _id: '23490823949234234' };
    const isPasswordValid = await checkPassword(user.password, storedUser);
    expect(isPasswordValid).toBe(true);
  });
  it(`Should not verify an invalid password`, async () => {
    const user = { password: 'bonjour', _id: '23490823949234234' };

    const hash = await hashPassword(user);
    expect(hash.length).toBe(60);

    const storedUser = { password: hash, _id: '23490823949234234' };
    const isPasswordValid = await checkPassword('wrongpassword', storedUser);
    expect(isPasswordValid).toBe(false);
  });
});
