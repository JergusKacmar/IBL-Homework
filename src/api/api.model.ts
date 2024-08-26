export const FORECAST_API = 'https://ogcie.iblsoft.com/ria/opmetquery';
export const IBL_QUERY_ID = 'JERGUS-IBL-QUERY-ID';
export const IBL_QUERY_METHOD = 'query';

export interface IblQueryBody {
  id: string;
  method: string;
  params: IblParams[];
}

export interface IblParams {
  id: string;
  reportTypes: string[];
  stations?: string[];
  countries?: string[];
}

export interface IblResponse {
  error: {
    code: number;
    message: string;
    data: string;
  };
  id: string;
  result: IblResult[];
}

export interface IblResult {
  placeId: string;
  stationId: string;
  text: string;
  textHTML: string;
  reportTime: string;
  queryType: string;
}
