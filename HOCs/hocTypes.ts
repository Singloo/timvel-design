/*
 * File: /Users/origami/Desktop/timvel/re-kits/HOCs/hocTypes.ts
 * Project: /Users/origami/Desktop/timvel/re-kits
 * Created Date: Saturday March 2nd 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Saturday March 2nd 2019 6:30:05 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
export type Exclude<T, U> = T extends U ? never : T;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type HOC<InjectProps> = <Props extends InjectProps>(
  Component: React.ComponentType<Props>,
) => React.ComponentType<Omit<Props, keyof InjectProps>>;
