import {
    R2_ACCESS_KEY,
    R2_ACCOUNT_ID,
    R2_SECRET_KEY,
} from '$env/static/private'
import { S3Client } from '@aws-sdk/client-s3'

// uploading to R2, /user/[id]/[banner, avatar].png / /games/[game]/[assetCategory], /icons/, /other/
// import { CDN_BUCKET_NAME } from "$lib/static/const";
// import { PutObjectCommand } from '@aws-sdk/client-s3'; && import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
const S3 = new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: R2_ACCESS_KEY,
        secretAccessKey: R2_SECRET_KEY,
    },
})

export { S3 }
