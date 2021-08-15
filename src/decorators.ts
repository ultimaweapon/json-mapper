import { ClassConfigurations, configClass, configProperty, PropertyConfigurations } from './config';

/**
 * Specified that this class to be using in JSON mapping.
 *
 * @param conf Configurations to use for this class.
 */
export function JsonClass(conf?: ClassConfigurations): Function {
  return (ctor: any) => configClass(ctor, conf);
}

/**
 * Include this property in JSON mapping.
 *
 * @param conf Configuration to use for this property.
 */
export function JsonProperty(conf?: Omit<PropertyConfigurations, 'name'>): Function {
  return (target: any, prop: string) => {
    if (typeof target === 'function') {
      throw new Error('Static property is not supported.');
    }

    configProperty(target, { ...conf, name: prop });
  };
}
