declare module 'sockjs-client' {
  export default class SockJS {
    constructor(
      url: string,
      protocols?: string | string[],
      options?: Record<string, unknown>,
    );
    onopen: () => void;
    onmessage: (event: MessageEvent) => void;
    onclose: () => void;
    send(data: string): void;
    close(): void;
  }
}
