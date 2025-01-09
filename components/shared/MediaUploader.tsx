'use client'
import React from 'react'
import { CldImage, CldUploadWidget } from 'next-cloudinary';

type MediaUploaderProps = {
    onValueChange: (value: string) => void;
    setImage: React.Dispatch<any>;
    publicId: string;
    image: any;
    type: string;
}


import { useToast } from '@/hooks/use-toast'
import { dataUrl, getImageSize } from '@/lib/utils';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
const MediaUploader = ({
    onValueChange,
    setImage,
    image,
    publicId,
    type
}: MediaUploaderProps) => {
    const {toast} = useToast()

    const onUploadSucessHandler = (result: any) => {

        setImage((prevState: any) => ({
            ...prevState,
            publicId: result?.info?.public_id,
            width: result?.info?.width,
            height: result?.info?.height,
            secureURL: result?.info?.secure_url
        }))

        onValueChange(result?.info?.public_id)

        toast({
            title: 'Image uploaded successfully',
            description: `1 credit was deducted from your account`,
            duration: 5000,
            className: 'success-toast'
        })
    }
    const onUploadErrorHandler = (error: any) => {
        toast({
            title: 'Something went wrong while uploading',
            description: error.message,
            duration: 5000,
            className: 'error-toast'
        })
    }
  return (
    <CldUploadWidget
    uploadPreset='saas_imaginify'
    options={{
        multiple: false,
        resourceType: 'image',
    }}
    onSuccess={onUploadSucessHandler}
    onError={onUploadErrorHandler}>
        {({open}) => (
            <div className='flex flex-col gap-4'>
                <h3 className='h3-bold text-dark-400'>
                    Original
                    {publicId ? (
                        <>
                        <div className='cursor-pointer overflow-hidden rouded-[10px]'>
                            <CldImage
                            width={getImageSize(type,image,"width")}
                            height={getImageSize(type,image,"height")}
                            src={publicId}
                            alt='image'
                            sizes='(max-width: 768px) 100vw, 50vw'
                            placeholder={dataUrl as PlaceholderValue}
                            className='media-uploader_cldImage'/>
                        </div>
                        </>
                    ) : (
                       <div className="media-uploader_cta" onClick={() => open()}>
                        <div className="media-uploader_cta-image">
                            <Image
                            src="/assets/icons/add.svg"
                            alt="Add Image"
                            width={24}
                            height={24}
                            />
                        </div>
                            <p className="p-14-medium">Click here to upload image</p>
                        </div>
                    )}
                </h3>
            </div>
        )}
    </CldUploadWidget>
  )
}

export default MediaUploader
