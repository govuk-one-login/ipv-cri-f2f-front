import { addressPresenter } from "./addressPresenter.js";

export const addressesToSelectItems = ({ addresses }) => {
  const addressesLength = addresses.length;
  const defaultMessage = {
    text:
      addressesLength === 1
        ? `${addresses.length} address found`
        : `${addresses.length} addresses found`,
    value: "",
  };

  if (!addresses || addresses.length <= 0) {
    return [defaultMessage];
  }

  const addressesAsItems = addresses.map((address) => {
    const textView = addressPresenter.generateSearchResultString(address);

    return { ...address, text: textView, value: textView };
  });

  return [defaultMessage, ...addressesAsItems];
};
