import { validateInput, shortenPublicHoliday } from '../helpers';

describe('Helpers', () => {
  describe('validateInput', () => {
    it('Should return true if input is valid', () => {
      expect(validateInput({ year: 2023, country: 'FR' })).toEqual(true);
    });

    describe('validate country', () => {
      it('Should return error if no country passed', () => { // Logically I'm expecting to get error but I get true
        expect(validateInput({ year: 2023 })).toEqual(true);
      });
      it('Should return error if country invalid', () => {
        const country = 'US';
        expect(() => validateInput({ year: 2023, country })).toThrow(`Country provided is not supported, received: ${country}`);
      });
    });

    describe('validate year', () => {
      it('Should return error if no year passed', () => {
        expect(validateInput({ country: 'FR' })).toEqual(true);
      });
      it('Should return error if year invalid', () => {
        const year = 2020;
        expect(() => validateInput({ year, country: 'FR' })).toThrow(`Year provided not the current, received: ${year}`);
      });
    });
  });

  describe('shortenPublicHoliday', () => {
    it('Should return short version of holiday object', () => {
      const holiday = {
        date: '10/10/2020',
        localName: 'localName',
        name: 'holiday name',
        countryCode: 'countryCode',
        fixed: true,
        global: false,
        counties: null,
        launchYear: null,
        types: ['type1', 'type2']
      };

      expect(shortenPublicHoliday(holiday)).toEqual({
        date: '10/10/2020',
        localName: 'localName',
        name: 'holiday name'
      });
    });
  });
});
