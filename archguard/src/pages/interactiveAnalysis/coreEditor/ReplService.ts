import { WebSocketSubject } from "rxjs/src/internal/observable/dom/WebSocketSubject";
import { Subject, from } from "rxjs";
import { ReplResult } from "@/types/archdoc";

export class ReplService {
  private subject: WebSocketSubject<any>;
  private idSubjectMap: Map<number, Subject<any>> = new Map();
  private codes: Map<number, string> = new Map();
  private indexId: number = 0;
  private runningCodeIds: number[];

  private runAllSub = new Subject();
  private isRunAll = false;

  constructor(subject: WebSocketSubject<any>) {
    this.subject = subject;

    const that = this;
    this.subject.subscribe({
      next: (msg: ReplResult) => {
        if (that.idSubjectMap[msg.id] != null) {
          const sub: Subject<any> = that.idSubjectMap[msg.id];
          sub.next(msg);
        }

        if (that.runningCodeIds) {
          that.runningCodeIds.forEach((item, index) => {
            if (item == msg.id) that.runningCodeIds.splice(index, 1);
          });

          if (that.isRunAll && that.runningCodeIds.length == 0) {
            that.isRunAll = false;
            that.runAllSub.next("done");
          }
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

  runAll(): Subject<any> {
    this.isRunAll = true;
    this.runningCodeIds = [];
    for (let id in this.codes) {
      this.runningCodeIds.push(Number(id));
      this.subject.next({ code: this.codes[id], id: id });
    }

    return this.runAllSub;
  }
}
