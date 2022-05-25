import { WebSocketSubject } from "rxjs/src/internal/observable/dom/WebSocketSubject";
import { Subject } from "rxjs";
import { ReplResult } from "@/types/archdoc";

export class ReplService {
  private subject: WebSocketSubject<any>;
  private idSubjectMap: Map<number, Subject<any>> = new Map();
  private codes: Map<number, string> = new Map();
  private indexId: number = 0;

  constructor(subject: WebSocketSubject<any>) {
    this.subject = subject;

    const that = this;
    this.subject.subscribe({
      next: (msg: ReplResult) => {
        if (that.idSubjectMap[msg.id] != null) {
          const sub: Subject<any> = that.idSubjectMap[msg.id];
          sub.next(msg);
        }
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {},
    });
  }

  register() {
    this.indexId += 1;
    let subject = new Subject<any>();
    this.idSubjectMap[this.indexId] = subject;
    return {
      id: this.indexId,
      subject,
    };
  }

  eval(code: string, id: number) {
    this.subject.next({ code: code, id: id });
  }

  saveCode(code: string, id: number) {
    this.codes[id] = code;
  }

  runAll() {
    const that = this;

    for (let key in this.codes) {
      this.subject.next({ code: this.codes[key], id: key });
    }
  }
}
