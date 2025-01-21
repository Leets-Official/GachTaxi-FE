export class EventSourcePolyfill implements EventSource {
  private xhr: XMLHttpRequest;
  private _url: string;
  private _withCredentials: boolean;
  private headers: Record<string, string>;
  private _readyState: number;

  // EventSource 상태 상수를 리터럴 타입으로 정의
  readonly CONNECTING = 0 as const;
  readonly OPEN = 1 as const;
  readonly CLOSED = 2 as const;

  constructor(url: string, options?: { headers?: Record<string, string>; withCredentials?: boolean }) {
    this._url = url;
    this._withCredentials = options?.withCredentials || false;
    this.headers = options?.headers || {};
    this.xhr = new XMLHttpRequest();
    this._readyState = this.CONNECTING;
    this.connect();
  }

  private connect() {
    this.xhr.open('GET', this._url, true);
    this.xhr.withCredentials = this._withCredentials;
    
    // 헤더 설정
    Object.entries(this.headers).forEach(([key, value]) => {
      this.xhr.setRequestHeader(key, value);
    });

    this.xhr.onreadystatechange = () => {
      if (this.xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
        this._readyState = this.OPEN;
        if (this.onopen) {
          this.onopen(new Event('open'));
        }
      } else if (this.xhr.readyState === XMLHttpRequest.LOADING) {
        if (this.onmessage) {
          this.onmessage(new MessageEvent('message', { data: this.xhr.responseText }));
        }
      }
    };

    this.xhr.onerror = () => {
      this._readyState = this.CLOSED;
      if (this.onerror) {
        this.onerror(new Event('error'));
      }
    };

    this.xhr.send();
  }

  public close() {
    this._readyState = this.CLOSED;
    this.xhr.abort();
  }

  // 필수 속성 구현
  public get url(): string {
    return this._url;
  }

  public get readyState(): number {
    return this._readyState;
  }

  public get withCredentials(): boolean {
    return this._withCredentials;
  }

  // 이벤트 핸들러
  public onopen: ((ev: Event) => any) | null = null;
  public onmessage: ((ev: MessageEvent) => any) | null = null;
  public onerror: ((ev: Event) => any) | null = null;

  // EventTarget 인터페이스 구현 수정
  public addEventListener<K extends keyof EventSourceEventMap>(
    type: K,
    listener: (this: EventSource, ev: EventSourceEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  public addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void {
    switch (type) {
      case 'open':
        this.onopen = (ev: Event) => {
          (listener as EventListener).call(this, ev);
        };
        break;
      case 'message':
        this.onmessage = (ev: MessageEvent) => {
          (listener as EventListener).call(this, ev);
        };
        break;
      case 'error':
        this.onerror = (ev: Event) => {
          (listener as EventListener).call(this, ev);
        };
        break;
    }
  }

  public removeEventListener<K extends keyof EventSourceEventMap>(
    type: K,
    listener: (this: EventSource, ev: EventSourceEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  public removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void {
    switch (type) {
      case 'open':
        if (this.onopen === listener) this.onopen = null;
        break;
      case 'message':
        if (this.onmessage === listener) this.onmessage = null;
        break;
      case 'error':
        if (this.onerror === listener) this.onerror = null;
        break;
    }
  }

  public dispatchEvent(event: Event): boolean {
    switch (event.type) {
      case 'open':
        if (this.onopen) this.onopen.call(this, event);
        break;
      case 'message':
        if (this.onmessage) this.onmessage.call(this, event as MessageEvent);
        break;
      case 'error':
        if (this.onerror) this.onerror.call(this, event);
        break;
    }
    return true;
  }
} 