export function resolveSettledValue<PromisedValue, DefaultValue>(
  promise: PromiseSettledResult<PromisedValue>,
  defaultValue?: DefaultValue
): PromisedValue | DefaultValue {
  return promise.status === 'fulfilled'
    ? (promise.value as PromisedValue)
    : (defaultValue as DefaultValue);
}
