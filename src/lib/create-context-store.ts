import { Subject } from 'rxjs';

export interface ContextStoreBase<D = {}, M = {}> {
  data: D;
  methods: M;
}

export interface ContextStore<D = {}, M = {}> extends ContextStoreBase<D, M> {
  subject: Subject<D>;
}

export const createContextStore = ({ data, methods }: ContextStoreBase<any, any>): ContextStore<any, any> => {
  const appliedMethods: any = {};
  const subject = new Subject<any>();

  const store = {
    data,
    subject,
    methods: appliedMethods,
  };

  Object.keys(methods).forEach((key) => {
    appliedMethods[key] = function () {
      const method = methods[key];
      const methodReturn = method.apply(store, Array.from(arguments));
      subject.next(data);
      return methodReturn;
    };
  });

  return Object.seal(store);
};

export default createContextStore;
