import axios from 'axios';
import mocks from './mocks';
import {PUBLIC_HOLIDAYS_API_URL} from '../config';

describe('Nager.Date API - V3', () => {
  describe('/api/v3/PublicHolidays/{year}/{countryCode}', () => {
    it('Should return 200 and array of holidays', async () => {
      const year = 2023;
      const country = 'FR';
      const { status, data } = await axios.get(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`);
      expect(status).toEqual(200);
      expect(data).toEqual(mocks.publicHolidays)
    });
    it('Should return 400 status - validation failure', async () => {
      const year = 20021;
      const country = 'FR';
      await expect(
        axios.get(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`)
      ).rejects.toThrow('Request failed with status code 400');

    });
    it('Should return 404 status - CountryCode is unknown', async () => {
      const year = 2010;
      const country = 'FRu';
      await expect(
        axios.get(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`)
      ).rejects.toThrow('Request failed with status code 404');
    });
  });
  describe('/api/v3/NextPublicHolidays/{countryCode}', () => {
    it('Should return 200 and array of holidays', async () => {
      const country = 'FR';
      const { status, data } = await axios.get(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`);
      expect(status).toEqual(200);
      expect(data).toEqual(mocks.nextPublicHolidays);
    });
    it('Should return 500 status in case of error', async () => {
      const country = 'FRaaaaa';
      await expect(
        axios.get(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`)
      ).rejects.toThrow('Request failed with status code 500');
    });
  });
});
