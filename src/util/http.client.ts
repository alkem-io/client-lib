import axios, { AxiosInstance, AxiosResponse } from 'axios';

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;
  protected readonly apiBaseURL: string;

  protected readonly config = {
    headers: {
      Accept: 'application/json',
    },
  };

  public constructor(apiEndpoint: string) {
    this.apiBaseURL = apiEndpoint;
    const baseURL = apiEndpoint;
    this.instance = axios.create({
      baseURL,
    });

    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };

  private _handleResponse = ({ data }: AxiosResponse) => data;

  protected _handleError = (error: any) => Promise.reject(error);
}
