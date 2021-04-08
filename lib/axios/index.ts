import axios, { AxiosInstance } from 'axios';
import * as Qs from 'qs';

function getType (data) { return Object.prototype.toString.call(data).slice(8, -1).toLowerCase() }

export class ResultKeysType {
  code: string;
  result: string;
  message: string;
}
export class ErrorMessageType {
  400: string;
  401: string;
  402: string;
  403: string;
  404: string;
  405: string;
  500: string;
  501: string;
  502: string;
  503: string;
  504: string;
  505: string;
}
export class OptionType {
  baseURL: string;
  successCode: Array<number>;
  formatKeys: ResultKeysType;
  useJson?: boolean;
  timeout?: number;
  // errorMessage?: Record<number, string>
  errorMessage?: ErrorMessageType
}

export class ResultType {
  code: number;
  result: Record<string, unknown>;
  message: string;
}

export class ResponseType {
  headers: Record<string, unknown>;
  status: number;
  statusText: string;
  data: ResultType;
  config?: Record<string, unknown>;
}
export class ConfigOptionType {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, unknown>;
  [key: string]: unknown;
}
export class ConfigType {
  method?: 'get'|'post'|'put'|'patch'|'delete'|'head'|'options';
  option?: ConfigOptionType;
  [key: string]: unknown;
}

// import errorMessage from './errorMessage';
const errorMessage: ErrorMessageType = {
  400: '请求发生错误，请联系工程师（400）',
  401: '登陆信息失效，请重新登录（401）', // token无效，需要登录
  402: '您的登录信息已过期（402）', // token过期，请求刷新token
  403: '你没有足够的权限访问该资源（403）', // token权限不足，访问被禁止
  404: '请求的资源不存在（404）',
  405: '服务器拒绝了你的请求（405）', // 禁用请求中指定的方法
  500: '请求错误，请联系工程师（500）', // 服务器遇到错误，无法完成请求
  501: '请求异常，请联系工程师（501）', // 服务器不具备完成请求的功能
  502: '数据异常，请联系工程师（502）', // 从服务器收到无效的响应
  503: '服务繁忙，请稍候再试（503）', // 服务器超载或停机维护，暂时状态
  504: '连接超时，请稍候再试（504）', // 未接收到服务器的响应
  505: '不受支持的请求，请联系工程师（505）' // http版本不受支持
}

// export const AxiosDataType = {
//   ErrorMessageType,
//   ResultKeysType,
//   OptionType,
//   ResultType,
//   ResponseType,
//   ConfigOptionType,
//   ConfigType,
// }
export class Axios {
  private http: AxiosInstance;
  private responseData: ResponseType;
  private resultData: ResultType = { code: 0, result: {}, message: '' };
  private initOptionData: OptionType = {
    useJson: true,
    formatKeys: { code: 'code', result: 'result', message: 'message' } as ResultKeysType,
    successCode: [],
    baseURL: '/',
    timeout: 10000,
    errorMessage
  };

  constructor (option: OptionType) {
    // 合并参数
    Object.assign(this.initOptionData, option);
    this.responseData = {
      status: 200,
      statusText: 'ok',
      headers: {}, // 响应头
      data: this.resultData // 响应体
    }

    // 准备创建axios实例的参数1
    const transform = this.initOptionData.useJson ? {} : {
      transformRequest: [(data: Record<string, any>) => {
        return Qs.stringify(data)
      }]
    }
    // 准备创建axios实例的参数2
    const { baseURL, timeout } = this.initOptionData;
    // 创建axios实例
    this.http = axios.create(Object.assign({ baseURL, timeout }, transform))
    this.setInterceptor()
  }

  async request (url: string, data: Record<string, unknown>, config: ConfigType): Promise<ResponseType> {
    const responseData = this.getResponseData();
    const post = ['post', 'put', 'patch'];
    const mArrs = post.concat(['get', 'delete', 'head', 'options'])
    const confMethod = config?.method || 'get'
    const method = mArrs.includes(confMethod) ? confMethod : 'get'
    const query = post.includes(method) ? { data } : { params: data }
    try {
      const response = await this.http({
        url,
        method,
        ...Object.assign(query, config.option)
      })
      Object.assign(responseData, {
        data: response.data,
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
        config: response.config
      })
      return responseData;
    } catch (error) {
      return error;
    }
  }

  private getResponseData () { return this.responseData; }
  private getResultData () { return this.resultData; }
  // 转换响应数据
  private transformResponseData (response, type = 'success') {
    const resultData = this.getResultData();
    const responseData = this.getResponseData();
    // 如果response是错误的
    Object.assign(responseData, {
      status: response?.status || 500,
      headers: response?.headers || {},
      statusText: response?.statusText || ''
    })
    const { data } = response;
    if (data) {
      let code = responseData.status;
      let message = this.initOptionData.errorMessage[responseData.status] || '请求发生错误，请联系工程师' + `(${responseData.status})`;
      let result = {}
      if (getType(data) === 'object') {
        const k = this.initOptionData.formatKeys;
        code = response.data[k.code];
        code = isNaN(code) ? -1 : code * 1
        result = response.data[k.result] || {}
        message = response.data[k.message] || ''
      } else {
        // 如果data不是对象，则说明后台未按规范返回数据，报错
        responseData.status = 502
        code = -1
        result = { error: data }
        message = type === 'success' ? '响应错误，未获取预期数据' : message
      }
      Object.assign(resultData, { code, result, message })
    } else {
      responseData.status = 502
      resultData.code = -1
      resultData.result = { error: data }
      resultData.message = `响应错误，未获取预期数据(${responseData.status})`
    }
    responseData.data = resultData;
    return responseData;
  }

  // 拦截器
  private setInterceptor () {
    // 请求拦截
    this.http.interceptors.request.use((config) => {
      return config;
    }, (error) => {
      // 发起请求异常
      const res = this.getResponseData()
      res.status = 501
      res.statusText = JSON.stringify(error)
      res.data.message = this.initOptionData.errorMessage[res.status] || `发起请求出错了 （${res.status}）`
      return Promise.reject(res)
    })

    // 响应拦截
    this.http.interceptors.response.use(
      (response) => {
        // 响应
        const responseData = this.transformResponseData(response)
        return Object.assign(response, responseData)
      },
      (error) => {
        // 响应异常
        const response = error.response
        const responseData = this.getResponseData()
        if (response) {
          Object.assign(responseData, this.transformResponseData(response, 'error'))
        } else {
          const statusText = JSON.stringify(error) || ''
          let status = statusText.indexOf('timeout') > -1 ? 504 : 501
          if (statusText.indexOf('network error') > -1) { status = 504 }
          Object.assign(responseData, {
            status,
            statusText,
            headers: error?.headers || {},
            data: {
              code: -1,
              result: {},
              message: this.initOptionData.errorMessage[status]
            }
          })
        }
        responseData.config = error?.config || {}
        return Promise.reject(responseData)
      }
    )
  }
}
