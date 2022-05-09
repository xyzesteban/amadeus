import {
    AWS_ACCESSKEY,
    AWS_SECRETKEY,
    AWS_REGION,
    AWS_OUTPUTTYPE,
    AWS_UPLOADBUCKET
} from '@env'

const devEnvironmentVariables = {
    AWS_ACCESSKEY,
    AWS_SECRETKEY,
    AWS_REGION,
    AWS_OUTPUTTYPE,
    AWS_UPLOADBUCKET
}

//export __DEV__? devEnvironmentVariables :: prodEnvironmentVariables
export default devEnvironmentVariables;