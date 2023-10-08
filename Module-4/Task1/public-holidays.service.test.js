import axios from 'axios';
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays
} from '../public-holidays.service';

const PUBLIC_HOLIDAYS = [
  {
    date: "2023-09-30",
    localName: "localName",
    name: "name",
    countryCode: "FR",
    fixed: true,
    global: true,
    counties: [
      "FR"
    ],
    launchYear: 0,
    types: [
      'Public'
    ]
  }
];


describe('public-holidays.service', () => {
  describe('getListOfPublicHolidays', () => {
    it('Should call API with proper arguments', async () => {
      const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: PUBLIC_HOLIDAYS }));
      await getListOfPublicHolidays(2023, 'FR');
      expect(axiosGetSpy).toHaveBeenCalledWith('https://date.nager.at/api/v3/PublicHolidays/2023/FR');
    });
    it('Should return array of holidays', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: PUBLIC_HOLIDAYS }));
      const response = await getListOfPublicHolidays(2023, 'FR');
      expect(response).toEqual([{
        date: "2023-09-30",
        localName: "localName",
        name: "name",
      }]);
    });
    it('Should return empty array in case of error', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('error')));
      const result = await getListOfPublicHolidays(2023, 'FR');
      expect(result).toEqual([]);
    });
  });
  describe('checkIfTodayIsPublicHoliday', () => {
    it('Should call API with proper arguments', async () => {
      const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 200 }));
      await checkIfTodayIsPublicHoliday('FR');
      expect(axiosGetSpy).toHaveBeenCalledWith('https://date.nager.at/api/v3/IsTodayPublicHoliday/FR');
    });
    it('Should return true if today is a holiday', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 200 }));
      const response = await checkIfTodayIsPublicHoliday('FR');
      expect(response).toEqual(true);
    });
    it('Should return false in case of error', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('error')));
      const result = await checkIfTodayIsPublicHoliday('FR');
      expect(result).toEqual(false);
    });
    it('Should return false no holiday today', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 404 }));
      const result = await checkIfTodayIsPublicHoliday('FR');
      expect(result).toEqual(false);
    });
  });
  describe('getNextPublicHolidays', () => {
    it('Should call API with proper arguments', async () => {
      const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: PUBLIC_HOLIDAYS }));
      await getNextPublicHolidays('FR');
      expect(axiosGetSpy).toHaveBeenCalledWith('https://date.nager.at/api/v3/NextPublicHolidays/FR');
    });
    it('Should return array of holidays', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: PUBLIC_HOLIDAYS }));
      const response = await getNextPublicHolidays('FR');
      expect(response).toEqual([{
        date: "2023-09-30",
        localName: "localName",
        name: "name",
      }]);
    });
    it('Should return empty array in case of error', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('error')));
      const result = await getNextPublicHolidays('FR');
      expect(result).toEqual([]);
    });
  });
});
