import mocks from './mocks';
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays
} from '../public-holidays.service';

describe('public-holidays.service', () => {
  describe('getListOfPublicHolidays', () => {
    it('Should return array of holidays', async () => {
      const response = await getListOfPublicHolidays(2023, 'FR');
      expect(response).toEqual(mocks.publicHolidays);
    });
    it('Should return empty array in case of error', async () => {
      await expect(getListOfPublicHolidays(2023, 'US')).rejects.toThrow('Country provided is not supported, received: US');
    });
  });
  describe('checkIfTodayIsPublicHoliday', () => {
    it('Should return boolean value in response', async () => {
      const response = await checkIfTodayIsPublicHoliday('FR');
      expect.extend({
        toBeBoolean(value) {
          const message = () => `expected ${value} to be boolean`;
          return typeof value === 'boolean' ? {
            message,
            pass: true
          } : {
            message,
            pass: false
          };
        }
      });
      expect(response).toBeBoolean();
    });
    it('Should return false iт case of error', async () => {
      await expect(checkIfTodayIsPublicHoliday('US')).rejects.toThrow('Country provided is not supported, received: US');
    });
  });
  describe('getNextPublicHolidays', () => {
    it('Should return array of holidays', async () => {
      const response = await getNextPublicHolidays('FR');
      expect(response).toEqual(mocks.nextPublicHolidays);
    });
    it('Should return empty array in case of error', async () => {
      await expect(getNextPublicHolidays('US')).rejects.toThrow('Country provided is not supported, received: US');
    });
  });
});
