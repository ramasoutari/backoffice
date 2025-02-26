import _ from "lodash";
import { HOST_API } from "../config-global";
import alovaInstance, { alovaUploadInstance } from "./alovaInstance";
import axiosInstance from "./axios";

// Get Select and Radio-Gruop options from API
export async function optionsFromAPISourceGetter(
  srcUrl,
  params,
  dataKey = "data",
  labelKey,
  valueKey,
  paramsStrategy = "query",
  includeExtraKeys = []
) {
  let url = srcUrl;

  const placeholderRegex = /\{{([\s\S]+?)}}/g;
  if (paramsStrategy === "params") {
    url = url?.replace(placeholderRegex, (_, key) => {
      return params[key?.trim()] || "";
    });
  }

  const response = await axiosInstance.get(url, {
    params: {
      ...(paramsStrategy === "query" ? params : {}),
      // Temporarly, then must add to field json
      PageSize: 1000,
      PageNumber: 1,
    },
  });

  let newOptions = (
    dataKey
      ? _.get(response?.data || response, dataKey)
      : response?.data || response
  ).map((item) => ({
    label: _.get(item, labelKey),
    value: _.get(item, valueKey),
    // Include extra keys
    ...includeExtraKeys.reduce((acc, key) => {
      acc[key] = _.get(item, key);
      return acc;
    }, {}),
  }));

  return newOptions;
}

export function uploadFileRequest(srcUrl, token, data, strategy = "form-data") {
  if (strategy === "form-data") {
    return alovaUploadInstance.Post(
      srcUrl,
      // Body
      data,
      // Config
      {
        headers: {
          token,
        },
      }
    );
  }
}

export function register(data) {
  return alovaInstance.Post(
    `${HOST_API}/mwapi/portal/JordanianUserRegister`,
    data
  );
}
