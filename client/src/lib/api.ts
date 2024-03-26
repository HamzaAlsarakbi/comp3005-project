
/**
 * API Props
 */
interface ApiProps {
  /**
   * path
   * 
   * If your absolute path is "http://localhost:3001/api/login", then path should be "login"
   */
  path: string;
  onload(req: XMLHttpRequest): void;
  body?: object;
}

const sendRequest = (type: string, { path, onload, body }: ApiProps) => {
  const xml = new XMLHttpRequest();
  xml.withCredentials = true;
  xml.open(type, `http://localhost:3001/api/${path}`);
  xml.setRequestHeader('Content-Type', 'application/json');
  xml.onload = () => onload(xml);
  xml.send(JSON.stringify(body ?? {}));
}

/**
 * Collection of wrapper methods for making calls to the backend API
 */
const api = {
  /**
   * Starts a get request to the API backend
   * @param props Api props
   * @returns void
   */
  get: (props: ApiProps) => sendRequest('GET', props),
  /**
   * Starts a put request to the API backend
   * @param props Api props
   * @returns void
   */
  put: (props: ApiProps) => sendRequest('PUT', props),
  /**
   * Starts a post request to the API backend
   * @param props Api props
   * @returns void
   */
  post: (props: ApiProps) => sendRequest('POST', props),
}


export default api;