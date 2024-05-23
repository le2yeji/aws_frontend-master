/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/

/*
  Stores Cognito user pool ID and app client ID config info
  replace with your UserPoolId and ClientId values here
*/

  interface PoolData {
    UserPoolId: string;
    ClientId: string;
}
 
function getEnvVariable(key: string, defaultValue: string): string {
    const value = import.meta.env[key];
    if (value === undefined || value === null) {
        console.warn(`환경 변수 ${key}가 설정되지 않았습니다. 기본값을 사용합니다.`);
        return defaultValue;
    }
    return value;
}

export const POOL_DATA: PoolData = {
    UserPoolId: getEnvVariable('VITE_USER_POOL_ID', 'default-pool-id'),
    ClientId: getEnvVariable('VITE_CLIENT_ID', 'default-client-id'),
};
  