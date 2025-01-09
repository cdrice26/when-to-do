import getDrivingTime from '@/helper/drivingTime';
import getCoords from '../helper/getCoords';
import getWeather from '@/helper/getWeather';

export type MockFetch = typeof fetch & {
  resetMocks(): void;
  mockResponse(body: string | object): void;
  mockResponseOnce(body: string | object): void;
  mockResolvedValue(value: any): jest.Mock;
  mockReject(): () => any;
};

export type MockGetCoords = typeof getCoords & {
  mockResolvedValueOnce(value: any): jest.Mock;
  mockResolvedValue(value: any): jest.Mock;
  mockRejectedValueOnce(value: any): jest.Mock;
  mockRejectedValue(value: any): jest.Mock;
};

export type MockGetDrivingTime = typeof getDrivingTime & {
  mockImplementation(value: any): jest.Mock;
  mockResolvedValue(value: any): jest.Mock;
};

export type MockGetWeather = typeof getWeather & {
  mockImplementation(value: any): jest.Mock;
  mockResolvedValue(value: any): jest.Mock;
};
